import { DataTypes } from "sequelize";
import database from "../config/database.js";

const Cliente = database.define('Clientes', {
    nomeCliente: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    cpf: {
        type: DataTypes.STRING(14), // Ex: 000.000.000-00
        allowNull: false,
        unique: true,
        validate: {
            is: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
        },
    },
    dataNasc: {
        type: DataTypes.STRING(10), // Ex: 01/08/2025
        allowNull: false,
        validate: {
            is: /^\d{2}\/\d{2}\/\d{4}$/,
        },
    },
    estadoCivil: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    profissao: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    cepCliente: {
        type: DataTypes.STRING(10), // Ex: 00.000-000
        allowNull: false,
        validate: {
            is: /^\d{2}\.\d{3}-\d{3}$/,
        },
    },
    logradouroCliente: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    numeroCliente: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    bairroCliente: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    municipioCliente: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    ufCliente: {
        type: DataTypes.STRING(2),
        allowNull: false,
        validate: {
            isIn: [['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']],
        },
    },
});

Cliente.sync({ force: false });

export default Cliente;