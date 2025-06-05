import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { useTranslation } from "react-i18next";


export default function EditorBox({ value, onChange, initialValue }) {
  
  const [content, setContent] = useState('');
  const [apiKey, setApiKey] = useState('');
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const { i18n } = useTranslation();

  useEffect(() => {
    setApiKey(process.env.EDITOR_API_KEY);
  }, []);


  useEffect(() => {
    if (initialValue) {
      setContent(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    if (value !== content) {
      setContent(value);
    }
  }, [value]);

  const handleEditorChange = (newContent) => {
    setContent(newContent);
    if (onChange) onChange(newContent);
  };

  return (
    <Editor
      key={i18n.language}
      apiKey='ir9tbgfsjyo71v42bliw2qaffo9vjtx4fw7k6l3jsrqm67vj'
      value={content}
      onEditorChange={handleEditorChange}
      init={{
        extended_valid_elements: 'iframe[src|frameborder|style|scrolling|class|width|height|name|align]',
        toolbar: [
          'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | ' +
          'lists link charmap | ' +
          'image media emoticons | table code' 
        ],
        plugins: [
          "lists", "link", "image", "charmap", "preview",
          "searchreplace", "fullscreen", "media", "code",
          "help", "emoticons", "codesample", "quickbars", "table"
        ],
        selector: "#postcontent",
        relative_urls: false,
        remove_script_host: false,
        document_base_url: 'https://handubi.com/',
        language: i18n.language === 'ko' ? 'ko_KR' : 'en',
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
          "code", // HTML 코드 보기
          "help", // 도움말
          "emoticons", // 이모티콘
          "codesample", // 코드 샘플
          "quickbars", // 퀵툴바
          "table"], // 테이블 기능 추가
        toolbar: [
          'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | ' +
          'lists link charmap | ' +
          'image media emoticons | table'],
          content_css: [
            '//cdnjs.cloudflare.com/ajax/libs/tinymce/6.0.0/skins/ui/oxide/skin.min.css',
            '//cdnjs.cloudflare.com/ajax/libs/tinymce/6.0.0/skins/content/default/content.min.css'
          ],
          branding: false,
          image_title: true,
          automatic_uploads: true,
          file_picker_types: "image",
          entity_encoding: 'raw',
          images_upload_handler: async (blobInfo, success, failure) => { // 이미지가 삽입된 후 실제 업로드할 때 사용됨, 퀵툴바의 이미지버튼은 해당 함수만 사용
            const formData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());
          
            try {
              const response = await axios.post(`${API_BASE_URL}/images`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
              });
          
              const uploadedUrl = response.data.data;
              const blobUri = blobInfo.blobUri();
          
              // 이미지 src를 blob에서 실제 URL로 교체
              const editor = window.tinymce.activeEditor;
              const imgs = editor.dom.select(`img[src="${blobUri}"]`);
              imgs.forEach(img => editor.dom.setAttrib(img, 'src', uploadedUrl));
          
              success(uploadedUrl);
            } catch (error) {
              failure("이미지 업로드 중 문제가 발생했습니다.");
            }
          },
          
          file_picker_callback: (callback, value, meta) => {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
          
            input.onchange = async () => {
              const file = input.files[0];
              const reader = new FileReader();
          
              reader.onload = async () => {
                const base64 = reader.result.split(",")[1];
                const blobCache = window.tinymce.activeEditor.editorUpload.blobCache;
                const id = "blobid" + new Date().getTime();
                const blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);
          
                // 미리보기로 blob URL 사용
                callback(blobInfo.blobUri(), { alt: file.name });
          
                // 서버에 업로드 후 이미지 src 교체
                try {
                  const formData = new FormData();
                  formData.append("file", file);
          
                  const response = await axios.post(`${API_BASE_URL}/images`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                  });
          
                  const uploadedUrl = response.data.data;
          
                  // 실제 이미지 src 업데이트
                  const editor = window.tinymce.activeEditor;
                  const imgs = editor.dom.select(`img[src="${blobInfo.blobUri()}"]`);
                  imgs.forEach(img => editor.dom.setAttrib(img, 'src', uploadedUrl));
                } catch (err) {
                  console.error('Image upload error:', err);
                  window.alert('이미지 업로드 실패');
                }
              };
          
              reader.readAsDataURL(file);
            };
          
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