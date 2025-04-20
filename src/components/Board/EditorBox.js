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
      apiKey='enmqn0p7t5hzv31hdubf1ej2pkktvw9l3s407qwittthkqro'
      value={content}
      onEditorChange={handleEditorChange}
      init={{
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
          images_upload_handler: async (blobInfo, success, failure) => {
            const formData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());
        
            try {
              const response = await axios.post(`${API_BASE_URL}/images`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
              success(response.data.data);
            } catch (error) {
              console.error(error);
              failure('이미지 업로드 중 문제가 발생했습니다.');
            }
          },
          
          file_picker_callback: async (callback, value, meta) => {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
          
            input.onchange = async (event) => {
              const file = event.target.files[0];
          
              if (!file) {
                window.confirm("파일이 선택되지 않았습니다.");
                return;
              }
          
              // 클라이언트에서 미리보기를 위한 blob URL 생성
              const previewUrl = URL.createObjectURL(file);
          
              // TinyMCE에서 미리보기 표시
              callback(previewUrl, { alt: file.name });
          
              try {
                // 서버로 업로드 요청
                const formData = new FormData();
                formData.append("file", file);
          
                const response = await axios.post(`${API_BASE_URL}/images`, formData, {
                  headers: { 'Content-Type': 'multipart/form-data' },
                });
          
                // 업로드 성공 시 업로드된 URL 가져오기
                const uploadedUrl = response.data.data;

                // Blob URL을 가진 이미지를 탐색 및 업데이트
                  const editor = window.tinymce.activeEditor;
                  const images = editor.dom.select('img[src^="blob:"]'); // blob URL로 시작하는 이미지 선택

                  images.forEach((img) => {
                    if (img.src === previewUrl) {
                      editor.dom.setAttrib(img, 'src', uploadedUrl); // 이미지 src 업데이트
                    }
                  });
                } catch (error) {
                  console.error('Image upload error:', error);
                  window.confirm('이미지 업로드 중 오류가 발생했습니다.');
                }
              };
          
            // 파일 선택창 열기
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