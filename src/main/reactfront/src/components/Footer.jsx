//Footer Component

export default function Footer() {
    return (<div className="flex flex-col w-full">
      <div className="bg-white h-24 flex justify-center items-center">
        <img src = "../assets/logo.png" alt = "logo"></img>
      </div>
      <div className="text-white text-left py-12 w-full"
           style={{
            backgroundColor:"#023793"}}
      >
        <p className="text-base text-sm pl-32 font-bold">
          전북대학교 수의학과<br />
          면역학 실험실<br />
          김원일 교수<br />
          email : <span className = "underline">kwi0621@jbnu.ac.kr</span>
        </p>
      </div>
      </div>
    );
  }