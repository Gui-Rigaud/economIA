# economIA
**Planejador Financeiro Automático com Inteligência Artificial**

O **economIA** é um inovador planejador financeiro que utiliza Inteligência Artificial para facilitar o gerenciamento de suas finanças pessoais. Com apenas alguns passos, você pode importar suas planilhas no formato CSV e permitir que nossa IA categorize automaticamente seus gastos, ajudando você a visualizar e controlar melhor suas finanças.

---

## Recursos Principais
- **Cadastro e autenticação de usuários.**  
- **Importação e leitura automática de planilhas CSV.**  
- **Inteligência Artificial para categorização automática de despesas e receitas.**  
- **Dashboard intuitivo para acompanhamento financeiro.**  

---

## Pré-requisitos
Certifique-se de ter instalado em sua máquina:  
- Node.js e npm ou Yarn.  
- Google Cloud CLI.  
- Banco de dados compatível com o backend do projeto (ex.: PostgreSQL).  

---

## Como Instalar e Executar Localmente

### 1. Clonar o repositório
Navegue até a pasta onde deseja salvar o projeto e execute:  
```bash
git clone https://github.com/Gui-Rigaud/economIA
```

### 2. Instalar as dependências
Entre nos diretórios do projeto e instale as dependências:  
**Frontend:**  
```bash
cd frontend
npm install
```  
**Backend:**  
```bash
cd ../backend
npm install
```  

### 3. Instalar e configurar o Google Cloud CLI
- Siga as instruções para instalar o Google Cloud CLI: [Instalação do Google Cloud CLI](https://cloud.google.com/sdk/docs/install?hl=pt-br).  
- Após instalar, autentique-se usando sua conta do **CIn**:
  ```bash
  gcloud auth login
  ```

### 4. Configurar variáveis de ambiente
Crie um arquivo `.env` no diretório do **backend** e adicione as seguintes variáveis:  
```plaintext
DATABASE_URL=URL_do_seu_banco_de_dados
API_KEY=sua_chave_da_API
JWT_SECRET=uma_chave_secreta_para_o_JWT
```

### 5. Iniciar o servidor backend
Navegue para a pasta do backend e inicie o servidor:  
```bash
yarn dev
```

### 6. Iniciar o frontend
Em outra janela do terminal, vá para a pasta do frontend e execute:  
```bash
yarn dev
```

### 7. Acessar o economIA
Abra seu navegador e acesse o frontend do economIA no endereço [http://localhost:3000](http://localhost:3000).

---

## Imagens do funcionamento do economIA:

### Tela Inicial:

![Tela inicial](images/Tela_login_MVP.jpeg)

### Tela de Cadastro:

![Tela cadastro](images/Tela_cadastro_MVP.jpeg)

### Tela de Login:

![Tela login](images/Tela_login_com_senha_MVP.jpeg)

### Tela de update de CSV:

![Tela update de CSV](images/Tela_carregamento_do_CSV_MVP.jpeg)

### Tela de categorização feita pela IA:

![Tela categorização](images/Tela_categorizacao_MVP.jpeg)

---

## Licença
Este projeto está licenciado sob a [MIT License](LICENSE).  

---

## Equipe
- Guilherme Rigaud
- Hugo Nicéas
- João Guilherme Ohashi
- Luiz Eduardo de Andrade
- Marcos Didier  


---

## Agradecimentos
Agradecemos a todos os contribuidores e apoiadores que tornam o **economIA** possível! 🚀