# 💳 Sistema de Pagamentos com Mercado Pago

## ✨ Visão Geral do Projeto

Este projeto é uma aplicação web simples desenvolvida para demonstrar a integração de um sistema de pagamentos utilizando o **Checkout Bricks do Mercado Pago**. A aplicação permite que o usuário visualize diferentes planos de assinatura, escolha uma opção e seja redirecionado para o checkout do Mercado Pago para realizar o pagamento.

O foco principal é a comunicação entre o frontend e um backend Node.js para a criação dinâmica de **preferências de pagamento**, e o tratamento do status da transação com o redirecionamento do usuário para páginas de sucesso ou falha.

---

## 🚀 Arquitetura da Aplicação

A arquitetura é composta por um frontend estático, um backend simples que serve como intermediário para a API do Mercado Pago e a ferramenta `ngrok` para viabilizar os testes em um ambiente de desenvolvimento local.

**Fluxo de Dados:**
`Usuário no Navegador` → `Seleciona um Plano` → `Frontend pede ao Backend` → `Backend cria Preferência na API do MP` → `Backend retorna ID da Preferência` → `Frontend renderiza o botão de Pagar` → `Usuário paga no MP` → `MP redireciona para página de status`.


### Componentes:

* **Frontend (HTML, CSS, JS)**: Página estática que exibe os planos disponíveis. Utiliza o SDK Frontend do Mercado Pago (Bricks) para renderizar o botão de pagamento de forma segura.
* **Backend (Node.js + Express)**: Servidor responsável por receber as requisições do frontend, utilizar o **Access Token** para se comunicar com a API do Mercado Pago e criar as preferências de pagamento.
* **ngrok**: Ferramenta essencial para o desenvolvimento, pois cria um túnel público para o servidor local, permitindo que o Mercado Pago se comunique com a aplicação para os redirecionamentos de `back_urls`.

---

## 🛠️ Tecnologias Utilizadas

Para consultar as versões exatas, verifique o arquivo `package.json`. As versões abaixo são recomendadas.

| Tecnologia | Versão Sugerida | Descrição |
| :--- | :--- | :--- |
| **Node.js** | v18.18.0+ | Ambiente de execução JavaScript para o backend. |
| **Express** | ~4.19.2 | Framework para a criação do servidor HTTP no Node.js. |
| **MercadoPago SDK** | ~2.0.9 | Biblioteca oficial para facilitar a integração com a API. |
| **ngrok** | v3+ | Ferramenta para criar um túnel seguro para o localhost. |
| **HTML5 / CSS3 / JS** | Padrões Web | Estrutura, estilo e interatividade do frontend. |

---

## ⚙️ Como Executar o Projeto

### ✅ Pré-requisitos

* **Node.js e npm**: Tenha o [Node.js](https://nodejs.org/) (versão 18 ou superior) instalado.
* **Contas de Teste do Mercado Pago**: Você precisará de duas contas, uma de **Vendedor** e uma de **Comprador**, conforme a [documentação de teste](https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/additional-content/your-first-integration#bookmark_el_proceso_de_prueba).
* **Credenciais**: Do seu painel de desenvolvedor na conta de **Vendedor**, pegue sua **Public Key** e seu **Access Token**.
* **ngrok**: Faça o download do [ngrok](https://ngrok.com/download) e autentique sua conta, se desejar.

### 📋 Passos para Execução

**1. Clonar o Repositório:**
```bash
git clone [https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git](https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git)
cd NOME_DO_REPOSITORIO
```

**2. Instalar as Dependências:**
```bash
npm install
```

**3. Configurar as Credenciais:**
* No arquivo `server.js`, insira seu **Access Token** do Mercado Pago na variável `accessToken`.
* No arquivo `public/index.html`, insira sua **Public Key** na inicialização do SDK do Mercado Pago.

**4. Iniciar o Túnel com ngrok (Terminal 1):**
Abra um terminal e inicie o ngrok para expor a porta 3000 da sua máquina.
```bash
# O arquivo ngrok.exe deve estar na pasta ou no PATH do sistema
./ngrok http 3000
```
Copie a URL **HTTPS** fornecida pelo ngrok (ex: `https://abcd-1234.ngrok-free.app`).

**5. Atualizar a URL no Servidor:**
* No arquivo `server.js`, cole a URL HTTPS do ngrok na variável `host`.
    ```javascript
    const host = "[https://abcd-1234.ngrok-free.app](https://abcd-1234.ngrok-free.app)"; // <-- SUBSTITUA AQUI
    ```

**6. Iniciar o Servidor (Terminal 2):**
Abra um **segundo terminal**, e sem fechar o terminal do ngrok, inicie o servidor do projeto.
```bash
node server.js
```

**7. Testar a Aplicação:**
* Abra a **URL do ngrok** no seu navegador.
* Escolha um dos planos e clique para pagar. Você será redirecionado para o checkout do Mercado Pago.
* **IMPORTANTE:** Faça login com sua conta de teste de **Comprador** e utilize um dos [cartões de teste](https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/additional-content/test-cards) para finalizar a compra.

---

## 👨‍💻 Desenvolvedor

[Lucas Ferreira](https://github.com/LucasCleiton)
