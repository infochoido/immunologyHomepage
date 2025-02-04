import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import 'react-quill-new/dist/quill.snow.css'; // quill의 기본 스타일
import { postBoardRequest, uploadImage, uploadFileRequest, getImageUrl } from "../apis";
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
  const [memberName, setMemberName] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [memberDegree, setMemberDegree] = useState('');
  const [memberImage, setMemberImage] = useState('');

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
            
            // URL 처리 수정
            const fullUrl = getImageUrl(imageUrl);
            
            console.log('최종 이미지 URL:', fullUrl);
            
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
      let finalContent = content;

      if (category === 'Members') {
        // 필수 필드 검증
        if (!memberName || !memberEmail || !memberDegree || !uploadedUrls[0]) {
          alert('모든 필드를 입력해주세요.');
          return;
        }

        finalContent = JSON.stringify({
          name: memberName,
          email: memberEmail,
          degree: memberDegree,
          image: uploadedUrls[0]
        });
      }

      const requestBody = {
        title,
        content: finalContent,
        category,
        boardImageList: uploadedUrls
      };
      
      const response = await postBoardRequest(requestBody, accessToken);
      
      if (response.code === 'SU') {  // 성공 코드 확인
        alert('게시글이 작성되었습니다.');
        if (category === 'Members') {
          navigate('/members');  // Members 카테고리일 경우 members 페이지로 이동
        } else {
          navigate('/');
        }
        resetBoard();
      } else {
        alert('게시글 작성에 실패했습니다.');
      }

    } catch (error) {
      console.error('게시글 작성 중 오류 발생:', error);
      alert('게시글 작성에 실패했습니다.');
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

  useEffect(() => {
    if (category === 'Members') {
      setTitle('Members'); // Members 카테고리 선택시 자동으로 제목 설정
    }
  }, [category]);

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
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value={null}>카테고리 선택</option>
              <option value="Professor">Professor</option>
              <option value="Notice">Notice</option>
              <option value="Research">Research</option>
              <option value="Members">Members</option>
              <option value="Project">Project</option>
              <option value="CoverSelection">CoverSelection</option>
            </select>
          </div>

          {category === 'Members' ? (
            <div className="member-inputs space-y-4">
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      try {
                        const imageUrl = await uploadImage(file, cookies.accessToken);
                        setMemberImage(imageUrl);
                        setUploadedUrls([imageUrl]);
                      } catch (error) {
                        console.error('이미지 업로드 실패:', error);
                      }
                    }
                  }}
                />
              </div>
              <input
                className="w-full p-2 border rounded"
                placeholder="이름"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
              />
              <input
                className="w-full p-2 border rounded"
                placeholder="이메일"
                value={memberEmail}
                onChange={(e) => setMemberEmail(e.target.value)}
              />
              <select
                className="w-full p-2 border rounded"
                value={memberDegree}
                onChange={(e) => setMemberDegree(e.target.value)}
              >
                <option value="">학위 선택</option>
                <option value="Part Time Ph.D. Students">Part Time Ph.D. Students</option>
                <option value="Master Students">Master Students</option>
                <option value="Ph.D. Students">Ph.D. Students</option>
              </select>
            </div>
          ) : (
            <div style={{ height: "650px" }}>
              <ReactQuill
                ref={quillRef}
                modules={modules}
                placeholder="내용을 입력해 주세요"
                onChange={(value) => setContent(value)}
                style={{ height: "600px" }}
              />
            </div>
          )}

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
