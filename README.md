<h1 align="center">Desafio Backend - GCB</h1>
<p align="center">Desafio proposto para vaga de backend da empresa GCB Investimentos.</p>
</br></br>

### Documentação em formato Swagger:
http://localhost:3333/swagger/


### Pré-Requisitos

Antes de começar você deve ter instalado em sua máquina o [Docker-compose](https://docs.docker.com/compose/install/) para buidar as imagens necessárias para rodar a aplicação.
</br>

### 🎲 Como começar?

```bash
# Clone o repositório e acesse a pasta pelo terminal
$ git clone https://github.com/igoraraujocruz/gcbDoctor.git
$ cd gcbDoctor

# Crie um arquivo .env na raiz do projeto, copie todo o conteúdo do arquivo .env.exemple e cole no .env para "setarmos" as variáveis de ambiente, ou insira as variáveis que preferir.

# Com o Docker-compose instalado, execute o seguinte comando para buildas as imagens.
$ make start #caso esteja no linux: sudo make start

# Aguarde todo o processo finalizar. Logo depois, o server automaticamente irá inicializar e já será possível acessar a documentação swagger.
http://localhost:3333/swagger/

# Para as requisições POST será necessário conhecer o ID que foi automaticamente gerado da tabela de especialidades. Para isso clique na aba /specialties, try it out e execute. Após executar descobriremos os ID's. Vou deixar um gif abaixo, caso seja necessário.

# Agora é só testar a aplicação, caso tenha alguma dúvida, fique a vontade para perguntar, meus contatos estão logo a baixo.

```
![](tutorial/tuto.gif)

</br>

## Author
---

<a href="https://github.com/igoraraujocruz/">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/67648421?s=460&u=649a2c0657c58ce0525ae98eecb9f2ef87b28da1&v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Igor Araujo Cruz</b></sub></a> <a href="https://www.linkedin.com/in/igor-araujo-cruz-84a89111b/" title="Linkedin"></a>


Done with a lot of dedication and passion by Igor Araujo Cruz 👋🏽
</br></br>
Contact

[<img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" />](https://www.linkedin.com/in/igor-araujo-cruz-84a89111b/)
[<img src = "https://img.shields.io/badge/instagram-%23E4405F.svg?&style=for-the-badge&logo=instagram&logoColor=white">](https://www.instagram.com/igoraraujocruzz/)
[![Gmail Badge](https://img.shields.io/badge/-Gmail-c14438?style=for-the-badge&logo=Gmail&logoColor=white&link=mailto:seu_email)](mailto:igoraraujocruzz@gmail.com)
