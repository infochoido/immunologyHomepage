import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import 'react-quill-new/dist/quill.snow.css'; // quill의 기본 스타일
import { postBoardRequest, uploadImage, uploadFileRequest, getImageUrl } from "../apis";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useBoardStore, useLoginuserStore } from "../stores/store";
import ImageResize from 'quill-image-resize';

// Quill에 ImageResize 모듈 등록
Quill.register('modules/imageResize', ImageResize);

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
            
            // 이미지 삽입 시 크기 조절 가능하도록 설정
            const fullUrl = getImageUrl(imageUrl);
            quillEditor.insertEmbed(range.index, 'image', fullUrl);
            
            // 이미지 선택 및 크기 조절 가능하도록 설정
            const image = quillEditor.root.querySelector(`img[src="${fullUrl}"]`);
            if (image) {
              image.style.maxWidth = '100%';
              image.style.height = 'auto';
              image.setAttribute('data-align', 'center');  // 기본 중앙 정렬
              
              // 이미지 크기 조절 핸들러 추가
              image.setAttribute('contenteditable', 'false');
              image.setAttribute('resizable', 'true');
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

  // modules 정의 수정
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["link", "image"],  // 링크 추가
        [{ size: ["small", false, "large", "huge"] }],  // 텍스트 크기
        ["clean"]
      ],
      handlers: {
        image: imageHandler,
      }
    },
    imageResize: {
      displaySize: true,
      modules: ['Resize', 'DisplaySize']
    },
    clipboard: {
      matchVisual: false
    }
  }), [imageHandler]);

  // 스타일 추가
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'blockquote', 'code-block',
    'list', 'bullet',
    'align',
    'link', 'image',
    'size',
    'clean'
  ];

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
          image: `/api/v1/images/${uploadedUrls[0]}`  // 전체 경로로 수정
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
    if (category === 'Alumni') {
      setTitle('Alumni'); // Alumni 카테고리 선택시 자동으로 제목 설정
    }
  }, [category]);



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
              <option value="Project">Project</option>
              <option value="CoverSelection">CoverSelection</option>
              <option value="ReferredJournal">ReferredJournal</option>
              <option value="Patent">Patent</option>
              <option value="Members">Members</option>
              <option value="Alumni">Alumni</option>
            </select>
          </div>

          {/* Members나 Alumni 카테고리일 때 입력 폼 표시 */}
          {(category === 'Members' || category === 'Alumni') ? (
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
                {category === 'Members' ? (
                  <>
                    <option value="Part Time Ph.D. Students">Part Time Ph.D. Students</option>
                    <option value="Master Students">Master Students</option>
                    <option value="Ph.D. Students">Ph.D. Students</option>
                  </>
                ) : (
                  <>
                    <option value="Ph.D.">Ph.D.</option>
                    <option value="M.S.">M.S.</option>
                  </>
                )}
              </select>
            </div>
          ) : (
            <div style={{ height: "650px" }}>
              <ReactQuill
                ref={quillRef}
                modules={modules}
                formats={formats}
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
