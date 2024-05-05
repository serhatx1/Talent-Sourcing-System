import { DataTypes, or } from 'sequelize';
import { sequelize } from '../config/database.js';

const Interaction = sequelize.define('Interaction', {
    type: {
        type: DataTypes.ENUM('phone', 'mail'),
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    candidateResponded: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    candidateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'candidates',
            key: 'id'
        }
    }
});



export { Interaction};
