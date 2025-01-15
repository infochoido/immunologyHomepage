//네비게이션바 컴포넌트

import { BrowserRouter, Link } from "react-router-dom";



export default function NavBar(){
    return(
        <div className="flex justify-between p-3 h-[90px] px-[100px]">
            {/* 로고 누르면 /main으로 이동 */}
            <div className="flex  gap-0 p-0 m-0">
                <div className="flex  items-center justify-start basis-100 w-60 h-20">
                    <BrowserRouter>
                        <Link to="/main"><img src="../assets/logo1.png" alt="logo1"/></Link>
                    </BrowserRouter>
                </div>
                <div className="flex items-center justify-start basis-100 w-2 h-20">
                    <BrowserRouter>
                        <Link to="/main"><img src="../assets/betweenlogo.png" alt="betweenlogo"/></Link>
                    </BrowserRouter>
                </div>
                <div className="flex items-center justify-start w-60 h-20">
                    <BrowserRouter>
                        <Link to="/main"><img src="../assets/logo2.png" alt="logo2" /></Link>
                    </BrowserRouter>                    
                </div>    
            </div>

            {/* 네비게이션 바 */}
            <div className="flex items-center">
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
            <div className="flex  items-center w-60 h-20 mr-0"><img src="../assets/3lines.png" alt="3lines"/></div>
        </div>    
    )
}