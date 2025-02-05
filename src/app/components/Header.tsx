"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";

interface HeaderProps {
  isLoggedIn: boolean;
  login: (msg: string) => void;
  logout: () => void;
}

const Header: React.FC<HeaderProps> = ({isLoggedIn, login, logout}) => {
  console.log(isLoggedIn)

  const {  status, data: session } = useSession(); // 클라이언트에서 세션 상태 가져오기

  console.log(session)  // undefined
  useEffect(() => {
    if (status === 'authenticated') {
      login("oauth")
    } else {
      logout()
    }
  }, []);
  // 의존성에 status랑 isLoggedIn이 없어도 되는지 확인
  const [showLoginDialog, setShowLoginDialog] = useState(false); // 로그인 다이얼로그 표시 상태
  const [showJoinDialog, setShowJoinDialog] = useState(false); // 로그인 다이얼로그 표시 상태

  const router = useRouter();

  const handleLogout = () => {
    signOut({callbackUrl: "/"})
    logout()
    alert("로그아웃 되었습니다.");
  };

  // 로그인 버튼 클릭 핸들러
  const handleLoginClick = () => {
    setShowLoginDialog(true); // 로그인 다이얼로그 열기
  };

  const handleJoinClick = () => {
    console.log("handleJoinClick")
    setShowJoinDialog(true); // 로그인 다이얼로그 열기
  };

  // 다이얼로그 닫기 핸들러
  const handleCloseDialog = () => {
    setShowJoinDialog(false)
    setShowLoginDialog(false); // 로그인 다이얼로그 닫기
  };

  // 소셜 로그인 선택 핸들러
  const handleSocialLogin = (provider: string) => {
    if(provider === "spring") {
      router.push("/login")
    }
    //setIsLoggedIn(true); // 로그인 상태로 변경
    setShowLoginDialog(false); // 다이얼로그 닫기
  };

  const handleSignUp = (code: string) => {
    console.log("handleSig  up")
    if(code === "google") {
      signIn(code,  { callbackUrl: '/'}).then((res) => {
        console.log(res)
      }, (error) => {
        console.error("errr", error)
      }).catch((err) => {
        console.log("catch" , err)
      })
    } else if(code == "spring"){
      console.log("route to join")
      router.push("/join")
    } else {
      alert("kakao 로그인")
    }
  }

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-gray-100 shadow-md">
      {/* 로고 및 사이트 이름 */}

        <Link href="/" className="text-xl font-bold text-gray-800">
          MyApp
        </Link>

      {/* 로그인/회원가입 또는 내정보/로그아웃 */}
      <div className="flex space-x-4">
        {isLoggedIn ? (
          <>
            <Link href="/myinfo" className="text-blue-500 hover:underline">
              내정보
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:underline"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleLoginClick}
              className="text-blue-500 hover:underline"
            >
              로그인
            </button>
            <button
              onClick={handleJoinClick}
              className="text-blue-500 hover:underline"
            >
              회원가입
            </button>
          </>
        )}
      </div>

      {/* 로그인 다이얼로그 */}
      {showLoginDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <h2 className="text-lg font-bold mb-4">소셜 로그인</h2>
            <button
              onClick={() => handleSocialLogin("구글")}
              className="w-full mb-2 py-2 bg-blue-500 text-white rounded hover:bg-red-600"
            >
              구글로 로그인
            </button>
            <button
              onClick={() => handleSocialLogin("카카오")}
              className="w-full mb-2 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
            >
              카카오로 로그인
            </button>
            <button
              onClick={() => handleSocialLogin("spring")}
              className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Spring 로그인
            </button>
            <button
              onClick={handleCloseDialog}
              className="w-full mt-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {showJoinDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <h2 className="text-lg font-bold mb-4">소셜 로그인</h2>
            <button
              onClick={() => handleSignUp("google")}
              className="w-full mb-2 py-2 bg-blue-500 text-white rounded hover:bg-red-600"
            >
              구글로 회원가입
            </button>
            <button
              onClick={() => handleSignUp("카카오")}
              className="w-full mb-2 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
            >
              카카오로 회원가입
            </button>
            <button
              onClick={() => handleSignUp("spring")}
              className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              일반 회원가입
            </button>
            <button
              onClick={handleCloseDialog}
              className="w-full mt-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              닫기
            </button>
          </div>
        </div>
      )}  
    </header>
  );
}
export default Header;