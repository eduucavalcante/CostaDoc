import { DataTypes } from "sequelize";
import database from "../config/database.js";

const User = database.define('Usuarios', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

User.sync({ force: false });

export default User;