import React, { useState, useRef, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import 'react-quill-new/dist/quill.snow.css'; // quill의 기본 스타일
import { postRequest } from "../apis";
// import QuillResizeImage from 'quill-resize-image';
import { useRecoilValue } from 'recoil';
import { RecoiluserNameState } from "../stores/Recoil"; // Recoil 상태가 저장된 파일 경로
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

// // 이미지 리사이즈 모듈을 Quill에 등록
// Quill.register("modules/resize", QuillResizeImage);

export default function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const quillRef = useRef(null);
  const userName = useRecoilValue(RecoiluserNameState);
//   const { loginUser } = userLoginUserStore();
  const Navigate = useNavigate();

//   useEffect(()=>{
//     if(!loginUser){
//         navigator("/");
//         return;
//     }
//     resetBoard();
//   },[])

  // 버튼 클릭 시 처리
  const handleSubmit = async (event) => {
    event.preventDefault();
    const accessToken = Cookies.accessToken;
    if(!accessToken) return;
    const requestBody = {
      title,
      content,
      writerNickname: userName, // 예시로 작성자 닉네임 추가 (로그인 후 가져올 값)
    };

    try {
      // 서버로 데이터 전송
      const response = await postRequest(requestBody, accessToken);
      if (response) {
        alert("게시물이 저장되었습니다!");
      } else {
        alert("게시물 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("게시물 저장 중 오류 발생", error);
      alert("게시물 저장 중 오류 발생");
    }
  };

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
    ImageResize: {
      parchment: Quill.import("parchment"),
    },
  };

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
              onChange={(e) => {
                setContent(e);
              }}
              style={{ height: "600px" }}
            />
          </div>

          {/* ======== Button ======== */}
          <div style={{ float: "right" }}>
            <button style={{ marginRight: "10px" }}>취소</button>
            <button onClick={handleSubmit}>저장하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}
