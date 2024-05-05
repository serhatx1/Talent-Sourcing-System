import React, { useEffect, useState } from 'react';
import { candidateInteractionAPI } from '../api/candidateInteraction';
import NewInterAction from './NewInterAction';
import EditInteraction from './EditInteraction';

export const Interactions = ({ id, boolView, setBoolView }) => {
    const [allInteractions, setAllInteractions] = useState([]);
    const [addNewInterAction, setNewInterAction] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [interactionsPerPage] = useState(3);
    const [isEdit,setIsEdit] = useState(false)
    const [interactionId,setInteractionId] = useState()

    const fetchInteractions = async () => {
        try {
            const data = await candidateInteractionAPI.getInteractionsByCandidateId(id);
            setAllInteractions(data);
        } catch (error) {
            console.error('Error fetching interactions:', error);
        }
    };
    useEffect(() => {
       

     fetchInteractions();
    }, [id,addNewInterAction,isEdit]);

    const indexOfLastInteraction = currentPage * interactionsPerPage;
    const indexOfFirstInteraction = indexOfLastInteraction - interactionsPerPage;
    console.log(allInteractions)

    const currentInteractions = allInteractions.slice(indexOfFirstInteraction, indexOfLastInteraction);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        return `${day} ${monthNames[monthIndex]} ${year}`;
    };
    const handlEdit =(ID)=>{
        setIsEdit(true)
        setInteractionId(ID)
        return fetchInteractions()

    }
    const handleDelete=async (ID)=>{
        console.log(ID)
        await candidateInteractionAPI.deleteInteraction(ID)
        await fetchInteractions()
    }

    return (
      <div className="mt-12 py-4 ">
        {isEdit == true ? (
          <EditInteraction
            id={interactionId}
            fetchInteractions={fetchInteractions}
            setIsEdit={setIsEdit}
          />
        ) : (
          ""
        )}
        {isEdit == false && (
          <div className=" p-4  overflow-x-auto shadow-md sm:rounded-lg">
            {console.log(currentInteractions)}
            <table className="w-full text-sm  relative text-left rtl:text-right text-gray-700 dark:text-gray-400">
              <button
                type="button"
                onClick={() => {
                  setBoolView(false);
                }}
                className="hover:none bg-transparent 
                        absolute top-1 text-xl shadow-xl right-2 bg-white 
                        rounded-md w-8 h-8 p-2 absolute right-4 top-1 inline-flex 
                        items-center justify-center text-white
                        focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500
                        interactionBtn
                    "
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
              <thead className="text-xstext-gray-700  uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-white">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-white">
                    Content
                  </th>
                  <th scope="col" className="px-6 py-3 text-white">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-white">
                    Candidate Responded
                  </th>
                  <th scope="col" className="px-6 py-3 text-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {currentInteractions.map((interaction, index) => (
                  <tr
                    key={index}
                    className={`interactionTable dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {interaction.type}
                    </td>
                    <td className="px-6 py-4">{interaction.content}</td>
                    <td className="px-6 py-4">
                      {formatDate(interaction.date)}
                    </td>
                    <td className="px-6 py-4">
                      {interaction.candidateResponded ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handlEdit(interaction.id)}
                        className="bg-blue-500 hover:bg-blue-700 !text-white font-bold py-2 px-4 border border-blue-700 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(interaction.id)}
                        className="ml-2 bg-red-600 hover:bg-red-700 !text-white font-bold py-2 px-4 border border-red-700 rounded"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
                <button
                  onClick={() => setNewInterAction(true)}
                  className="bg-black text-white mt-2 ml-1 font-semibold py-2 px-6 border-2 border-black hover:scale-105 rounded"
                >
                  Add
                </button>
              </tbody>
            </table>
            <div className="flex justify-center my-4">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-1 bg-blue-500 text-white rounded-md"
              >
                Prev
              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentInteractions.length < interactionsPerPage}
                className="px-4 py-2 mx-1 bg-blue-500 text-white rounded-md"
              >
                Next
              </button>
            </div>

            {addNewInterAction && (
              <NewInterAction setNewInterAction={setNewInterAction} id={id} />
            )}
          </div>
        )}
      </div>
    );
};

export default Interactions;
