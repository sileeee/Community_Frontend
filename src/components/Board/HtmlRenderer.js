import { useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import styles from "./HtmlRenderer.module.css";

const HtmlRenderer = ({ htmlContent, maxLength }) => {
  const containerRef = useRef(null);

  // DOMPurify로 sanitize (width/height 속성 유지)
  let cleanHtml = DOMPurify.sanitize(htmlContent, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: [
      "src", "width", "height", "style", "frameborder",
      "allowfullscreen", "loading", "referrerpolicy", "alt"
    ]
  });

  const truncateHtmlContent = (html, maxLength) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const textContent = tempDiv.textContent || tempDiv.innerText || "";
    const truncatedText = maxLength && textContent.length > maxLength
      ? textContent.substring(0, maxLength) + "..."
      : textContent;
    tempDiv.textContent = truncatedText;
    return tempDiv.innerHTML;
  };

  const finalHtml = maxLength ? truncateHtmlContent(cleanHtml, maxLength) : cleanHtml;

  useEffect(() => {
    const updateImageStyles = () => {
      if (!containerRef.current) return;

      const imgs = containerRef.current.querySelectorAll('img');

      imgs.forEach((img) => {
        const width = img.getAttribute('width');
        const height = img.getAttribute('height');

        if (width && height) {
          img.style.width = `${width}px`;
          img.style.height = `${height}px`;
          img.style.maxWidth = 'unset';
          img.style.display = 'block';
          img.style.margin = '0 auto';
        } else {
          img.style.width = '100%';
          img.style.height = 'auto';
          img.style.maxWidth = '100%';
          img.style.display = 'block';
          img.style.margin = '0 auto';
        }
      });
    };

    updateImageStyles();
    window.addEventListener('resize', updateImageStyles);
    return () => {
      window.removeEventListener('resize', updateImageStyles);
    };
  }, [finalHtml]);

  return (
    <div
      className={styles.htmlRender}
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: finalHtml }}
    />
  );
};

export default HtmlRenderer;
