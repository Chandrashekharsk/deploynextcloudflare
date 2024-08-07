"use client"
import axios from 'axios';
import Link from 'next/link';
import {useEffect, useState} from 'react'

const Page = () => {

  const [token, setToken] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);

  const verifyUserEmail = async()=>{
    try {
      console.log("verifyUserEmail: func start")
      await axios.post("/api/users/verifyemail",{token})
      console.log("verifyUserEmail: func: Done!")
      setVerified(true);
      setError(false);

    } catch (error:any) {
      setError(true);
      console.log(error.response.data);
    }
  }

  // const router = useRouter();
  useEffect(()=>{
    // Using core javascript functionalities - NOT RECOMMENDED IN NEXT.JS
    const urlToken = window.location.search.split("=")[1] || "";
    setToken(urlToken);

    // Using core Next.js optimisation method - RECOMMENDED IN NEXT.JS
    // const {query}  = router;
    // const urlToken2 = query.token;
  },[])

  useEffect(()=>{
    setError(false);
    if(token.length>0){
      verifyUserEmail();
    }
  },[verifyUserEmail, token])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className='text-4xl my-5'> Verify Email</h1>
      <h2 className=' my-5 p-1 bg-white font-bold text-red-600'>
        {token?`${token}`:"Check Your Email for Verification!"}
      </h2>

      { verified &&
      (<div>
        <h2>Email Successfully Verified</h2>
        Go to <Link href="/login">Login</Link>
      </div>)
      
      }

      { error &&
        (<h2>Error Occured!</h2>)
      }
      
    </div>
  )
}

export default Page;