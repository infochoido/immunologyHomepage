import { useLocation } from "react-router-dom";

export default function PageTitle({ title, subMenuItems }) {
  const location = useLocation();
  const lastSegment = location.pathname.split("/").filter(Boolean).pop();
  
  // 맨 앞 글자만 대문자로 변환
  const formattedSegment = lastSegment
    ? lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)
    : "";

  return (
    <h1 className=" ml-4 text-[48px] font-bold">{formattedSegment}</h1>
  );
}
