

//import {useEffect, useState} from "react"
export default function Home() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

    </div>
  );
}

/*
export default function Home() {
  

  if (session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">환영합니다, {session.user.name}!</h1>
        <p className="mb-4">이메일: {session.user.email}</p>
        <button
          onClick={() => signOut()}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">로그인 해주세요</h1>
      <button
        onClick={() => signIn('google')}
        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Google 계정으로 로그인
      </button>
    </div>
  );
}
*/