import React, { useEffect, useState } from 'react';
import { candidateInteractionAPI } from '../api/candidateInteraction';

const EditInteraction = ({ id,setIsEdit,fetchInteractions }) => {
    const [interactionData, setInteractionData] = useState({
        type: '',
        content: '',
        date: '',
        candidateResponded: false
    });

    const formatDate = (dateString) => {
        let data =dateString;

       for(let i in dateString){
        if(dateString[i]!=parseInt(dateString[i])&&dateString[i]!="-"){
            console.log(dateString[i])
            data= dateString.slice(0,dateString.indexOf(dateString[i]))
            break
        }
       }
        
        return data;
    };
    const handleEdit = async () => {
        try {
            const data = await candidateInteractionAPI.getInteractionsById(id);
            setInteractionData(data);
        } catch (error) {
            console.error('Error fetching interaction data:', error);
        }
    };

    useEffect(() => {
        handleEdit();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;
        setInteractionData({
            ...interactionData,
            [name]: val
        });
    };

    const handleSave = async () => {
        try {
            for(let i in interactionData.createdAt){
                if(interactionData.createdAt[i]!=parseInt(interactionData.createdAt[i]) && interactionData.createdAt[i]!="-"){
                    interactionData.createdAt=interactionData.date+""+interactionData.createdAt.slice(interactionData.createdAt.indexOf(interactionData.createdAt[i]),interactionData.createdAt.length)
                    break

                }
                
            }
            delete interactionData.date
            await candidateInteractionAPI.editInteraction(interactionData.id,interactionData)
             await fetchInteractions()
             setIsEdit(false)


        } catch (error) {
            console.error('Error saving interaction data:', error);
        }
    };

    return (
      <div className="editInteraction relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-400">
          <tbody className="bg-slate-600">
            <tr className="interactionTable dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Type
              </td>
              <td className="px-6 py-4">
                <select
                  name="type"
                  value={interactionData.type}
                  onChange={handleChange}
                  className="border-b-2 bg-slate-100"
                >
                  <option value="">Select Type</option>
                  <option value="phone">Phone</option>
                  <option value="mail">Mail</option>
                </select>
              </td>
            </tr>
            <tr className="interactionTable dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Content
              </td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  name="content"
                  value={interactionData.content}
                  onChange={handleChange}
                  className="border-b-2 bg-slate-100 border-blue-100"
                />
              </td>
            </tr>
            <tr className="interactionTable dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Date
              </td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  name="date"
                  value={formatDate(interactionData.date)}
                  onChange={handleChange}
                  className="border-b-2 bg-slate-100"
                />
              </td>
            </tr>
            <tr className="interactionTable dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Candidate Responded
              </td>
              <td className="px-6 py-4">
                <input
                  type="checkbox"
                  name="candidateResponded"
                  checked={interactionData.candidateResponded}
                  onChange={handleChange}
                  className=""
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-center my-4">
          <button
            onClick={handleSave}
            className="px-4 py-2mx-1 bg-blue-500 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    );
};

export default EditInteraction;
