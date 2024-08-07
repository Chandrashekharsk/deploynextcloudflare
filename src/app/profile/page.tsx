"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';

interface User {
  username: string;
  email: string;
  _id: string;
  isVerified: boolean;
  isAdmin: boolean;
}

export default function Page() {
  const [user, setUser] = useState<User>();
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out Successfully!");
      router.push("/login");
    } catch (error: any) {
      console.log(error.response.data?.message);
      toast.error("Couldn't Logout");
    }
  };

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.post("/api/users/me");
        console.log(response);
        setUser(response.data.data);
      } catch (error: any) {
        console.log(error.response.data?.message);
        toast.error("User Not Found!");
      }
    };
    getProfile();
  },[])
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

      <div className="w-auto h-[20vh]  ">
        <h2 className="text-4xl mb-2 ">PROFILE</h2>
        {user ? <p>username: <Link className="my-6 text-sky-600 font-bold" href={`/profile/${user?._id}`}>{user?.username}</Link></p> : ""}
      </div>

      <button
        onClick={logout}
        className="m-4 hover:cursor-pointer p-2 border border-gray-300 rounded-lg mb-4 
      focus:outline-none focus:border-gray-600 bg-blue-600"
      >
        Logout
      </button>
    </div>
  );
}
