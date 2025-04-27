import { useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import styles from "./HtmlRenderer.module.css";

const HtmlRenderer = ({ htmlContent, maxLength }) => {
  const containerRef = useRef(null);

  // DOMPurify로 sanitize 후 width/height 속성 제거
  let cleanHtml = DOMPurify.sanitize(htmlContent);
  cleanHtml = cleanHtml.replace(/(width|height)="[^"]*"/g, '');

  // maxLength 옵션 있으면 텍스트 잘라내기
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
      if (window.innerWidth <= 800) { 
        if (containerRef.current) {
          const imgs = containerRef.current.querySelectorAll('img');
          imgs.forEach((img) => {
            img.style.width = '100%';
            img.style.height = 'auto';
            img.style.display = 'block';
          });
  
          const parents = containerRef.current.querySelectorAll('div');
          parents.forEach((parent) => {
            parent.style.maxWidth = '100%';
            parent.style.width = '100%';
            parent.style.display = 'block';
          });
  
          const figures = containerRef.current.querySelectorAll('figure');
          figures.forEach((figure) => {
            figure.style.maxWidth = '100%';
            figure.style.width = '100%';
            figure.style.margin = '0 auto';
            figure.style.display = 'block';
          });
  
          const figcaptions = containerRef.current.querySelectorAll('figcaption');
          figcaptions.forEach((caption) => {
            caption.style.maxWidth = '100%';
            caption.style.width = '100%';
            caption.style.display = 'block';
            caption.style.textAlign = 'center';
          });
        }
      }
    };
  
    updateImageStyles(); // 최초 렌더링 때 한 번 실행
  
    window.addEventListener('resize', updateImageStyles); // 화면 리사이즈 시마다 체크
  
    return () => {
      window.removeEventListener('resize', updateImageStyles); // 컴포넌트 언마운트 시 정리
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
