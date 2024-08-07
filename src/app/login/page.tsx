"use client"
import axios from "axios";
import { useEffect, useState, useCallback, ChangeEvent } from "react";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const [disabledButton, setDisabledButton] = useState(true);
  const [loading, setLoading] = useState(false);

  // Using useCallback to memoize the onSignup function
  const onLogin = useCallback(async () => {
    setLoading(true);
    setDisabledButton(true);

    try {
      const response = await axios.post("/api/users/login", user);
      console.log("Login Done", response.data);
      router.push("/profile");
      toast.success("User registered Successfully");

    } catch (error:any) {
      console.error("Signup failed", error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }, [user, router]);

  useEffect(() => {
    setDisabledButton(
      !user.email || !user.password
    );
  }, [user]);

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-xl p-6">{loading ? "Processing..." : "Login"}</h1>
      <hr />
      
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
      <button className="p-2 border hover:cursor-pointer border-gray-300 rounded-lg mb-4 
      focus:outline-none m-4 focus:border-gray-600"
      onClick={onLogin} type="submit" disabled={disabledButton}>
        Login
      </button>
      <p>haven{`&apos;`}t account? 
        visit <Link className="text-blue-600 underline" href="/signup">SignUp</Link> 
      </p>
    </div>
  );
};

export default Page;
