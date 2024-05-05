import React from 'react';
import process from "../assets/process.png"
import okay from "../assets/okay.png"
const EditCandidate = ({
  singleCandidate,
  handleInputChange,
  handleStatusChange,
  handleCheckClick,
  onCancelEdit
}) => {
  return (
    <div className="NonbluredArea absolute top-1/3 w-full flex   left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800">
      <div className="flex w-full relative flex-col h-full">
        <div className="overflow-x-auto w-full h-full sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full h-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden h-full">
              <table className="min-w-full text-left h-full text-sm font-light text-surface dark:text-white ">
                <thead className="border-b h-full border-neutral-200 font-medium ">
                  <tr className="h-full">
                    <th scope="col" className="px-6 py-4">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Surname
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Contact Information
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Handle
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-neutral-200 p-4">
                    <td className="whitespace-nowrap px-6 py-4">
                      <input
                        type="text"
                        value={singleCandidate.name}
                        onChange={(e) => handleInputChange(e, "name")}
                        className="bg-white"
                      />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <input
                        type="text"
                        value={singleCandidate.surname}
                        onChange={(e) => handleInputChange(e, "surname")}
                        className="bg-white"
                      />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <input
                        type="text"
                        value={singleCandidate.contactInformation}
                        onChange={(e) => handleInputChange(e, "contactInformation")}
                        className="bg-white"
                      />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 flex mt-1">
                      <select
                        onChange={handleStatusChange}
                        defaultValue={singleCandidate.status}
                        className="bg-white text-black"
                      >
                        <option className=" text-black" value="hired">
                          Hired
                        </option>
                        <option className=" text-black" value="interviewing">
                          Interviewing
                        </option>
                        <option className=" text-black" value="sourced">
                          Sourced
                        </option>
                        <option className=" text-black" value="offer_sent">
                          Offer Sent
                        </option>
                      </select>
                      {singleCandidate.status !== "hired" ? (
                        <img
                          className="w-7 h-6 ml-2 bg-white rounded "
                          src={process}
                          alt=""
                        />
                      ) : (
                        <img
                          className="w-7 h-6 ml-2 pl-2 "
                          src={okay}
                          alt=""
                        />
                      )}
                    </td>

                    <td
                      onClick={handleCheckClick}
                      className="px-6 py-4 !w-1/3 "
                    >
                      <button className="!w-full flex justify-center bg-green-700 px-6 py-1 text-white ">
                        Change
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={onCancelEdit}
        className="hover:none bg-transparent 
        absolute top-4 text-xl shadow-xl right-5bg-white 
        rounded-md w-8 h-8 p-2 absolute right-4 top-1 inline-flex 
        items-center justify-center text-gray-400 hover:text-gray-1000 hover:scale-125 
        focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
      >
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default EditCandidate;
