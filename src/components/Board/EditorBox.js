import { React} from 'react';
import { Editor } from '@tinymce/tinymce-react';


export default function EditorBox({ value, onChange }) {
  
  return (
    <Editor
      apiKey='ir9tbgfsjyo71v42bliw2qaffo9vjtx4fw7k6l3jsrqm67vj' // 환경변수 파일로 이동!!!!!!!!!!!!!!!!!
      value={value}
      onEditorChange={(content) => {
        if (onChange) onChange(content);
      }}
      init={{
        selector: "#postcontent",
        language: 'ko_KR',
        height: 600,
        plugins: [
        	"lists", // 리스트 기능
          "link", // 링크 삽입
          "image", // 이미지 삽입
          "charmap", // 특수 문자
          "preview", // 미리보기
          "searchreplace", // 검색 및 바꾸기
          "fullscreen", // 전체 화면
          "media", // 미디어 삽입
          "table", // 표 삽입
          "code", // HTML 코드 보기
          "help", // 도움말
          "emoticons", // 이모티콘
          "codesample", // 코드 샘플
          "quickbars"], // 퀵툴바
        toolbar: [
          'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | ' +
          'lists table link charmap | ' +
          'image media emoticons'],
          content_css: [
            '//cdnjs.cloudflare.com/ajax/libs/tinymce/6.0.0/skins/ui/oxide/skin.min.css',
            '//cdnjs.cloudflare.com/ajax/libs/tinymce/6.0.0/skins/content/default/content.min.css'
          ],
          branding: false,
          image_title: true,
          automatic_uploads: true,
          file_picker_types: "image",
          file_picker_callback: (callback) => {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");

            input.addEventListener("change", (e) => {
              const file = e.target.files[0];
              const reader = new FileReader();

              reader.addEventListener("load", () => {
                // 파일 블로핑
                const id = "blobid" + new Date().getTime();
                const blobCache = window.tinymce.activeEditor.editorUpload.blobCache;
                const base64 = reader.result.split(",")[1];
                const blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);

                // 콜백을 호출하고 파일 이름으로 파일 데이터(file의 meta) 파일이름 적용
                callback(blobInfo.blobUri(), {title: file.name});
              });
              // 블로핑된 파일 URL을 읽어옴
              reader.readAsDataURL(file);
            });
            // run function
            input.click();
          },
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
          ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
          exportpdf_converter_options: { 'format': 'Letter', 'margin_top': '1in', 'margin_right': '1in', 'margin_bottom': '1in', 'margin_left': '1in' },
          exportword_converter_options: { 'document': { 'size': 'Letter' } },
          importword_converter_options: { 'formatting': { 'styles': 'inline', 'resets': 'inline',	'defaults': 'inline', } },
        }}
      />
  );
}