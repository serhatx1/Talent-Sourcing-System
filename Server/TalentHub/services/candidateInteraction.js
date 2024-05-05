
import { Interaction } from '../models/candidateInteraction.js';
const candidateController = {
    async createInteraction(interactionData, candidateId) {
        console.log("Candidate ID is", candidateId);
    
        if (typeof candidateId !== "number") {
            return {"message": "Please enter candidate's id."};
        }
    
        try {
            const defaultInteractionData = {
                candidateId: candidateId
            };
    
            const mergedInteractionData = { ...defaultInteractionData, ...interactionData };
            console.log("Merged interaction data:", mergedInteractionData);
    
            const dummyInteraction = await Interaction.create(mergedInteractionData);
    
            return {"message": "Interaction created successfully."};
        } catch (error) {
            console.error('Error creating interaction:', error);
            return {"message": "An error occurred while creating the interaction."};
        }
    },
     async editInteraction (id, chunk) {
        try {
            const candidate = await Interaction.findOne({where:{id:id}});
            if (!candidate) {
                return {"message":"Candidate can't be founded"}
            }
            candidate.createdAt= chunk.createdAt

            Object.assign(candidate, chunk);
         

            await candidate.save();
        } catch (error) {
            console.error('Error updating candidate information:', error);
        }
    },
    async findOne(id) {
        try {
            const interaction = await Interaction.findAll({ where: { candidateId:id} });
            if (!interaction) {
                return { message: "Interaction not found" };
            }
            return interaction;
        } catch (error) {
            console.error('Error finding interaction:', error);
            throw error;
        }
    },
    async findWithPrimary(id) {
        try {
            console.log("interactsaion")

            const interaction = await Interaction.findOne({where:{id:id}});
            if (!interaction) {
                return { message: "Interaction not found" };
            }
            return interaction;
        } catch (error) {
            console.error('Error finding interaction:', error);
            throw error;
        }
    },
    async deleteOne(id) {
        try {
            const interaction = await Interaction.findOne({ where: { id:id} });
            if (!interaction) {
                return { message: "Interaction not found" };
            }
            await interaction.destroy()
            return interaction;
        } catch (error) {
            console.error('Error finding interaction:', error);
            throw error;
        }
    },
    async deleteAll(id) {
        try {
            const interaction = await Interaction.findOne({ where: { candidateId:id} });
            if (!interaction) {
                return false;
            }
            await interaction.destroyed()
            return interaction;
        } catch (error) {
            console.error('Error finding interaction:', error);
            throw error;
        }
    },  
};
export {candidateController};
