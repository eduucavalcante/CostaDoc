import * as tokenUtils from '../utils/tokenUtils.js';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const authenticateUser = async (req, res) => {
    try {
        const userInfo = req.body;

        const user = await User.findOne({
            where: {
                email: userInfo.email
            }
        });

        if (!user) {
            return res.status(404).json({ "message": "Usuário não encontrado", "code": 404 });
        }

        const match = await bcrypt.compare(userInfo.password, user.password);

        if (!match) {
            return res.status(401).json({ "message": "Senha incorreta", "code": 401 });
        }

        const token = tokenUtils.generateAuthToken(user.id, user.username, user.email);

        return res.status(200).json({ "message": "Usuário autenticado com sucesso!", "code": 200, "token": token });
    } catch (error) {
        switch (error.name) {
            case 'SequelizeConnectionError':
                return res.status(503).json({ "message": 'Serviço de banco de dados indisponível', "code": 503 });

            case 'SequelizeDatabaseError':
                return res.status(500).json({ "message": 'Erro na consulta ao banco de dados', "code": 500 });

            case 'SequelizeValidationError':
                return res.status(400).json({ "message": 'Dados inválidos enviados', "erros": error.errors, "code": 400 });

            default:
                console.log('Erro interno no servidor: ', error)
                return res.status(500).json({ "message": 'Erro interno no servidor' });
        }
    }
}

export const createAccount = async (req, res) => {
    const { username, email, password } = req.body;
    const saltRounds = await bcrypt.genSalt(10);

    const senha = await bcrypt.hash(password, saltRounds);
    try {
        await User.create({
            username: username,
            email: email,
            password: senha
        });

        res.status(201).json({ message: "Usuário criado" });
    } catch(error) {
        console.log("Erro: ", error);
        res.status(500).json({ erro: error });
    }
}