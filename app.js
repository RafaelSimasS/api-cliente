const express = require("express");
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

const apiUrl = "http://localhost:8080/api/clientes";

app.get('/', async (req, res) => {
    try {
        const response = await axios.get(apiUrl);
        const clientes = response.data;

        res.render('index', { clientes });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar clientes');
    }
});

app.get("/novo", (req, res) => {
    res.render('cadastro');
});

app.post('/novo', async (req, res) => {
    const { nome, nascimento, cpf, endereco, telefone, email } = req.body;
    try {
        await axios.post(apiUrl, {
            nome, nascimento, cpf, endereco, telefone, email
        });
        res.status(201).redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao cadastrar cliente');
    }
});

app.get('/editar/:id', async (req, res) => {

    const { id } = req.params;
    try {
        const response = await axios.get(`${apiUrl}/${id}`);
        const cliente = response.data;
        res.render('editar', { cliente });

    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar cliente');
    }
});

app.post('/editar/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, nascimento, cpf, endereco, telefone, email } = req.body;
    try {
        await axios.put(`${apiUrl}/${id}`, {
            nome, nascimento, cpf, endereco, telefone, email
        });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao atualizar cliente');
    }
});

app.post('/excluir/:id', async (req, res) => {

    const { id } = req.params;
    try {
        await axios.delete(`${apiUrl}/${id}`);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao excluir cliente');
    }
});


app.listen(3000, () => {
    console.log(`Servidor rodando na url http://localhost:3000`);
});