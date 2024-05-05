import React from 'react';
import process from "../assets/process.png"
import okay from "../assets/okay.png"
const CandidateTable = ({
  shownCandidates,
  selectedCandidates,
  handleSelectCandidate,
  handleInteractionView,
}) => {
  return (
    <table className="w-full mt-8 table-auto">
      <thead>
        <tr>
          <th>Selection</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Contact Information</th>
          <th>Status</th>
          <th>Interactions</th>
        </tr>
      </thead>
      <tbody className="w-full h-36 text-center">
        {shownCandidates.map((candidate) => (
          <tr className="align-top w-full text-center " key={candidate.id}>
            <td className=" pt-2 cursor-pointer">
              <input
                type="checkbox"
                onChange={() => handleSelectCandidate(candidate.id)}
                checked={selectedCandidates.includes(candidate.id)}
                className="checkbox checkbox-success bg-slate-800 "
              />
            </td>
            <td className=" pt-2">{candidate.name}</td>
            <td className=" pt-2">{candidate.surname}</td>
            <td className=" pt-2">{candidate.contactInformation}</td>
            <td className=" pt-2 justify-center flex items-center">
              {candidate.status}
              {candidate.status !== "hired" ? (
                <img className="w-8 pl-2 " src={process} alt="" />
              ) : (
                <img className="w-8 pl-2 " src={okay} alt="" />
              )}
            </td>
            <td
              onClick={() => {
                handleInteractionView(candidate.id);
              }}
              className=" pt-2 cursor-pointer "
            >
              <p className="bg-slate-800  text-white">View</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CandidateTable;
