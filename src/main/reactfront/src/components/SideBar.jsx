// import React from "react";
import { Link } from "react-router-dom";

export default function SideBar({ title, subMenuItems }) {
  return (
    <div className="basis-1/10">
      {/* 제목 */}
      <div className="flex justify-center h-14 bg-cardBlue1 items-center text-white text-3xl px-10 py-1 rounded-t-lg">
        {title}
      </div>

      {/* 하위 메뉴 */}
      {subMenuItems?.map((item, index) => (
        <Link
          key={index}
          to={item.link} // 링크 경로 설정
          className="block w-full h-14 bg-white text-gray-800 text-xl text-left border border-gray-300 px-4 py-2 rounded shadow flex items-center justify-between hover:bg-gray-100 active:bg-gray-200 transition duration-200"
        >

          <span>{item.text}</span>
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
          </svg>
        </Link>
      ))}
    </div>
  );
}
