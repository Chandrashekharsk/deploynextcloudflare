import React from 'react'

const page = ({params}:any) => {

  const id = params.id;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h2 className=' p-1 px-2 tex-4xl bg-green-600 font-bold m-2'>User Details</h2>
      <p>{id}</p>
    </div>
  )
}

export default page