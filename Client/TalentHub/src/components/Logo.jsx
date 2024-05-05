import React from 'react'
import logo from "../assets/logo.webp"
import candidate from "../assets/candidate.png"
export const Logo = () => {
  return (
    <div
      onClick={() => (window.location.href = "/")}
      className="navLogo w-full cursor mt-6 flex justify-center"
    >
      <img src={logo} alt="" className="w-1/2 h-full" />
    </div>
  );
}
