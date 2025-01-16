//네비게이션바 컴포넌트

import { BrowserRouter, Link } from "react-router-dom";
import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";


export default function NavBar(){
const [isOpen, setIsOpen] = useState(false); // Drawer 열림 상태
const [openMenus, setOpenMenus] = useState({}); // 여러 하위 메뉴 상태 관리

const menuItems = [
    { text: "Professor", link: "/professor" },
    {
      text: "Members",
      link: null,
      subItems: [
        { text: "Members", link: "member/members" },
        { text: "Alumni", link: "member/alumni" },
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
        { text: "Cover Selection", link: "publication/cover-selection" },
        { text: "Refereed Journal", link: "publication/refereed-journal" },
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

    return(
        <div className="flex justify-between p-3 h-[90px] px-[100px]">
            {/* 로고 누르면 /으로 이동 */}
            <div className="flex  gap-0 p-0 m-0">
                <div className="flex  items-center justify-start basis-100 w-60 h-20">
                    <BrowserRouter>
                        <Link to="/"><img src="../assets/logo1.png" alt="logo1"/></Link>
                    </BrowserRouter>
                </div>
                <div className="flex items-center justify-start basis-100 w-2 h-20">
                    <BrowserRouter>
                        <Link to="/"><img src="../assets/betweenlogo.png" alt="betweenlogo"/></Link>
                    </BrowserRouter>
                </div>
                <div className="flex items-center justify-start w-60 h-20">
                    <BrowserRouter>
                        <Link to="/"><img src="../assets/logo2.png" alt="logo2" /></Link>
                    </BrowserRouter>                    
                </div>    
            </div>

            {/* 네비게이션 바 */}
            <div className="flex items-center relative z-10">
                {/* Professor */}
                <div className="font-sans text-2xl mx-8 hover:underline decoration-2 underline-offset-2">
                    <BrowserRouter>
                        <Link to="/professor">Professor</Link>
                    </BrowserRouter>
                </div>

                {/* Members */}
                <li class="font-sans text-2xl mx-8 hover:underline decoration-2 underline-offset-2 group relative dropdown block cursor-pointer tracking-wide">
                    <BrowserRouter>
                        <Link to="/members">Members</Link>    
                    </BrowserRouter>
                
                <div class="absolute hidden group-hover:block bg-white border border-gray-300 shadow-lg rounded-lg">
                    <BrowserRouter>
                        <Link to="/member/members" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Members</Link>
                        <Link to="/member/alumni" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Alumni</Link>
                    </BrowserRouter>
                </div>
                </li>

                {/* Research */}
                <li class="font-sans text-2xl mx-8 hover:underline decoration-2 underline-offset-2 group relative dropdown block cursor-pointer tracking-wide">

                    <BrowserRouter>
                        <Link to="/research">Research</Link>    
                    </BrowserRouter>

                <div class="absolute hidden group-hover:block bg-white border border-gray-300 shadow-lg rounded-lg">
                    <BrowserRouter>
                        <Link to="/research/project" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Project</Link>
                    </BrowserRouter>
                </div>
                </li>

                {/* Publication */}
                <li class="font-sans text-2xl mx-8 hover:underline decoration-2 underline-offset-2 group relative dropdown block cursor-pointer tracking-wide">
                    <BrowserRouter>
                        <Link to="/publication">Publication</Link>    
                    </BrowserRouter>
                <div class="absolute hidden group-hover:block bg-white border border-gray-300 shadow-lg rounded-lg">
                    <BrowserRouter>
                        <Link to="/publication/cover-selection" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">cover-selection</Link>
                        <Link to="/publication/refereed-journal" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">refereed-journal</Link>
                    </BrowserRouter>
                </div>
                </li>

                {/* Patent */}
                <div className="font-sans text-2xl mx-8 hover:underline decoration-2 underline-offset-2">
                    <BrowserRouter>
                        <Link to="/patent">Patent</Link>
                    </BrowserRouter>
                </div>
            </div>

            {/*사이드바*/}
            {/* <div className="flex  items-center w-60 h-20 mr-0"><img src="../assets/3lines.png" alt="3lines"/></div> */}
            <div className="flex  items-center w-60 h-20 mr-0">
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
                                <ListItemButton component="a" href={item.link}>
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
                                    <ListItemButton
                                        component="a"
                                        href={subItem.link}
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
    )
}