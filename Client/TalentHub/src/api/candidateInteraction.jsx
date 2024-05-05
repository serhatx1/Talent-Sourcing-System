import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

export const candidateInteractionAPI = {
    createInteraction: async (interactionData, candidateId) => {
        try {
            console.log(interactionData);
            const response = await axios.post(`${BASE_URL}/interactions/create/${candidateId}`, interactionData);
            return response.data;
        } catch (error) {
            console.error('Error creating interaction:', error);
            throw error;
        }
    },

    editInteraction: async (interactionId, updatedInteractionData) => {
        try {
            const response = await axios.put(`${BASE_URL}/interactions/edit/${interactionId}`, updatedInteractionData);
            return response.data;
        } catch (error) {
            console.error('Error updating interaction:', error);
            throw error;
        }
    },

    getInteractionsByCandidateId: async (candidateId) => {
        try {

            const response = await axios.get(`${BASE_URL}/interactions/candidate/${candidateId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching interactions by candidate ID:', error);
            throw error;
        }
    },
    getInteractionsById: async (id) => {
        try {

            const response = await axios.get(`${BASE_URL}/interactions/find/${id}`);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error('Error fetching interactions by candidate ID:', error);
            throw error;
        }
    },

    deleteInteraction: async (interactionId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/interactions/delete/${interactionId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting interaction:', error);
            throw error;
        }
    }
};
