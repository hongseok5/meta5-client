// app/route1/page.jsx
"use client"

import { FormEvent, useState } from "react";
import {useAuthStore} from "../../store"
import { useRouter } from "next/navigation";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { isLoggedIn, login, logout } = useAuthStore();
    const router = useRouter();
    const requestData = {
      username, password
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // 기본 폼 제출 동작 방지
      fetch('http://localhost:8080/user/signin', {
        method: 'POST',
        headers: {
          //'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
        .then(response => {
          console.log(typeof response)
          console.log(response)
          return response.json()
        }).then(token => { 
          console.log("token : " + JSON.stringify(token))
          localStorage.setItem("token", token.token);
          alert("로그인 성공")
          login("spring")
          router.push("/domain")
        })
        .catch(error => {
          console.error('Error:', error);
          alert("로그인 실패")
        });
    }
    return (
        <div>
            <h3>로그인</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>유저명</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label>비밀번호</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  />
                </div>

                <button >로그인</button>
            </form>
        </div>
    );
}
