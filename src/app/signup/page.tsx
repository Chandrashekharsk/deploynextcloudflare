"use client"
import axios from "axios";
import { useEffect, useState, useCallback, ChangeEvent } from "react";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const [disabledButton, setDisabledButton] = useState(true);
  const [loading, setLoading] = useState(false);

  // Using useCallback to memoize the onSignup function
  const onSignup = useCallback(async () => {
    setLoading(true);
    setDisabledButton(true);

    try {
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      toast.success("User registered Successfully");
      router.push("/verifyemail");

    } catch (error:any) {
      console.error("Signup failed", error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }, [user, router]);

  useEffect(() => {
    setDisabledButton(
      !user.email || !user.password || !user.username
    );
  }, [user]);

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-xl p-6">{loading ? "Loading..." : "Sign Up"}</h1>
      <hr />
      <label htmlFor="username">Username:</label>
      <input 
        style={{color:"black"}} placeholder="username"
        type="text"
        name="username"
        id="username"
        value={user.username}
        onChange={handleChange}
      />
      <label htmlFor="email">Email:</label>
      <input
        style={{color:"black"}} placeholder="email"
        type="email"
        name="email"
        id="email"
        value={user.email}
        onChange={handleChange}
      />
      <label htmlFor="password">Password:</label>
      <input
        style={{color:"black"}} placeholder="password"
        type="password"
        name="password"
        id="password"
        value={user.password}
        onChange={handleChange}
      />
      <button className="m-4 hover:cursor-pointer p-2 border border-gray-300 rounded-lg mb-4 
      focus:outline-none focus:border-gray-600"
      onClick={onSignup} type="submit" disabled={disabledButton}>
        Signup
      </button>
      <p>already have an account?    
      visit <Link className="text-blue-600 underline" href="/login">Login</Link>
      </p>
    </div>
  );
};

export default Page;
