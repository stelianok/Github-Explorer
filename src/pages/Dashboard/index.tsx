import React, {FormEvent, useState} from 'react';
import { FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

import  {Title, Form, Repositories} from './styles';

interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    };
}
const Dashboard: React.FC = () => {
    
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [newRepo, setNewRepo] =  useState('');

    async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        
        const response = await api.get<Repository>(`repos/${newRepo}`);

        const repository = response.data;
        setRepositories([...repositories, repository]);
        setNewRepo('');
    }
    return ( 
        <>
        <img src={logoImg} alt="logo"/>
        <Title>Explore repositórios no github.</Title>

        <Form onSubmit={handleAddRepository}>
            <input
                value={newRepo} 
                onChange={(e) => setNewRepo(e.target.value)}
                placeholder="Digite o nome do repositório" 
                />
            <button type="submit">Pesquisar</button>
        </Form>

        <Repositories>
            {repositories.map(repository => (
                 <a key={repository.full_name} href="teste">
                 <img 
                  src={repository.owner.avatar_url}    
                  alt={repository.owner.login}/>
  
                  <div>
                      <strong>{repository.owner.login}</strong>
                      <p>{repository.description}</p>
                  </div>
  
                  <FiChevronRight size={20}/>
              </a>
            ))}
        </Repositories>
        </>
    );
}
export default Dashboard;
