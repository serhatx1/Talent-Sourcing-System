import express from "express";
import {Candidate} from "./models/candidate.js";
import { Interaction } from "./models/candidateInteraction.js";
import {sequelize} from "./config/database.js"; 
import { candidateInterActionRouter } from "./routes/candidateInteraction.js";
import { candidateRouter } from "./routes/candidate.js";
import cors from "cors"
const app = express();
const port = 8000;
app.use(cors());
sequelize.sync()
  .then(() => {
    console.log('Database synced');
    app.listen(port, () => {
      console.log(`Server is listening at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });
  app.use(express.json());
  app.use("/api",candidateRouter)
  app.use("/api",candidateInterActionRouter)
