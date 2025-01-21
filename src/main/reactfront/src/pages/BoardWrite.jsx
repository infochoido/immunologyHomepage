import React, { useState, useRef, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import 'react-quill-new/dist/quill.snow.css'; // quill의 기본 스타일
import { postBoardRequest } from "../apis";
import { useNavigate } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";
import { useBoardStore, useLoginuserStore } from "../stores/store";
import { fileUploadRequest } from "../apis"; // 이미지 업로드 API 요청

export default function BoardWrite() {
  const { title, setTitle, content, boardImageList, setBoardImageList, setContent, resetBoard } = useBoardStore();
  const { loginUser, setLoginUser, resetLoginUser } = useLoginuserStore();

  const navigate = useNavigate();
  const quillRef = useRef(null);
  const [cookies, setCookies] = useCookies();
  const [selectedImage, setSelectedImage] = useState(null);

  // 퀼 에디터 설정
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      ["link", "image"],
      [{ align: [] }, { color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
    ],
  };

  // 이미지 업로드 및 에디터에 삽입
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
  
    input.onchange = async () => {
      const file = input.files[0];
      console.log(file)
      if (file) {
        try {
          const data = new FormData();
          data.append("file", file);

          console.log("FormData:", data);
          // 이미지 업로드 API 호출
          const url = await fileUploadRequest(data); // 이미지 업로드 함수
          console.log("Image Upload Response:", url); // 업로드 응답 확인
  
          if (url) {
            boardImageList.push(url);
            console.log("Uploaded Image URL:", url); // 이미지 URL 출력
  
            console.log("Updated boardImageList:", boardImageList); // 업데이트된 리스트 확인
  
            // Quill 에디터에 이미지 URL 삽입
            const quillEditor = quillRef.current.getEditor();
            const range = quillEditor.getSelection();
            if (range) {
              quillEditor.insertEmbed(range.index, "image", url); // 이미지 URL 삽입
            } else {
              console.error("Selection error"); // 선택 범위가 없으면 에러 출력
            }
          }
        } catch (error) {
          console.error("Image upload failed:", error);
        }
      }
    };
  };

   // Quill 에디터에 대한 설정 (툴바에 이미지를 삽입할 수 있도록 설정)
   useEffect(() => {
    const quill = quillRef.current.getEditor();
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler('image', imageHandler); // 툴바에서 이미지 버튼 클릭 시 imageHandler 호출
  }, []);

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

    resetBoard();
    if (!loginUser) return;
  };

  // 게시글 업로드 버튼 클릭 시
  const onSubmitButtonClickHandler = async () => {
    console.log("업로드 버튼 클릭됨");
    const accessToken = cookies.accessToken;
    console.log(accessToken);
    if (!accessToken) return;

    const requestBody = {
      title,
      content,
      boardImageList,
    };

    try {
      console.log(requestBody);
      const response = await postBoardRequest(requestBody, accessToken); // 게시글 API 요청
      postBoardResponse(response); // 응답 처리
      resetBoard();
    } catch (error) {
      console.error("Error posting board:", error);
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

  return (
    <div>
      <div style={{ width: "100%", height: "90vh" }}>
        <div style={{ width: "1000px", margin: "auto", borderRadius: "19px" }}>
          <div
            style={{
              marginBottom: "20px",
              marginTop: "70px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            글쓰기
          </div>

          {/* ======== Subject ======== */}
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
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <div style={{ height: "650px" }}>
            {/* ======== Quill ======== */}
            <ReactQuill
              ref={quillRef}
              modules={modules}
              placeholder="내용을 입력해 주세요"
              onChange={(value) => {
                setContent(value);
              }}
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
