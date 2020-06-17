const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.status(200).json(repositories);
});

app.get("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const indexRepository = repositories.findIndex(repository =>  repository.id === id);
  if(indexRepository < 0){
    return response.status(400).json({error: 'Repository not found'});
  }
  return response.status(200).json(repositories[indexRepository]);
});

// app.post("/repositories", (request, response) => {
//   const { title, url, techs } = request.body;
//   const likes = 0;

//   const repositorio = { id: uuid(), title, url, techs, likes };

//   repositories.push(repositorio);
//   return response.status(200).json(repositorio);
// });

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };
  repositories.push(repository);
  return response.status(200).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const indexRepository = repositories.findIndex(repository => repository.id === id );
  if(indexRepository < 0){
    return response.status(400).json({error: 'Repository not found'});
  } 
  const repository = repositories[indexRepository];
  const updatedRepository = {
    ...repository,
    title, url, techs
  }
  repositories[indexRepository] = updatedRepository;
  return response.json(updatedRepository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const indexRepository = repositories.findIndex(repository => repository.id === id );
  if(indexRepository < 0){
    return response.status(400).json({error: 'Repository not found'});
  }
  repositories.splice(indexRepository, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const indexRepository = repositories.findIndex(repository => repository.id === id );
  if(indexRepository < 0){
    return response.status(400).json({error: 'Repository not found'});
  }
  const repository = repositories[indexRepository];
  const { likes } = repository;
  const updatedRepository = {
    ...repository,
    likes: likes + 1,
  }
  repositories[indexRepository] = updatedRepository;
  return response.json(updatedRepository);
});

module.exports = app;