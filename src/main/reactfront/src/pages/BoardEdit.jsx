import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getBoardDetail, putBoardRequest, fileUploadRequest } from '../apis';
import PageTitle from '../components/PageTitle';

export default function BoardEdit() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [cookies] = useCookies(['accessToken']);
  const navigate = useNavigate();
  const { boardNumber } = useParams();
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const quillRef = useRef();

  // 이미지 핸들러 함수
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fileUploadRequest(formData);
        if (response && response.url) {
          const url = response.url;
          setUploadedUrls(prev => [...prev, url]);
          
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          quill.insertEmbed(range.index, 'image', url);
        }
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
      }
    };
  };

  // Quill 모듈 설정
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        ["image"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  }), []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBoardDetail(boardNumber);
        if (response) {
          setTitle(response.title);
          setContent(response.content);
          setCategory(response.category);
        }
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
        alert('게시글 정보를 불러오는데 실패했습니다.');
      }
    };
    
    if (boardNumber) {
      fetchData();
    }
  }, [boardNumber]);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || !category) {
      alert('제목, 내용, 카테고리를 모두 입력해주세요.');
      return;
    }

    try {
      const requestBody = {
        title,
        content,
        category,
        boardImageList: uploadedUrls
      };

      const response = await putBoardRequest(boardNumber, requestBody, cookies.accessToken);

      if (response.code === 'SU') {
        alert('게시글이 수정되었습니다.');
        navigate(`/boardDetail?board_number=${boardNumber}`);
      } else {
        alert('게시글 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('수정 중 오류 발생:', error);
      alert('게시글 수정에 실패했습니다.');
    }
  };

  return (
    <div>
      <PageTitle />
      <div className="mx-16 mt-8">
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">카테고리 선택</option>
            <option value="Notice">Notice</option>
            <option value="Research">Research</option>
            <option value="Professor">Professor</option>
          </select>
        </div>

        <div className="mb-4">
          <ReactQuill
            value={content}
            onChange={setContent}
            modules={modules}
            className="h-96"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            수정완료
          </button>
        </div>
      </div>
    </div>
  );
} 