"use client";

import { useEffect, useState } from "react";

function management() {

    const [user, setUser] = useState([]);

useEffect (() => {
    fetch("192.169.10.152:8080/api/user", {
        method: "GET"
    })
    .then((response)=> {
        return response.json()
    })
    .then((data) => {
        setUser(data)
        console.log(data)
    })
}, [])
    return ( 
    <>
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th>순번</th>
          <th>이메일</th>
          <th>이름</th>
          <th>직급</th>
        </tr>
      </thead>
      <tbody>
        {user.map((u, index) => (
          <tr key={u.id}>
            <td>{index + 1}</td>
            <td>{u.email}</td>
            <td>{u.name}</td>
            <td>{u.position}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
     );
}

export default management;