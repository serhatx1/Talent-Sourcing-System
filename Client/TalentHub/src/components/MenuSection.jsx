import React from 'react';
import dashboard from "../assets/dashboard.png";
import candidate from "../assets/candidate.png";

export const MenuSection = ({showDashboard, dash }) => {
  const handleOnClick=()=>{
    console.log(showDashboard)
    if(showDashboard==true||typeof showDashboard=="undefined"){
       window.location.href="/"
    }
    else{
       dash(true)
    }
  }
  return (
    <div className="h-full mt-6 menuSection w-full">
      <ul className="w-full">
        <li
          onClick={()=>handleOnClick()}
          className={`flex items-center h-12 cursor-pointer border-y-2 border-gray-500`}
          >
          <img src={dashboard} alt="dashboard-img" className="w-10 h-10" />
          <span className="ml-1">Dashboard</span>
        </li>
        <li
          onClick={() => {
            dash(false);
          }}
          className={`flex items-center h-12 cursor-pointer border-y-2 border-gray-500 mt-2`}

        >
          <img src={candidate} alt="candidate-img" className="w-10 h-10" />
          <span className="ml-1">Add Candidate</span>
        </li>
      </ul>
    </div>
  );
};

