"use client";

import { signIn, useSession } from "next-auth/react";
import React, { useRef, useEffect } from "react";

const SigninPage = () => {
  const { data: session } = useSession();
  const userName = useRef("");
  const pass = useRef("");

  useEffect(() => {
    if (session) {
      window.location.href = "/";
    }
  }
  , [session]);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if(!userName.current || !pass.current) return alert("Please fill all fields");

    const result = await signIn("Credentials", {
      username: userName.current,
      password: pass.current,
      redirect: true,
      callbackUrl: "/",
    });

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

export default SigninPage;