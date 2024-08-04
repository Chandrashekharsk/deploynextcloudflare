import { NextRequest, NextResponse } from "next/server";


export const middleware = (request :NextRequest) =>{

  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup" || path === "/verifyemail";
  const token = request.cookies.get("token")?.value;

  // For public routes
  if(isPublicPath && token){
    return NextResponse.redirect(new URL("/", request.url));
  }

  // For private routes
  if(!isPublicPath && !token){
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// List of pages where we want to configer this middleware(usually all routes)
export const config = {
  matcher:[
    "/",
    "/login",
    "/signup",
    "/profile",
    "/verifyemail",
  ]
}