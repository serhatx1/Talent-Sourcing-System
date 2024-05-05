import { Interaction } from '../models/candidateInteraction.js';
import { candidateController } from '../services/candidateInteraction.js';

async function updateInteraction(req, res) {
    try {
        const interactionId = req.params.id;
        const updatedData = req.body;
        const result = await candidateController.editInteraction(interactionId, updatedData);
        if (result && result.message) {
            return res.status(404).json({ message: result.message });
        }
        res.status(200).json({ message: 'Interaction updated successfully' });
    } catch (error) {
        console.error('Error updating interaction:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
async function createInteractionController(req, res) {
    try {
        const  interactionData  = req.body;
        const candidateId = parseInt(req.params.id)
        if (typeof candidateId !== "number") {
            return res.status(400).json({ message: "Please provide a valid candidate ID." });
        }

        const defaultInteractionData = {
            date: new Date(),
        };
        const mergedInteractionData = { ...defaultInteractionData, ...interactionData };
        const createdInteraction = await candidateController.createInteraction(mergedInteractionData,candidateId);
        res.status(201).json(createdInteraction.toJSON());
    } catch (error) {
        console.error('Error creating interaction:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
async function findOne(req,res){

    try {
         const candidateId = parseInt(req.params.id)

        if(typeof candidateId!=="number"){
            return error
        }
        const data = await candidateController.findOne(candidateId)
        res.status(200).json(data)
    } catch (error) {
        
    }
}
async function deleteInteraction(req,res){
    try {
         const candidateId = parseInt(req.params.id)

        if(typeof candidateId!=="number"){
            return error
        }
        const data = await candidateController.deleteOne(candidateId)
        res.status(200).json(data)
    } catch (error) {
        
    }
}
async function findWithPrimary(req,res){

    try {
         const id = parseInt(req.params.id)

        if(typeof id!=="number"){
            return error
        }
        const data = await candidateController.findWithPrimary(id)
        res.status(200).json(data)
    } catch (error) {
        
    }
}
export { updateInteraction,createInteractionController,findOne,findWithPrimary,deleteInteraction};
