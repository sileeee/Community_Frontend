import DOMPurify from 'dompurify';
import styles from "./HtmlRenderer.module.css"

const HtmlRenderer = ({ htmlContent }) => {
    
  const cleanHtml = DOMPurify.sanitize(htmlContent);

  return <div 
    className={styles.htmlRender}
    dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
};

export default HtmlRenderer;
