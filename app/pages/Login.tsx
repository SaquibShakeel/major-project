"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { error } from "console";

const Login = () => {
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post("/api/login", {
        password: password,
      })
      .then((res: any) => {
        router.push("/admin");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-4 rounded-md bg-white bg-opacity-20 backdrop-filter backdrop-blur-2xl flex flex-col items-center justify-start">
        <h3 className="text-xl font-bold mb-4">Admin only</h3>
        <form
          className="flex flex-col items-center justify-center gap-2"
          onSubmit={handleSubmit}
        >
          <input
            className="py-1 px-2 rounded-md ring-2 ring-blue-500 border-none outline-none bg-transparent"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            autoComplete="off"
          />
          <button
            className="rounded-md bg-blue-500 text-white font-semibold py-2 px-4"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
