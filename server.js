// server.js

import express from 'express';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import path from 'path';

// Cole seu Access Token aqui
const accessToken = "//Cole seu Acess Token Aqui";

const app = express();
const port = 3000;

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
                success: "http://localhost:3000/sucesso.html", // Página de sucesso
                failure: "http://localhost:3000/falha.html",   // Página de falha

            },
            auto_return: "approved",
        };

        const preference = new Preference(client);
        const result = await preference.create({ body });

        // Retorna o ID da preferência para o frontend
        res.json({ id: result.id });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erro ao criar a preferência" });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});