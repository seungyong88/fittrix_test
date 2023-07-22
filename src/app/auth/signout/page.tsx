"use client";

import { signIn } from "next-auth/react";
import React, { useRef, useEffect } from "react";

const SignoutPage = () => {
  const userName = useRef("");
  const pass = useRef("");

  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await fetch("http://localhost:3000/api/sdsd");
  //     const data = await res.json();
  //     console.log(data);
  //   }
  //   fetchData();
  // }
  // , []);


  const onSubmit = async () => {
    const result = await signIn("Credentials", {
      username: userName.current,
      password: pass.current,
      redirect: true,
      callbackUrl: "/",
    });

    console.log("re", result);
  };
  return (
    <div
      className={
        "flex flex-col justify-center items-center  h-screen bg-gradient-to-br gap-1 from-cyan-300 to-sky-600"
      }
    >
      <div className="px-7 py-4 shadow bg-white rounded-md flex flex-col gap-2">
        <input
          placeholder="User Name"
          onChange={(e) => (userName.current = e.target.value)}
        />
        <input
          placeholder="Password"
          type={"password"}
          onChange={(e) => (pass.current = e.target.value)}
        />
        <button onClick={onSubmit}>Login</button>
      </div>
    </div>
  );
};

export default SignoutPage;