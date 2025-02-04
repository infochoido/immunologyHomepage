import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import 'react-quill-new/dist/quill.snow.css'; // quill의 기본 스타일
import { postBoardRequest, uploadImage, uploadFileRequest } from "../apis";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useBoardStore, useLoginuserStore } from "../stores/store";

export default function BoardWrite() {
  const quillRef = useRef();
  const navigate = useNavigate();
  const [cookies] = useCookies(['accessToken']);
  const { title, setTitle, content, boardImageList, setBoardImageList, category, setCategory, setContent, resetBoard } = useBoardStore();
  const { loginUser, setLoginUser, resetLoginUser } = useLoginuserStore();
  const [uploadedUrls, setUploadedUrls] = useState([]); // 업로드된 이미지 URL 저장

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    
    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        try {
          const accessToken = cookies.accessToken;
          const imageUrl = await uploadImage(file, accessToken);
          
          if (imageUrl) {
            const quillEditor = quillRef.current.getEditor();
            const range = quillEditor.getSelection(true);
            
            // URL 중복 제거
            const cleanUrl = imageUrl.replace('http://localhost:8080', '');
            const fullUrl = `http://localhost:8080${cleanUrl}`;
            
            console.log('최종 이미지 URL:', fullUrl); // URL 확인용
            
            quillEditor.insertEmbed(range.index, 'image', fullUrl);
            
            // 이미지 삽입 후 스타일 추가
            const image = quillEditor.root.querySelector(`img[src="${fullUrl}"]`);
            if (image) {
              image.style.maxWidth = '100%';
              image.style.height = 'auto';
            }
            
            setUploadedUrls(prev => [...prev, fullUrl]);
          }
        } catch (error) {
          console.error('이미지 업로드 실패:', error);
          alert('이미지 업로드에 실패했습니다.');
        }
      }
    };

    input.click();
  }, [cookies.accessToken]);

  // 그 다음 modules 정의
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
  }), [imageHandler]);

  // 게시글 API 응답 처리
  const postBoardResponse = (responseBody) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === 'AF' || code === 'NU') {
      navigate('/');
    }
    if (code === 'VF') alert('제목과 내용은 필수입니다.');
    if (code === 'DE') alert('데이터베이스 오류입니다.');
    if (code !== 'SU') return;
    
    alert('글쓰기 성공!');
    resetBoard();
    setTitle('');
    setCategory('');
    setContent('');

    const quillEditor = quillRef.current.getEditor();
    quillEditor.setText(''); // 에디터 내용 비우기
    if (!loginUser) return;
  };

  // 게시글 업로드 버튼 클릭 시
  const onSubmitButtonClickHandler = async () => {
    try {
      const accessToken = cookies.accessToken;

      const requestBody = {
        title,
        content,
        category,
        boardImageList: uploadedUrls // 저장된 URL 목록 사용
      };
      
      const response = await postBoardRequest(requestBody, accessToken);
      postBoardResponse(response);
      console.log(response);
      
      if (response.message === 'Success') {
        alert('게시글이 작성되었습니다.');
        navigate('/');
      } else {
        alert('게시글 작성에 실패했습니다1.');
      }

    } catch (error) {
      alert('게시글 작성에 실패했습니다2.');
    }
  };

  // 페이지 로드 시 쿠키 검사
  useEffect(() => {
    const accessToken = cookies.accessToken;
    if (!accessToken) {
      navigate('/');
      return;
    }
    resetBoard();
  }, [cookies, navigate, resetBoard]);


  useEffect(()=>{
    console.log(content)
  },[ content])

  return (
    <div>
      <div style={{ width: "100%", height: "90vh" }}>
        <div style={{ width: "1000px", margin: "auto", borderRadius: "19px" }}>
          <div
            style={{
              marginBottom: "20px",
              marginTop: "40px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            글쓰기
          </div>

          {/* ======== Subject ======== */}
          <div className="flex gap-4">
            <input
              className="Subject"
              placeholder="제목을 입력해 주세요"
              style={{
                padding: "7px",
                marginBottom: "10px",
                width: "100%",
                border: "1px solid lightGray",
                fontSize: "15px",
              }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <select
              className="Category"
              style={{
                padding: "7px",
                marginBottom: "10px",
                width: "20%",
                border: "1px solid lightGray",
                fontSize: "15px",
              }}
              value={category}
              onChange={(e) => setCategory(e.target.value)} // 카테고리 값 설정
            >
              <option value={null}>카테고리 선택</option>
              <option value="Professor">Professor</option>
              <option value="Notice">Notice</option>
              <option value="Research">Research</option>
            </select>
          </div>

          <div style={{ height: "650px" }}>
            {/* ======== Quill ======== */}
            <ReactQuill
              ref={quillRef}
              modules={modules}
              placeholder="내용을 입력해 주세요"
              onChange={(value) => setContent(value)}
              style={{ height: "600px" }}
            />
          </div>

          {/* ======== Button ======== */}
          <div style={{ float: "right" }}>
            <button style={{ marginRight: "10px" }}>취소</button>
            <button onClick={onSubmitButtonClickHandler}>업로드</button>
          </div>
        </div>
      </div>
    </div>
  );
}
