import { DataTypes } from "sequelize";
import database from "../config/database.js";

const Imovel = database.define("Imoveis", {
    nomeProp: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    cepImovel: {
        type: DataTypes.STRING(10), // Ex: 00.000-000
        allowNull: false,
        validate: {
            is: /^\d{2}\.\d{3}-\d{3}$/,
        },
    },
    logradouroImovel: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    numeroImovel: {
        type: DataTypes.STRING(10), // Aceita "S/N"
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    bairroImovel: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    municipioImovel: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    ufImovel: {
        type: DataTypes.STRING(2),
        allowNull: false,
        validate: {
            isIn: [['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']],
        },
    },
    objeto: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    frente: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    medNorte: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    confinanteNorte: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    medSul: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    confinanteSul: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    medLeste: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    confinanteLeste: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    medOeste: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    confinanteOeste: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    valor: {
        type: DataTypes.STRING(100), // Ex: "R$ 200.000,00 (duzentos mil reais)"
        allowNull: true,
    },
    local: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

Imovel.sync({ force: false });

export default Imovel;