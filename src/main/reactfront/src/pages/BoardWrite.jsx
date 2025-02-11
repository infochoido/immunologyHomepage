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
  const [paperTitle, setPaperTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [paperLink, setPaperLink] = useState('');

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    
    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        try {
          const imageUrl = await uploadImage(file, cookies.accessToken);
          console.log('업로드된 이미지 URL:', imageUrl);
          
          if (imageUrl) {
            // Members나 Alumni 카테고리일 때는 API 경로 포함
            if (category === 'Members' || category === 'Alumni') {
              const apiImageUrl = `/api/v1/images/${imageUrl}`;
              console.log('API 이미지 URL:', apiImageUrl);
              setMemberImage(apiImageUrl);
              console.log('memberImage:', memberImage);
              // 프로필 이미지 업로드 시 memberData 업데이트
              const memberData = {
                name: memberName,
                email: memberEmail,
                degree: memberDegree,
                image: apiImageUrl
              };
              setContent(JSON.stringify(memberData));
            }
            
            // 에디터에 표시할 전체 URL
            const fullUrl = `https://jbnuvetmedimmunelab.store/api/v1/images/${imageUrl}`;
            const quillEditor = quillRef.current.getEditor();
            const range = quillEditor.getSelection(true);
            quillEditor.insertEmbed(range.index, 'image', fullUrl);
            
            setUploadedUrls(prev => [...prev, imageUrl]);
          }
        } catch (error) {
          console.error('이미지 업로드 실패:', error);
          alert('이미지 업로드에 실패했습니다.');
        }
      }
    };
    input.click();
  }, [cookies.accessToken, category, memberName, memberEmail, memberDegree]);

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
  const handleSubmit = async () => {
    try {

      let finalContent = content;
      
      if (category === 'Members' || category === 'Alumni') {
        const memberData = {
          name: memberName,
          email: memberEmail,
          degree: memberDegree,
          image: `/api/v1/images/${memberImage}`
        };
        finalContent = JSON.stringify(memberData);
      }

      const requestBody = {
        title,
        content: finalContent,
        category,
        boardImageList: uploadedUrls
      };

      const response = await postBoardRequest(requestBody, cookies.accessToken);
      
      if (response && response.code === 'SU') {
        alert("게시글이 등록되었습니다.");
        if (category === 'Members') {
          navigate('/member/members');
        } else if (category === 'Alumni') {
          navigate('/member/alumnis');
        } else {
          navigate(-1);
        }
        resetBoard();
      } else {
        alert("게시글 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("게시글 등록 실패:", error);
      alert("게시글 등록에 실패했습니다.");
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

  // category가 변경될 때 title 자동 설정을 위한 useEffect 수정
  useEffect(() => {
    if (category === 'Members') {
      setTitle('Members');
    } else if (category === 'Alumni') {
      setTitle('Alumni');
    } else if (category === 'Paper') {
      setTitle('Paper');
    }
  }, [category]);

  // Quill 에디터를 사용하는 카테고리인지 확인하는 함수
  const isQuillCategory = (cat) => {
    return !['Members', 'Alumni', 'Paper'].includes(cat);
  };

  // 카테고리 변경 핸들러
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    const oldCategory = category;
    setCategory(newCategory);

    // 이전 카테고리와 새 카테고리 모두 Quill을 사용하는 경우
    if (isQuillCategory(oldCategory) && isQuillCategory(newCategory)) {
      const quillEditor = quillRef.current.getEditor();
      if (quillEditor) {
        // 에디터 내용 유지하면서 리렌더링
        const currentContent = quillEditor.getContents();
        quillEditor.setContents([]);
        setTimeout(() => {
          quillEditor.setContents(currentContent);
        }, 0);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div style={{ width: "100%", height: "90vh" }}>
        <div style={{  margin: "auto", borderRadius: "19px" }}>
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
                backgroundColor: category === 'Paper' || category === 'Members' || category === 'Alumni' ? '#f0f0f0' : 'white', // 비활성화 시 배경색 변경
              }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={category === 'Paper' || category === 'Members' || category === 'Alumni'} // Paper, Members, Alumni 카테고리일 때 비활성화
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
              onChange={handleCategoryChange}
            >
              <option value={null}>카테고리 선택</option>
              <option value="Notice">Notice</option>

              <option value="Paper">논문</option>
              <option value="Patent">특허</option>
              <option value="Achievements">업적</option>


              <option value="Members">Members</option>
              <option value="Alumni">Alumni</option>
             
            </select>
          </div>

          {/* Members나 Alumni 카테고리일 때 입력 폼 표시 */}
          {(category === 'Members' || category === 'Alumni') ? (
            <div className="member-inputs space-y-4 p-6 bg-gray-50 rounded-lg">
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-4">
                  <span className="text-red-500">*</span> 표시는 필수 입력 항목입니다
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    프로필 이미지 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full p-2 border rounded bg-white"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        try {
                          const imageUrl = await uploadImage(file, cookies.accessToken);
                          setMemberImage(imageUrl);
                          setUploadedUrls([imageUrl]);
                          console.log('업로드된 이미지 URL:', imageUrl); // 응답 확인
                        } catch (error) {
                          console.error('이미지 업로드 실패:', error);
                        }
                      }
                    }}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full p-2 border rounded bg-white"
                    placeholder="이름을 입력하세요"
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    이메일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full p-2 border rounded bg-white"
                    placeholder="이메일을 입력하세요"
                    value={memberEmail}
                    onChange={(e) => setMemberEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    학위 <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full p-2 border rounded bg-white"
                    value={memberDegree}
                    onChange={(e) => setMemberDegree(e.target.value)}
                  >
                    <option value="">학위를 선택하세요</option>
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
              </div>
            </div>
          ) : category === 'Paper' ? (
            <div className="paper-inputs space-y-4 p-6 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500 mb-4">
                <span className="text-red-500">*</span> 표시는 필수 입력 항목입니다
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  논문 제목 <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full p-2 border rounded bg-white"
                  placeholder="논문 제목을 입력하세요"
                  value={paperTitle}
                  onChange={(e) => setPaperTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  저자 <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full p-2 border rounded bg-white"
                  placeholder="저자들을 콤마(,)로 구분하여 입력하세요"
                  value={authors}
                  onChange={(e) => setAuthors(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  출판일 <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full p-2 border rounded bg-white"
                  type="date"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  논문 링크
                </label>
                <input
                  className="w-full p-2 border rounded bg-white"
                  placeholder="논문 링크를 입력하세요 (선택사항)"
                  value={paperLink}
                  onChange={(e) => setPaperLink(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div style={{ height: "650px" }} key={category}>
              <ReactQuill
                ref={quillRef}
                modules={modules}
                formats={formats}
                value={content}
                placeholder="내용을 입력해 주세요"
                onChange={(value) => setContent(value)}
                style={{ height: "600px" }}
              />
            </div>
          )}

          {/* ======== Button ======== */}
          <div className="flex justify-end mt-5">
            <button
              className="px-4 py-2 rounded-md bg-[#023793] text-white font-semibold hover:bg-[#034ABC] transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none"
              onClick={handleSubmit}
            >
              업로드
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}