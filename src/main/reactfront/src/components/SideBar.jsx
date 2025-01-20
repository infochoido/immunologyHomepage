export default function SideBar(){
    return(
        <div class="basis-1/10">
        <div class="flex justify-center h-20 bg-cardBlue1 items-center text-white text-3xl px-20 py-2">Professor</div>
        <button class="w-full h-16 bg-white text-gray-800 text-xl text-left border border-gray-300 px-4 py-2 rounded shadow flex items-center justify-between hover:bg-gray-100 active:bg-gray-200 transition duration-200">
        <span>Professor</span>
        <svg
            class="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
        </svg>
        </button>
    </div>
    )
}