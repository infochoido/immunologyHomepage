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

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false); // Drawer 열림 상태
  const [openMenus, setOpenMenus] = useState({}); // 여러 하위 메뉴 상태 관리

  const menuItems = [
    { text: "Professor", link: "/professor" },
    {
      text: "Members",
      link: null,
      subItems: [
        { text: "Members", link: "/member/members" },
        { text: "Alumni", link: "/member/alumni" },
      ],
    },
    {
      text: "Research",
      link: null,
      subItems: [
        { text: "Research", link: "/research" },
        { text: "Project", link: "/research/project" },
      ],
    },
    {
      text: "Publication",
      link: null,
      subItems: [
        { text: "Cover Selection", link: "/publication/cover-selection" },
        { text: "Refereed Journal", link: "/publication/refereed-journal" },
      ],
    },
    { text: "Patent", link: "/patent" },
  ];

  const toggleSubMenu = (menu) => {
    setOpenMenus((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu], // 클릭한 메뉴의 열림/닫힘 상태를 토글
    }));
  };

  return (
    <div className="flex justify-between p-3 h-[90px] px-[100px]">
      {/* 로고 */}
      <div className="flex gap-0 p-0 m-0 items-center">
        <Link to="/">
          <img src="../assets/logo.png" alt="logo" />
        </Link>
      </div>

      {/* 네비게이션 바 */}
      <div className="flex items-center relative z-10">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`font-sans text-2xl mx-8 hover:underline decoration-2 underline-offset-2 ${
              item.subItems ? "group relative dropdown block cursor-pointer" : ""
            }`}
          >
            {item.link ? (
              <Link to={item.link}>{item.text}</Link>
            ) : (
              <>
                {item.text}
                {item.subItems && (
                  <div className="absolute hidden group-hover:block bg-white border border-gray-300 shadow-lg rounded-lg">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.link}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        {subItem.text}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* 사이드바 */}
      <div className="flex items-center w-60 h-20 mr-0">
        {/* 햄버거 버튼 */}
        <Button onClick={() => setIsOpen(true)}>
          <img src="../assets/3lines.png" alt="3lines" />
        </Button>

        {/* Drawer */}
        <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
          <div style={{ width: 250, padding: "10px" }}>
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
                    <Collapse
                      in={openMenus[item.text]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {item.subItems.map((subItem, subIndex) => (
                          <ListItem key={subIndex} disablePadding>
                            <ListItemButton
                              component={Link}
                              to={subItem.link}
                              sx={{ pl: 4 }}
                            >
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
          </div>
        </Drawer>
      </div>
    </div>
  );
}
