import React, { useState } from 'react';
import { candidateInteractionAPI } from '../api/candidateInteraction';

function NewInterAction({ id,setNewInterAction}) {
  const [formData, setFormData] = useState({
    type: '',
    content: '',
    candidateResponded: false
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? e.target.checked : value;
    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    candidateInteractionAPI.createInteraction(formData, id);
    return setNewInterAction(false);
  };

  return (
    <form onSubmit={handleSubmit} className='w-1/2'>
      <div className="mb-4">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="mt-1 p-2 border bg-white text-black border-gray-800  rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
          required
        >
          <option value="">Select type</option>
          <option value="phone">Phone</option>
          <option value="mail">Email</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
        <input
          type="text"
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          className="mt-1 bg-white p-2 border border-gray-800 text-black rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="candidateResponded" className="flex items-center">
          <input
            type="checkbox"
            id="candidateResponded"
            name="candidateResponded"
            checked={formData.candidateResponded}
            onChange={handleChange}
            className="mr-2 form-checkbox h-5 w-5  focus:ring-blue-500 border-green-800 rounded"
          />
          <span className="text-sm font-medium text-gray-700">Candidate Responded</span>
        </label>
      </div>
      <button type="submit" className="flex inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Submit
      </button>
    </form>
  );
}

export default NewInterAction;
