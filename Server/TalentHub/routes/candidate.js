import express from 'express';
import {
    createCandidate,
    updateCandidateStatus,
    updateCandidate,
    deleteCandidate,
    getAllCandidates,
    getCandidateById
} from "../controller/candidate.js"
const router = express.Router();
router.post('/candidates', createCandidate);
router.put('/candidates/:id/status', updateCandidateStatus);
router.put('/candidates/:id', updateCandidate);
router.delete('/candidates/:id', deleteCandidate);
router.get('/candidates', getAllCandidates);
router.get('/candidates/:id', getCandidateById);
export {router as candidateRouter}
