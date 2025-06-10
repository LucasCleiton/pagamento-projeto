// server.js (VERSÃO FINAL COM NGROK)

import express from 'express';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import path from 'path';

// Cole seu Access Token aqui
const accessToken = "Cole seu Access Token aqui";

const app = express();
const port = 3000;


// COLE A URL HTTPS DO NGROK 
const host = "COLE A URL HTTPS DO NGROK ";



// Configura o cliente do Mercado Pago com seu Access Token
const client = new MercadoPagoConfig({ accessToken: accessToken });

// Habilita o servidor para servir arquivos estáticos da pasta 'public'
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Rota principal que serve a página de produtos
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Rota para criar a preferência de pagamento
app.post("/create_preference", async (req, res) => {
    try {
        const { title, unit_price, quantity } = req.body;

        const body = {
            items: [
                {
                    title: title,
                    quantity: Number(quantity),
                    unit_price: Number(unit_price),
                    currency_id: "BRL",
                },
            ],
            back_urls: {
                success: `${host}/sucesso.html`,
                failure: `${host}/falha.html`,
                //pending: `${host}/sucesso.html`, 
            },
            auto_return: "approved",
        };

        const preference = new Preference(client);
        const result = await preference.create({ body });

        res.json({ id: result.id });

    } catch (error) {
        console.log("ERRO AO CRIAR PREFERÊNCIA:", error.cause || error.message);
        res.status(500).json({ error: "Erro ao criar a preferência" });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log(`URL Pública (ngrok) para teste: ${host}`);
});