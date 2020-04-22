<div  align="center">

<img  src="https://i.imgur.com/pI0g7mg.png"><br>

<img  src="https://i.imgur.com/AxI9yNz.png"><br>

</div>

<div  align="center"">

<a  href="https://discord.gg/DDmhAst"  target="_blank"><img  src="https://img.shields.io/discord/366404358440615951?label=Servidor&logo=discord"  alt="Discord server"/></a>

<a  href="https://discord.js.org/#/"  target="_blank"><img  src="https://img.shields.io/badge/Biblioteca-discord.js-%23738adb"  alt="Biblioteca"/></a>

</div>

  
  

## Um projeto totalmente livre

Nós da Liga dos Programadores sempre nos preocupamos em ajudar entusiastas em programação ou pessoas que se interessam pelo assunto, assim então decidimos criar projetos de codigo 100% livre para ajudar estudantes ou novatos da área a se familiarizarem com códigos úteis e interessantes!

Fizemos este projeto, visando quem quer se aprofundar mais em bots para o Discord e JavaScript. Combinamos as melhores práticas do JavaScript para criar um bot estruturado simples e funcional que possui funções como Command Handlers, Event Handlers e um comando help bonito e automático!

  

## Instalação

Após ter clonado o repositório e extraído todos arquivos tenha certeza que possui o **npm** e o **node.js 8.0.0** ou mais recente. Para verificar use os comandos a seguir:
```bash
npm -v 
-> 6.14.4

node -v
-> v13.13.0
```
Caso apareça algo como a imagem à cima podendo ter a troca dos números de acordo com sua versão, está tudo certo. Caso de algum erro, você deverá seguir o passo à passo de instalação encontrado neste link: [node.js 8.0.0](https://nodejs.org/en/). Se estiver com tudo pronto então execute o seguinte comando no diretório do arquivo.

```bash
$ npm install
```
![enter image description here](https://cdn.discordapp.com/attachments/680776029333094438/702588199918108772/unknown.png)

Se tudo estiver certo, crie um arquivo com o nome de **.env** seguindo o exemplo do **.env.example** com o seguinte comando, **não esqueça que você deve estar no diretório do arquivo**:

Para Windows: `$ copy .env.example .env`
Para Linux: `$ cp .env.example .env`

Se estiver usando **Visual Studio Code** você verá a organização de arquivos da seguinte forma:

![enter image description here](https://cdn.discordapp.com/attachments/680776029333094438/702591465171320902/unknown.png)

**OBS**: Atente-se para o nome do arquivo grifado em vermelho, agora é **.env** e não mais **.env.example**.

Você deverá abrir o arquivo **.env** e editá-lo de acordo com a tabela à seguir, atentando-se a obrigatoriedade da opção.
|     Opção    |             Descrição            | Obrigatório? |
|:------------:|:--------------------------------:|:------------:|
|  AUTH_TOKEN  | Token de autenticação do seu bot |      sim     |
|    PREFIX    |       Prefixo dos comandos       |      sim     |
|     GAME     | O que vai aparecer no Jogando... |      não     |
| APRESENTACAO |    ID do canal de apresentação   |      não     |
| GREETCHANNEL |     ID do canal de bem vindo     |      não     |
|   SUGESTOES  |     ID do canal de sugestões     |      não     |
|   DESAFIOS   |      ID do canal de desafios     |      não     |

Com tudo editado seu arquivo deverá ficar da seguinte forma:
![enter image description here](https://cdn.discordapp.com/attachments/680776029333094438/702592691049070652/unknown.png)
  
Então agora você poderá iniciar seu bot utilizando:
```$ npm start```
 
Caso a saída seja a seguinte, seu bot estará online =)

![enter image description here](https://cdn.discordapp.com/attachments/680776029333094438/702593568082231408/unknown.png)
  

## Links

* [Servidor da Liga dos Programadores](https://discord.gg/YAqEyPu)

  

## Doações

Para fazer doações entre em contato em nosso servidor do Discord.

  

## Contribuições

Aceitaremos Pull Requests desde que tenham algum sentido e não sejam gambiarra. Se quiser começar a participar de projetos open-source como este entre em contato em nosso servidor do Discord.

  
## Ajuda

Caso tenha alguma dificuldade em entender este código ou por onde começar nos contate em nosso servidor do Discord.