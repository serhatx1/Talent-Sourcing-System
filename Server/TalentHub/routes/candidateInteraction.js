import express from 'express';
import { updateInteraction,createInteractionController,findOne,findWithPrimary, deleteInteraction} from '../controller/candidateInteraction.js';
const router = express.Router();
router.get('/interactions/candidate/:id',findOne);
router.get('/interactions/find/:id',findWithPrimary);
router.put('/interactions/edit/:id',updateInteraction);
router.delete('/interactions/delete/:id', deleteInteraction);
router.put('/interactions/:id', updateInteraction);
router.post('/interactions/create/:id/', createInteractionController);
export {router as candidateInterActionRouter}
