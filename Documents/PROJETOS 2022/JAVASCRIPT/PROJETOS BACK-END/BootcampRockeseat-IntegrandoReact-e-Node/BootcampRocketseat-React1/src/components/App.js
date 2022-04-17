//useState = cria estado
import React, {useState} from "react";
import Header from "./Header";
import './App.css';
import api from '../services/api';
import BackgroundImg from './assets/eri.jpg'
// import { Container } from './styles';

function App() {
  const [projects, setProjects] = useState([]); //sempre começar estado com informação do mesmo tipo

  useEffect(() => {
    api.get('projects').then(res=>{
      setProjects(res.data);
    });
  },[]);//array de dependencias - var's que eu uso na 1 função
  
  //Use state retorna
  //1; var com valor inicial
  //2. função pra atualizar valor

  //criando dados api
  async function handleAddProject(){
     //(re)criando array
  //setProjects([...projects,`Novo projeto ${Date.now()}`]);
    const res = await api.post('projects',{
      title: `Front e back ${Date.now()}`,
      owner: "Erica"
    });

    const project = res.data();

    setProjects([...projects, project])
  }

  return (
    <>
      <Header title="Projects">
        <img width={400} src={BackgroundImg}/>
        <ul>
          {/**Para cada um dos projetos eu vou exibir o project */}
          {projects.map(project => <li key={project.id}>{project.title}</li>)}
          <button type="button" onClick={handleAddProject}>Adicionar</button>
        </ul>
      </Header>
    </>
  );
}

export default App;
