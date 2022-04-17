const express = require("express");
const app = express();
const { uuid, isUuid } = require("uuidv4");
const cors = require('cors');

//permite que qqk url/front tenha acesso a esse back
//posso restringir
app.use(cors());
app.use(express.json());

//MÉTODOS HTTP
//GET: busca informações
//POST: Cria um negócio novo
//PATCH: ATUALIZA COISAS ESPECÍFICAS
//PUT: Atualiza algo que foi criado
//DELETE: deleta, óbvio!

//RES = O que o ser vidor vai passar pro cliente
//REQ = solitação do cliente

//param
//query params = filtros e paginação
//req.body = conteúdo [criar / editar]
//req.params = identificar (atualizar/deletar)

//Middleware
/* Interceptador de req 
Pode interromper ou alterar dados da req.
Disparado de forma automática
*/

const projects = [];

//vaildação com middleware
function validateProjectId(req,res,next){
  const {id} = req.params;

  if(!isUuid(id)){
    return res.status(400).json({error:"Invalid id."})
  }
  return next();
}

//interceptador de requisções
function logRequests(req,res,next){
  const {method, url} = req;

  const logLabel = `[${method.toUpperCase()}] ${url}`

  //console.log("1");
  console.time(logLabel);

  next(); //prox. middleware

  //console.log("2");
  console.timeEnd(logLabel);

  // posso passar passos
}

app.use(logRequests);
//3 forma de usar middleware apenas nas rotas que tem esse formato
//isuuid = se id é válido ou não
app.use('/project/:id',validateProjectId);

app.get("/projects", (req, res) => {

  const {title} = req.query;

  const results = title
    ? projects.filter(project => project.title.includes(title)):projects;

  return res.json(results);
});

app.post("/projects", (req, res) => {
  const { title, owner } = req.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);

  return res.json(project);
});

app.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title, owner } = req.body;

  const projectIndex = projects.findIndex((project) => project.id == id);

  if (projectIndex < 0) {
    res.sendStatus(404);
  }

  //atualizar projeto
  const project = {
    id,
    title,
    owner,
  }
//val. arm. na pos
  projects[projectIndex] = project;

  return res.json(project);
});

app.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex((project) => project.id == id);

  if (projectIndex < 0) {
    res.sendStatus(400);
  }

  projects.splice(projectIndex, 1) //remover 1 pos

  return res.sendStatus(404);
});

app.listen(3000, () => {
  console.log("Entrou!");
});
