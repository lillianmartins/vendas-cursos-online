import express from "express";

const app = express();
const host = "localhost"
const port = 3000;

app.listen(port, host, () => {
    console.log(`Servidor rodando em http://${host}:${port}`);
});

app.use(express.static("./views/public"));
app.use(express.static("./views/private"));
