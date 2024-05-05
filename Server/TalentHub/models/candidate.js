import { DataTypes } from 'sequelize';
import { sequelize } from "../config/database.js"; 

const Candidate = sequelize.define('Candidate', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contactInformation: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.ENUM('sourced', 'interviewing', 'offer_sent', 'hired'),
        defaultValue: 'sourced'
    }
});


export { Candidate};
