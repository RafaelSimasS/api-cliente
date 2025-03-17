const express = require("express");
const axios = require('axios');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static('public'));


function isAuthenticated(req, res, next) {
    const token = req.cookies.authToken;
    if (!token) {
        return res.redirect("/autenticacao?error=Você precisa estar autenticado.");
    }
    next();
}

app.get("/autenticacao", (req, res) => {
    const error = req.query.error || "";
    res.render("autenticacao", { error });
});


app.post("/autenticacao", async (req, res) => {
    const { username, senha } = req.body;
    if (!username || !senha) {
        return res.redirect("/autenticacao?error=Usuário e senha são obrigatórios.");
    }
    try {
        const response = await axios.post("http://localhost:8080/api/admin/autenticacao", { username, senha });
        console.log(response.data);

        const { authToken } = response.data;

        res.cookie("authToken", authToken, { httpOnly: true });
        res.redirect("/");
    } catch (error) {
        console.error("Erro no login:", error.response ? error.response.data : error.message);
        res.redirect(`/autenticacao?error=${error.response.data}`);
    }
});


app.get("/logout", (req, res) => {
    res.clearCookie("authToken");
    res.redirect("/autenticacao");
});


const apiUrl = "http://localhost:8080/api/clientes";

app.get('/', isAuthenticated, async (req, res) => {
    const token = req.cookies.authToken;
    const page = req.query.page || 0;


    try {
        const response = await axios.get(`${apiUrl}?page=${page}`, { headers: { Authorization: `Bearer ${token}` } });

        const clientes = response.data.content;
        const currentPage = response.data.number;
        const totalPages = response.data.totalPages;
        res.render('index', { clientes, currentPage, totalPages, pesquisa: '' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar clientes');
    }
});

app.get('/pesquisar', isAuthenticated, async (req, res) => {
    const token = req.cookies.authToken;
    const nome = req.query.q || '';
    const page = req.query.page || 0;
    try {
        let response;
        if (nome.trim() !== '') {
            response = await axios.get(`${apiUrl}/search?nome=${encodeURIComponent(nome)}&page=${page}`, { headers: { Authorization: `Bearer ${token}` } });
        } else {
            response = await axios.get(`${apiUrl}?page=${page}`, { headers: { Authorization: `Bearer ${token}` } });
        }
        const clientes = response.data.content;
        const currentPage = response.data.number;
        const totalPages = response.data.totalPages;
        res.render('index', { clientes, currentPage, totalPages, pesquisa: nome });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar clientes');
    }
});

app.get("/novo", isAuthenticated, (req, res) => {
    res.render('cadastro');
});

app.post('/novo', isAuthenticated, async (req, res) => {
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

app.get('/editar/:id', isAuthenticated, async (req, res) => {

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

app.post('/editar/:id', isAuthenticated, async (req, res) => {
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

app.post('/excluir/:id', isAuthenticated, async (req, res) => {

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