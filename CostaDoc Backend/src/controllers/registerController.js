import Cliente from "../models/Cliente.js";
import Imovel from "../models/Imovel.js";

export const registerCustomer = async (req, res) => {
    const customerInfo = req.body;

    try {
        const cliente = await Cliente.create({
            nomeCliente: customerInfo.nome,
            cpf: customerInfo.cpf,
            dataNasc: customerInfo.dataNasc,
            estadoCivil: customerInfo.estadoCivil,
            profissao: customerInfo.profissao,
            cepCliente: customerInfo.cep,
            logradouroCliente: customerInfo.logradouro,
            numeroCliente: customerInfo.numero,
            bairroCliente: customerInfo.bairro,
            municipioCliente: customerInfo.municipio,
            ufCliente: customerInfo.uf
        });

        return res.status(201).json({ message: "Cliente cadastrado com sucesso!", code: 201, cliente: cliente });
    } catch(error) {
        return res.status(500).json({ message: "Erro ao cadastrar cliente", erro: error, code: 500 });
    }
}

export const registerProperty = async (req, res) => {
    const propertyInfo = req.body;

    try {
        const imovel = await Imovel.create({
            nomeProp: propertyInfo.nome,
            cepImovel: propertyInfo.cep,
            logradouroImovel: propertyInfo.logradouro,
            numeroImovel: propertyInfo.numero,
            bairroImovel: propertyInfo.bairro,
            municipioImovel: propertyInfo.municipio,
            ufImovel: propertyInfo.uf,
            objeto: propertyInfo.objeto,
            frente: propertyInfo.frente,
            medNorte: propertyInfo.medNorte,
            confinanteNorte: propertyInfo.confinanteNorte,
            medSul: propertyInfo.medSul,
            confinanteSul: propertyInfo.confinanteSul,
            medLeste: propertyInfo.medLeste,
            confinanteLeste: propertyInfo.confinanteLeste,
            medOeste: propertyInfo.medOeste,
            confinanteOeste: propertyInfo.confinanteOeste,
            valor: propertyInfo.valorImovel,
            local: propertyInfo.localizacao
        });

        return res.status(201).json({ message: "Imóvel cadastrado com sucesso!", code: 201, imovel: imovel })
    } catch(error) {
        return res.status(500).json({ message: "Erro ao cadastrar imovel", erro: error, code: 500 });
    }
}