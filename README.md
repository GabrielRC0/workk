Como Rodar o Projeto
1. Clone o repositório
No terminal, execute:
git clone <URL_DO_REPOSITORIO>
cd workk

2. Configure as variáveis de ambiente (opcional)
As variáveis de ambiente padrão já estão definidas no docker-compose.yml:

4. Build das imagens. No terminal, execute:
docker-compose build

5. Inicie os serviços. Execute:
docker-compose up -d
Isso iniciará os contêineres em segundo plano.

6. Acesse a aplicação
Abra o navegador e acesse:
http://localhost

6. Visualize os dados interativamente
Na página inicial você verá uma tabela de projetos. Ao passar o mouse sobre uma linha da tabela, um painel de preview exibirá as cores do header, body e footer definidas para aquela tela do projeto.

Notas Adicionais
Retentativa de Conexão no Backend:
O backend possui uma lógica para tentar se conectar ao MySQL repetidamente, evitando que o serviço quebre caso o banco ainda não esteja pronto.

O Nginx atua como proxy reverso:
Requisições que começam com /api/ são encaminhadas para o backend (Node.js) na porta 3001.
As demais requisições são enviadas para o frontend (Next.js) na porta 3000.
