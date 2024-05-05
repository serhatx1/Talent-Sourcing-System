import {Candidate} from '../models/candidate.js'
import { candidateController } from './candidateInteraction.js';
const candidateService = {
 async createUser (candidateDetails){
    try {
        await Candidate.sync({ force: false });
        console.log('Candidate model synchronized with database.');
        try {
            const newCandidate = await Candidate.create(candidateDetails);
            const userId = newCandidate.id
            const newInteraction = await candidateController.createInteraction(candidateDetails.interaction,userId);
            console.log('Candidate created successfully:', newCandidate);
        } catch (error) {
            console.error('Error creating candidate:', error);
        }
    } catch (error) {
        console.error('Error synchronizing Candidate model with database:', error);
    }
},

  async changeStatus(candidateId, newStatus) {
    try {
      const candidate = await Candidate.findByPk(candidateId);
      if (!candidate) {
        throw new Error('Candidate not found');
      }
      candidate.status = newStatus;
      await candidate.save();
      console.log(`Status of candidate with ID ${candidateId} changed to ${newStatus}`);
      return candidate;
    } catch (error) {
      console.error('Error changing candidate status:', error);
      throw error;
    }
  },

  async editCandidate(candidateId, updatedInfo) {
    try {
      const candidate = await Candidate.findByPk(candidateId);
      if (!candidate) {
        throw new Error('Candidate not found');
      }
      Object.assign(candidate, updatedInfo);
      await candidate.save();
      console.log(`Candidate with ID ${candidateId} updated successfully`);
      return candidate;
    } catch (error) {
      console.error('Error updating candidate information:', error);
      throw error;
    }
  },

  async deleteCandidate(candidateId) {
    try {
      const candidate = await Candidate.findByPk(candidateId);
      if (!candidate) {
        throw new Error('Candidate not found');
      }
      await candidate.destroy();
      while(true){
        const k = await candidateController.deleteAll(candidateId)
        if(k==false){
          break;
        }
      }
      console.log(`Candidate with ID ${candidateId} deleted successfully`);
    } catch (error) {
      console.error('Error deleting candidate:', error);
      throw error;
    }
  },
  async findAll() {
    try {
      const candidates = await Candidate.findAll();
      const candidatesWithInteractions = [];
  
      for (let candidate of candidates) {
        let candidateId = candidate.id;
        const interactions = await candidateController.findOne(candidateId);

        let candidateWithInteractions = { ...candidate};
        candidateWithInteractions.dataValues.interactions = interactions
        console.log(interactions)
        candidatesWithInteractions.push(candidateWithInteractions.dataValues);
      }
      return candidatesWithInteractions;
    } catch (error) {
      throw new Error(`Error retrieving candidates: ${error.message}`);
    }
  },
  async findOne(candidateId) {
    try {
      const candidate = await Candidate.findOne({ where: { id: candidateId } });
      if (!candidate) {
        throw new Error('Candidate not found');
      }
      const interactions = await candidateController.findOne(candidateId);
      candidate.dataValues.interactions = interactions;
      return candidate;
    } catch (error) {
      throw new Error(`Error retrieving candidate: ${error.message}`);
    }
  }
  
};
export {candidateService};

