"use client"

import React, { useEffect, useState } from 'react';
import { GenericPagingResponse} from "../response";

interface Domain {
    domainName: string;
    dataType: string;
    domainType: string;
    domainTypeDtl: string;
    dataLength: number;
}

export default function Domain() {

    const [domains, setDomains] = useState<Domain[]>([]);
    useEffect(() => {
        const token = localStorage.getItem("token")
        fetch('http://localhost:8080/domain/list', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": token ? token: `Bearer ${token}`
            }
        })
          .then(response => {
            if (!response.ok) {
              console.log(response)
              throw new Error('Network response was not ok');
            }
            console.log(response.json)
            return response.json();
          })
          .then((data: GenericPagingResponse<Domain>) => {
            console.log(data)
            setDomains(data.content);
          })
          .catch(error => {
            console.error('Error fetching the users:', error);
          });
      }, []);


    return (
        <div>
        <h2> 도메인리스트</h2>
        <table>
            <thead>
            <tr>
                <th>도메인명</th>
                <th>데이타타입</th>
                <th>도메인타입</th>
                <th>도메인상세타입</th>
                <th>데이타길이</th>
                
            </tr>
            </thead>
            <tbody>
            {domains.map((domain, idx) => ( 
                <tr key={idx}>
                    <td>{domain.domainName}</td>
                    <td>{domain.dataType}</td>
                    <td>{domain.domainType}</td>      
                    <td>{domain.domainTypeDtl}</td>      
                    <td>{domain.dataLength}</td>      
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}
