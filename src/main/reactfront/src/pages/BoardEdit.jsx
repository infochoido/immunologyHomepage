import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import ReactQuill from 'react-quill-new';
// import 'react-quill-new/dist/quill.snow.css';
import { getBoardDetail, putBoardRequest, uploadImage } from '../apis';

export default function BoardEdit() {
  // 일반 게시글용 state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [uploadedUrls, setUploadedUrls] = useState([]);


  const [cookies] = useCookies(['accessToken']);
  const navigate = useNavigate();
  const { boardNumber } = useParams();
  const quillRef = useRef();
  const location = useLocation();

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    
    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        try {
          const imageUrl = await uploadImage(file, cookies.accessToken);
          if (imageUrl) {
            const quillEditor = quillRef.current.getEditor();
            const range = quillEditor.getSelection(true);
            
            
            // 에디터에 표시할 전체 URL
            const fullUrl = `https://vetimmune.jbnu.ac.kr${imageUrl}`;
            quillEditor.insertEmbed(range.index, 'image', fullUrl);
            
            // 이미지 스타일 설정
            const image = quillEditor.root.querySelector(`img[src="${fullUrl}"]`);
            if (image) {
              image.style.maxWidth = '100%';
              image.style.height = 'auto';
            }
            
            // uploadedUrls 업데이트
            setUploadedUrls(prev => [...prev, imageUrl]);
          }
        } catch (error) {
          console.error('이미지 업로드 실패:', error);
          alert('이미지 업로드에 실패했습니다.');
        }
      }
    };
    input.click();
  }, [cookies.accessToken]);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["link", "image"],
        [{ size: ["small", false, "large", "huge"] }],
        ["clean"]
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), [imageHandler]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBoardDetail(boardNumber);
        if (response) {
          const currentCategory = location.state?.category || response.category || 'Notice';
          setCategory(currentCategory);
          
          if (currentCategory === 'Professor') {
            setContent(response.content);
          } else if (currentCategory === 'Introduction') {
            setContent(response.content);
          } else {
            setContent(response.content);
          }
          setTitle(response.title);
        }
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
        alert('게시글 정보를 불러오는데 실패했습니다.');
      }
    };
    
    if (boardNumber) {
      fetchData();
    }
  }, [boardNumber, location.state]);

  const handleSubmit = async () => {
    try {
      if (!title || !content || !category) {
        alert('제목, 내용, 카테고리를 모두 입력해주세요.');
        return;
      }

      let finalContent = content;
      

      const requestBody = {
        title,
        content: finalContent,
        category,
        boardImageList: uploadedUrls
      };

      const response = await putBoardRequest(boardNumber, requestBody, cookies.accessToken);

      if (response.code === 'SU') {
        alert('게시글이 수정되었습니다.');
        // 카테고리별 리다이렉션
        switch (category) {
          case 'Professor':
            navigate('/professor');
            break;
          case 'Paper':
            navigate('/publication/paper');
            break;
          case 'Notice':
            navigate('/notice');
            break;
          case 'Introduction':
            navigate('/introduction');
            break;
          default:
            navigate(`/boardDetail?board_number=${boardNumber}`);
        }
      } else {
        alert('게시글 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('수정 중 오류 발생:', error);
      alert('게시글 수정에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex-1 custom-mb:px-4 pb-24 px-2">
        <div className="max-w-6xl mx-auto">
          <div className="text-2xl font-bold mb-4">글 수정페이지</div>
          
          <div className="mt-8">
            <div className="flex gap-4 mb-4">
              <input
                className="flex-1 p-2 border rounded"
                placeholder="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-32 p-2 border rounded bg-white"
              >
                <option value="">카테고리</option>
                <option value="Notice">공지사항</option>
                <option value="Research">연구</option>
                <option value="Paper">논문</option>
                <option value="Members">구성원</option>
                <option value="Alumni">졸업생</option>
                <option value="Professor">교수</option>
                <option value="Introduction">실험실 소개</option>
              </select>
            </div>

            <div className="min-h-[500px] mb-6">
              <ReactQuill
                ref={quillRef}
                value={content}
                onChange={setContent}
                modules={modules}
                style={{ height: '600px' }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 bg-white px-8 pb-4 shadow-md">
        <div className="max-w-6xl mx-auto text-right">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 rounded text-gray-600 font-medium hover:bg-gray-100 transition-colors border border-gray-300 mr-2"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded bg-[#023793] text-white font-medium hover:bg-[#034ABC] transition-colors"
          >
            수정완료
          </button>
        </div>
      </div>
    </div>
  );
} 