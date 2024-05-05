import React, { useEffect, useState } from 'react';
import { deleteCandidate, getAllCandidates, getCandidateById, updateCandidate } from '../api/candidates';
import Search from './Search';

import { Interactions } from './Interactions';
import CandidateTable from './CandidateTable';
import EditCandidate from './EditCandidate';

export const Candidates = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [candidates, setCandidates] = useState([]);
  const [pageSize] = useState(3);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [editPop, setEditPop] = useState(false);
  const [boolView, setBoolView] = useState(false);
  const [candidateId,setCandidateId] = useState()
  const [singleCandidate, setSingleCandidate] = useState({});

  const fetchData = async () => {
    try {
      const data = await getAllCandidates();
      setCandidates(data);
      setFilteredCandidates(data); 
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalPages = Math.ceil(filteredCandidates.length / pageSize);

  const handleInteractionView = (id)=>{
    setCandidateId(id)
    setBoolView(true)
  }

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  useEffect(() => {
    setFilteredCandidates(candidates);
  }, [candidates]);

  const handleSearch = query => {
    const filtered = candidates.filter(candidate =>
      (candidate.name.toLowerCase() + " " + candidate.surname.toLowerCase()).includes(query.toLowerCase())
    );
    setFilteredCandidates(filtered);
    setCurrentPage(1); 
  };

  const handleSelectCandidate = id => {
    if (selectedCandidates.includes(id)) {
      setSelectedCandidates(selectedCandidates.filter(candidateId => candidateId !== id));
    } else {
      setSelectedCandidates([...selectedCandidates, id]);
    }
  };
  
  const handleEdit = async () => {
    const data = await getCandidateById(selectedCandidates[0]);
    setSingleCandidate(data);
    setEditPop(true);
  };

  const handleDelete = async () => {
    for (let ID of selectedCandidates) {
      await deleteCandidate(ID);
      const data = await getAllCandidates();

      setCurrentPage(1);
      setCandidates(data);
      setFilteredCandidates(data);
      setSelectedCandidates([]);
    }
  };

  const handleInputChange = (e, field) => {
    setSingleCandidate(prevState => ({
      ...prevState,
      [field]: e.target.value
    }));
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSingleCandidate(prevState => ({
      ...prevState,
      status: status
    }));
  };

  const handleCheckClick = async() => {
    await updateCandidate(selectedCandidates[0],singleCandidate)
    setEditPop(false)
    await fetchData()
  };

  const onCancelEdit = () => {
    setEditPop(false);
    setSingleCandidate({});
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const shownCandidates = filteredCandidates.slice(startIndex, endIndex);

  return (
    <div className="h-full mt-12 w-full relative">
      {boolView == true ? (
        <Interactions
          id={candidateId}
          boolView={boolView}
          setBoolView={setBoolView}
        />
      ) : (
        ""
      )}
      <div
        onClick={() => {
          setEditPop(false);
          boolView == true && setBoolView(false);
        }}
        className={`${editPop === true || boolView ? "blur-2xl" : ""} h-full`}
      >
        <div className={`flex items-center justify-center`}>
          <Search onSearch={handleSearch} />
        </div>
        <CandidateTable
          shownCandidates={shownCandidates}
          selectedCandidates={selectedCandidates}
          handleSelectCandidate={handleSelectCandidate}
          handleInteractionView={handleInteractionView}
        />
        <div className="pagination pr-24 w-full flex items-center justify-between p-4 mt-6 ">
          <div className="pl-24">
            <button
              disabled={selectedCandidates.length !== 1}
              onClick={handleEdit}
              className="disabled:opacity-50 disabled:cursor-default bg-slate-800 cursor-pointer text-white rounded px-4 py-2 w-18"
            >
              Edit
            </button>
            <button
              disabled={selectedCandidates.length == 0}
              onClick={handleDelete}
              className="disabled:opacity-50 disabled:cursor-default bg-slate-800 cursor-pointer text-white rounded px-4 ml-4 py-2 w-18"
            >
              Delete
            </button>
          </div>
          <div className="bg-slate-800 px-6 py-2 ">
            <button
              className="pr-4 text-white disabled:opacity-60 text-l font-bold"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="text-white font-bold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="pl-4 text-white disabled:opacity-60 font-bold text-l"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {editPop === true && (
        <EditCandidate
          singleCandidate={singleCandidate}
          handleInputChange={handleInputChange}
          handleStatusChange={handleStatusChange}
          handleCheckClick={handleCheckClick}
          onCancelEdit={onCancelEdit}
        />
      )}
    </div>
  );
};
