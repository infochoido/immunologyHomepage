import React, { useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { signInRequest } from "../apis";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

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
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();


  // 로그인 여부를 쿠키에서 확인
  const isLoggedIn = cookie.accessToken !== undefined;

  const signInResponse = (responseBody) => {
    if(!responseBody){
      alert('네트워크 이상 or 커스텀 알림');
      return;
    }
    const { code } = responseBody;
    if(code === 'DE') alert("데이터베이스 오류");
    if(code === 'SF' || code === 'VF') {
      setError(true);
      return; // 실패하면 모달 닫지 않음
    }
    if(code !== 'SU') {return};

    const { token, expirationTime } = responseBody;
    const now = new Date().getTime();
    const expires = new Date(now + expirationTime * 1000);

    setCookie('accessToken', token, { expires, path: '/' });
    navigate('/');
    handleClose();  // 성공하면 모달 닫기
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestBody = { userName, password };
    signInRequest(requestBody).then(signInResponse);
  };

  const handleLogout = () => {
    removeCookie('accessToken', { path: '/' });
    navigate('/');
  };

  return (
    <div className="cursor-pointer">
      <p className="text-xs" onClick={isLoggedIn ? handleLogout : handleOpen}>
        {isLoggedIn ? 'LOGOUT' : 'LOGIN'}
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
