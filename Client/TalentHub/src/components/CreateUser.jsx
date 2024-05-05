import React, { useState } from 'react';
import { createCandidate } from '../api/candidates';

export const CreateUser = ({setShowDashboard,returnDash}) => {
  const [formData, setFormData] = useState({
    "name": '',
    "surname": '',
    "contactInformation": '',
    "status": ''
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await createCandidate(formData)
    setShowDashboard(true)
    await returnDash()
  };

  return (
    <div className=" h-full mt-12 w-full relative">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-full h-full"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="input bg-transparent focus:border-black border-black w-64 mt-2"
        />
        <input
          type="text"
          name="surname"
          value={formData.surname}
          onChange={handleInputChange}
          placeholder="Surname"
          className="input bg-transparent focus:border-black border-black w-64 mt-2"
        />
        <input
          type="text"
          name="contactInformation"
          value={formData.contactInformation}
          onChange={handleInputChange}
          placeholder="Contact Information"
          className="input bg-transparent focus:border-black border-black w-64 mt-2"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          className="select bg-transparent border-black focus:border-slate-600  w-64  mt-2"
        >
          <option value="">Select Status</option>
          <option value="sourced">Sourced</option>
          <option value="interviewing">Interviewing</option>
          <option value="offer_Sent">Offer Sent</option>
          <option value="hired">Hired</option>
        </select>
        <button
          type="submit"
          className="btn bg-slate-100 text-black hover:text-white w-64 mt-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
