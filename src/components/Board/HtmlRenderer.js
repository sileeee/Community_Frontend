import DOMPurify from 'dompurify';
import styles from "./HtmlRenderer.module.css"

const HtmlRenderer = ({ htmlContent, maxLength }) => {
    
  const cleanHtml = DOMPurify.sanitize(htmlContent);

  const truncateHtmlContent = (html, maxLength) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    // Extract text content only
    const textContent = tempDiv.textContent || tempDiv.innerText || "";

    // Truncate the text and append ellipsis if needed
    const truncatedText =
      maxLength && textContent.length > maxLength
        ? textContent.substring(0, maxLength) + "..."
        : textContent;

    // Replace tempDiv's content with the truncated text
    tempDiv.textContent = truncatedText;

    // Return the truncated HTML string
    return tempDiv.innerHTML;
  };

  // Apply truncation if maxLength is provided
  const finalHtml = maxLength ? truncateHtmlContent(cleanHtml, maxLength) : cleanHtml;

  return (
    <div
      className={styles.htmlRender}
      dangerouslySetInnerHTML={{ __html: finalHtml }}
    />
  );
};
export default HtmlRenderer;
