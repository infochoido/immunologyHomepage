import { Link } from "react-router-dom";
import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import LogInBTN from "./LogInBTN";
import { useCookies } from "react-cookie";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false); // Drawer 열림 상태
  const [openMenus, setOpenMenus] = useState({}); // 여러 하위 메뉴 상태 관리
  const [cookie] = useCookies();

  const menuItems = [
    { text: "교수", link: "/professor" },
    {
      text: "실험실 소개",
      link: "/introduction",
    },
    {
      text: "구성원",
      link: null,
      subItems: [
        { text: "연구진", link: "/member/members" },
        { text: "네트워크", link: "/member/alumnis" },
      ],
    },

    {
      text: "연구실적",
      link: null,
      subItems: [
        { text: "논문", link: "/publication/paper" },
        { text: "특허", link: "/publication/patent" },
      ],
    },
    { text: "공지사항", link: "/notice" },
    
    // 로그인 상태일 때만 "Write" 메뉴 추가
    ...(cookie.accessToken ? [{ text: "글쓰기", link: "/board-write" }] : []),
  ];

  const toggleSubMenu = (menu) => {
    setOpenMenus((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu], // 클릭한 메뉴의 열림/닫힘 상태를 토글
    }));
  };

  return (
    <div className="flex justify-between h-[85px] px-8 custom-mb:px-[10px] custom-lg:px-[150px] items-center">
      {/* 로고 */}
      <div className="flex gap-0 p-0 m-0 items-center">
        <div className="w-[240px] h-16">
          <Link to="/">
            <img src="../assets/logo.png" alt="logo" className="object-fit" />
          </Link>
        </div>
      </div>

      {/* 네비게이션 바 */}
      <div className="flex items-center relative z-10 hidden custom-mb:flex min-w-[635px]">
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <div
              className={`font-sans text-customGray text-md mx-4 hover:underline decoration-2 underline-offset-2 ${
                item.subItems ? "group relative dropdown block cursor-pointer" : ""
              }`}
            >
              {item.link ? (
                <Link to={item.link}>{item.text}</Link>
              ) : (
                <>
                  {item.text}
                  {item.subItems && (
                    <div className="pt-2 absolute left-1/2 transform -translate-x-1/2 hidden group-hover:block">
                      <div className="text-center bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden min-w-[120px]">
                        {item.subItems.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.link}
                            className="block px-6 py-3 text-customGray hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 whitespace-nowrap text-sm"
                          >
                            {subItem.text}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            {index < menuItems.length - 1 && (
              <span className="text-xl mx-2 text-customGray">|</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* 사이드바 */}
      <div>
        {/* 햄버거 버튼 */}
        <Button onClick={() => setIsOpen(true)}>
          <img src="../assets/3lines.png" alt="3lines" className="w-8" />
        </Button>

        {/* Drawer */}
        <Drawer
          anchor="right"
          open={isOpen}
          onClose={() => setIsOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              backgroundColor: "#023793",
              color: "white",
              width: {
                xs: '70%', // 모바일 환경
                sm: '400px' // 태블릿/데스크톱 환경
              }
            },
          }}
        >
          <div style={{ padding: "10px" }}>
            <List>
              {menuItems.map((item, index) => (
                <div key={index}>
                  <ListItem disablePadding>
                    {item.subItems ? (
                      <ListItemButton onClick={() => toggleSubMenu(item.text)}>
                        <ListItemText primary={item.text} />
                      </ListItemButton>
                    ) : (
                      <ListItemButton component={Link} to={item.link}>
                        <ListItemText primary={item.text} />
                      </ListItemButton>
                    )}
                  </ListItem>

                  {/* 하위 메뉴 */}
                  {item.subItems && (
                    <Collapse in={openMenus[item.text]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.subItems.map((subItem, subIndex) => (
                          <ListItem key={subIndex} disablePadding>
                            <ListItemButton component={Link} to={subItem.link} sx={{ pl: 4 }}>
                              <ListItemText primary={subItem.text} />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                      
                    </Collapse>
                  )}  
                </div>
              ))}
            </List>
            <Divider />
            <div className="m-4 mx-6 text-right">
            <LogInBTN />
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
}
