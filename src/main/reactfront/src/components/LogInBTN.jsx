import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { signInRequest } from "../apis";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useLoginuserStore } from "../stores/store";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function LogInBTN() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
  const navigate = useNavigate();
  const { setLoginuser, resetLoginuser } = useLoginuserStore();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
        const requestBody = {
            userName: userName,
            password: password
        };
        
        const response = await signInRequest(requestBody);
        console.log('로그인 응답:', response);
        
        if (response.code === 'SU') {
            const { token } = response;
            const expires = new Date();
            expires.setTime(expires.getTime() + (60 * 60 * 1000)); // 1시간
            
            setCookie('accessToken', token, {
                path: '/',
                expires,
                secure: true,
                sameSite: 'strict'
            });
            
            setLoginuser(response);
            setError(false);
            setOpen(false);
            window.location.reload(); // 페이지 새로고침
        } else {
            alert('로그인에 실패했습니다.');
        }
    } catch (error) {
        console.error('로그인 에러:', error);
        alert('로그인 처리 중 오류가 발생했습니다.');
    }
  };

  const handleLogout = () => {
    removeCookie('accessToken', { path: '/' });
    resetLoginuser();
    window.location.href = '/';
  };

  // 컴포넌트 마운트 시 토큰 확인
  useEffect(() => {
    const token = cookies.accessToken;
    if (token) {
      // 토큰 유효성 검사 로직 추가 가능
      console.log('토큰 존재:', token);
    }
  }, [cookies.accessToken]);

  return (
    <div className="cursor-pointer">
      <p className="text-xs" onClick={cookies.accessToken ? handleLogout : handleOpen}>
        {cookies.accessToken ? 'LOGOUT' : 'LOGIN'}
      </p>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              관리자 로그인
            </Typography>
            <TextField
              required
              id="standard-required"
              label="User Name"
              variant="standard"
              fullWidth
              autoComplete="username"
              onChange={(e) => setUserName(e.target.value)}
              sx={{ mb: 2 }}
              error={error}
              helperText={error ? "로그인 정보가 잘못되었습니다." : ""}
            />
            <TextField
              id="standard-password-input"
              label="Password (8자 이상)"
              type="password"
              autoComplete="current-password"
              variant="standard"
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              error={error}
              helperText={error ? "로그인 정보가 잘못되었습니다." : ""}
            />
            <Button type="submit" variant="contained" sx={{ height: 'fit-content', mt: 2 }}>
              로그인
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
