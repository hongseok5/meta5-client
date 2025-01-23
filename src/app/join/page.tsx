// app/route1/page.jsx
"use client"

import { FormEvent, useState } from "react";
import { useRouter } from 'next/navigation';
export default function Join() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const requestData = {
      username, password
    };

    const handleSubmit = (e: React.FormEvent) => {

      e.preventDefault()
      const url = 'http://localhost:8080/user/signup';
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Response:', data);
          if(data.result === "success") {
            alert("회원가입이 완료되었습니다.");
            router.push("/login");
          } else {
            alert("회원가입 실패");
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
    return (
        <div>
            <h3>회원가입</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>유저명</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label>비밀번호</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  />
                </div>
                <div>
                    <label>비밀번호 확인</label>
                    <input type="password" />
                </div>
                <button type="submit" >가입하기</button>
            </form>
        </div>
    );
}
