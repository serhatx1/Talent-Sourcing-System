import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

export const getAllCandidates = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/candidates`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching candidates:', error);
        throw error;
    }
};

export const createCandidate = async (candidateData) => {
    try {
        console.log(candidateData)
        const response = await axios.post(`${BASE_URL}/candidates`, candidateData);
        return response.data;
    } catch (error) {
        console.error('Error creating candidate:', error);
        throw error;
    }
};

export const updateCandidateStatus = async (candidateId, newStatus) => {
    try {
        const response = await axios.put(`${BASE_URL}/candidates/${candidateId}/status`, { newStatus });
        return response.data;
    } catch (error) {
        console.error('Error updating candidate status:', error);
        throw error;
    }
};

export const updateCandidate = async (candidateId, updatedCandidateData) => {
    try {
        const response = await axios.put(`${BASE_URL}/candidates/${candidateId}`, updatedCandidateData);
        return response.data;
    } catch (error) {
        console.error('Error updating candidate:', error);
        throw error;
    }
};

export const deleteCandidate = async (candidateId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/candidates/${candidateId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting candidate:', error);
        throw error;
    }
};

export const getCandidateById = async (candidateId) => {
    try {
        const response = await axios.get(`${BASE_URL}/candidates/${candidateId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching candidate by ID:', error);
        throw error;
    }
};
