import { candidateService } from "../services/candidate.js";

async function createCandidate(req, res) {
    try {
        const candidateDetails = req.body;
        await candidateService.createUser(candidateDetails);
        res.status(201).send('Candidate created successfully');
    } catch (error) {
        console.error('Error creating candidate:', error);
        res.status(500).send('Internal server error');
    }
}

async function updateCandidateStatus(req, res) {
    try {
        const candidateId = req.params.id;
        const newStatus = req.body.newStatus;
        const candidate = await candidateService.changeStatus(candidateId, newStatus);
        res.status(200).json(candidate);
    } catch (error) {
        console.error('Error changing candidate status:', error);
        res.status(500).send('Internal server error');
    }
}

async function updateCandidate(req, res) {
    try {
        const candidateId = req.params.id;
        const updatedInfo = req.body;
        const candidate = await candidateService.editCandidate(candidateId, updatedInfo);
        res.status(200).json(candidate);
    } catch (error) {
        console.error('Error updating candidate information:', error);
        res.status(500).send('Internal server error');
    }
}

async function deleteCandidate(req, res) {
    try {
        const candidateId = req.params.id;
        await candidateService.deleteCandidate(candidateId);
        res.status(200).send('Candidate deleted successfully');
    } catch (error) {
        console.error('Error deleting candidate:', error);
        res.status(500).send('Internal server error');
    }
}

async function getAllCandidates(req, res) {
    try {
        const candidates = await candidateService.findAll();
        res.status(200).json(candidates);
    } catch (error) {
        console.error('Error getting all candidates:', error);
        res.status(500).send('Internal server error');
    }
}

async function getCandidateById(req, res) {
    try {
        const candidateId = req.params.id;
        const candidate = await candidateService.findOne(candidateId);
        res.status(200).json(candidate);
    } catch (error) {
        console.error('Error getting candidate by ID:', error);
        res.status(500).send('Internal server error');
    }
}

export { createCandidate, updateCandidateStatus, updateCandidate, deleteCandidate, getAllCandidates, getCandidateById };
