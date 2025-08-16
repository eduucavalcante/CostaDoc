import Cliente from "../models/Cliente.js";
import Imovel from "../models/Imovel.js";
import fs from 'fs';
import path from 'path';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { Op } from 'sequelize';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllCustomers = async (req, res) => {
    try {
        let orderBy = [['id', 'DESC']];
        if (req.query.filtro != "recente") orderBy = [['nomeCliente', 'ASC']];

        const clientes = await Cliente.findAll({
            order: orderBy
        });

        if (!clientes) {
            return res.json({ empty: true });
        }

        return res.status(200).json({ code: 200, clientes: clientes });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Erro ao carregar clientes", erro: error, code: 500 });
    }
}

export const getCustomersBySearch = async (req, res) => {
    try {
        const { filtro, busca } = req.query;

        let orderBy = [['id', 'DESC']];
        if (filtro !== 'recente') orderBy = [['nomeCliente', 'ASC']];

        const whereConditions = {};

        if (busca && busca.trim() !== '') {
            whereConditions[Op.or] = [
                { nomeCliente: { [Op.like]: `%${busca}%` } },
                { cpf: { [Op.like]: `%${busca}%` } }
            ];
        }

        const clientes = await Cliente.findAll({
            where: whereConditions,
            order: orderBy
        });

        if (!clientes) {
            return res.status(200).json({ empty: true });
        }

        return res.status(200).json({ code: 200, clientes });
    } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        return res.status(500).json({ message: "Erro ao buscar clientes", erro: error, code: 500 });
    }
}

export const getCustomerById = async (req, res) => {
    try {
        const cliente = await Cliente.findOne({
            where: {
                id: req.query.id
            }
        });

        if (!cliente) {
            return res.json({ empty: true });
        }

        return res.status(200).json({ code: 200, cliente: cliente });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Erro ao carregar cliente", erro: error, code: 500 });
    }
}

export const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const cliente = await Cliente.findByPk(id);

        if (!cliente) return res.status(404).json({ message: "Cliente não encontrado" });

        await cliente.update(updateData);

        return res.status(200).json({ code:200, message: "Cliente atualizado com sucesso" });
    } catch(error) {
        console.error("Erro ao atualizar cliente:", error);
        return res.status(500).json({ code: 500, message: "Erro ao atualizar cliente" });
    }
}

export const deleteCustomer = async (req, res) => {
    const { id } = req.params;

    try {
        await Cliente.destroy({
            where: {
                id: id
            }
        });

        return res.status(200).json({ code: 200, message: "Cliente excluído com sucesso." });
    } catch(error) {
        console.log("Erro ao remover cliente: ", error);
        return res.status(500).json({ code: 500, message: "Erro ao remover cliente", erro: error });
    }
}

export const getAllProperties = async (req, res) => {
    try {
        let orderBy = [['id', 'DESC']];
        if (req.query.filtro != "recente") orderBy = [['nomeProp', 'ASC']];

        const imoveis = await Imovel.findAll({
            order: orderBy
        });

        if (!imoveis) {
            return res.json({ empty: true });
        }

        return res.status(200).json({ code: 200, imoveis: imoveis });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao carregar imóveis", erro: error, code: 500 });
    }
}

export const getPropertyBySearch = async (req, res) => {
    try {
        const { filtro, busca } = req.query;

        let orderBy = [['id', 'DESC']];
        if (filtro !== 'recente') orderBy = [['nomeProp', 'ASC']];

        const whereConditions = {};

        if (busca && busca.trim() !== '') {
            whereConditions[Op.or] = [
                { nomeProp: { [Op.like]: `%${busca}%` } }
            ];
        }

        const imoveis = await Imovel.findAll({
            where: whereConditions,
            order: orderBy
        });

        if (!imoveis) {
            return res.status(404).json({ message: "Imóvel não encontrado", code: 404 });
        }

        return res.status(200).json({ message: `Imóveis com o proprietário(a) ${busca} encontrados`, imoveis });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao pesquisar imóveis", code: 500 });
    }
}

export const getPropertyById = async (req, res) => {
    try {
        const imovel = await Imovel.findOne({
            where: {
                id: req.query.id
            }
        });

        if (!imovel) {
            return res.json({ empty: true });
        }

        return res.status(200).json({ code: 200, imovel: imovel });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Erro ao carregar imóvel", erro: error, code: 500 });
    }
}

export const updateProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const imovel = await Imovel.findByPk(id);

        if (!imovel) return res.status(404).json({ message: "Imóvel não encontrado" });

        await imovel.update(updateData);

        return res.status(200).json({ code:200, message: "Imóvel atualizado com sucesso" });
    } catch(error) {
        console.error("Erro ao atualizar imóvel:", error);
        return res.status(500).json({ code: 500, message: "Erro ao atualizar imóvel" });
    }
}

export const deleteProperty = async (req, res) => {
    const { id } = req.params;

    try {
        await Imovel.destroy({
            where: {
                id: id
            }
        });

        return res.status(200).json({ code: 200, message: "Imóvel excluído com sucesso." });
    } catch(error) {
        console.log("Erro ao remover imóvel: ", error);
        return res.status(500).json({ code: 500, message: "Erro ao remover imóvel", erro: error });
    }
}

export const generateContract = (req, res) => {
    try {
        const data = req.body;
        const baseTemplatePath = path.resolve(__dirname, "..", "templates");
        let templatePath = "";
        const docData = {
            // Dados cliente 1
            nomeCliente1: data.cliente1.nomeCliente,
            estadoCivil1: data.cliente1.estadoCivil,
            profissao1: data.cliente1.profissao,
            cpf1: data.cliente1.cpf,
            dataNasc1: data.cliente1.dataNasc,
            logradouroCliente1: data.cliente1.logradouroCliente,
            numeroCliente1: data.cliente1.numeroCliente,
            bairroCliente1: data.cliente1.bairroCliente,
            municipioCliente1: data.cliente1.municipioCliente,
            ufCliente1: data.cliente1.ufCliente,
            cepCliente1: data.cliente1.cepCliente,

            // Dados cliente 2
            nomeCliente2: data.cliente2.nomeCliente,
            estadoCivil2: data.cliente2.estadoCivil,
            profissao2: data.cliente2.profissao,
            cpf2: data.cliente2.cpf,
            dataNasc2: data.cliente2.dataNasc,
            logradouroCliente2: data.cliente2.logradouroCliente,
            numeroCliente2: data.cliente2.numeroCliente,
            bairroCliente2: data.cliente2.bairroCliente,
            municipioCliente2: data.cliente2.municipioCliente,
            ufCliente2: data.cliente2.ufCliente,
            cepCliente2: data.cliente2.cepCliente,

            // Dados objeto do contrato
            nomePropImovel: data.imovel.nomeProp,
            logradouroImovel: data.imovel.logradouroImovel,
            numeroImovel: data.imovel.numeroImovel,
            bairroImovel: data.imovel.bairroImovel,
            municipioImovel: data.imovel.municipioImovel,
            ufImovel: data.imovel.ufImovel,
            cepImovel: data.imovel.cepImovel,

            dataContrato: data.imovel.dataContrato
        };

        if (data.tipo == "locacao") {
            templatePath = path.resolve(baseTemplatePath, "locacao-template.docx");

            docData.prazo = data.imovel.prazo;
            docData.dataInicio = data.imovel.dataInicio;
            docData.valorAluguel = data.imovel.valorAluguel;
            docData.diaPagamento = data.imovel.diaPagamento;
        }
        if (data.tipo == "compra") {
            templatePath = path.resolve(baseTemplatePath, "compraevenda-template.docx");

            docData.objeto = data.imovel.objeto;
            docData.frentePara = data.imovel.frente;
            docData.medNorte = data.imovel.medNorte;
            docData.confinanteNorte = data.imovel.confinanteNorte;
            docData.medSul = data.imovel.medSul;
            docData.confinanteSul = data.imovel.confinanteSul;
            docData.medLeste = data.imovel.medLeste;
            docData.confinanteLeste = data.imovel.confinanteLeste;
            docData.medOeste = data.imovel.medOeste;
            docData.confinanteOeste = data.imovel.confinanteOeste;
            docData.localizacao = data.imovel.local;
            docData.valorImovel = data.imovel.valor;
        }

        const content = fs.readFileSync(templatePath, 'binary');
        const zip = new PizZip(content);

        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true
        });

        try {
            doc.render(docData);
        } catch (error) {
            console.error('Erro ao renderizar o documento:', error);
            return res.status(500).json({ message: 'Erro ao gerar contrato', erro: error, code: 500 });
        }

        const outPath = path.resolve(__dirname, '..', 'templates', 'generated', `contrato-${data.imovel.nomeProp}.docx`);

        const dir = path.dirname(outPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const buf = doc.getZip().generate({ type: 'nodebuffer' });
        fs.writeFileSync(outPath, buf);

        res.status(201).json({
            message: "Contrato gerado com sucesso!",
            code: 201,
            file: `contrato-${data.imovel.nomeProp}.docx`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor', erro: error, code: 500 });
    }
}

export const download = (req, res) => {
    const fileName = req.params.file;

    const filePath = path.resolve(__dirname, '..', 'templates', 'generated', fileName);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send('Arquivo não encontrado');
    }

    res.download(filePath, fileName, (err) => {
        if (err) {
            console.error("Erro ao enviar o arquivo:", err);
        }

        fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
                console.error("Erro ao apagar o arquivo:", unlinkErr);
            }
        });
    });
}