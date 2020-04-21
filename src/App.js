import React, {useState, useEffect} from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])
  useEffect(() => {
    api.get('repositories').then(response => {
      console.log(response)
      setRepositories(response.data)
    })

  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Ctools',
      url: 'https://github.com/gusflopes/ctools',
      techs: ['Node.js', 'ReactJS', 'Gatsby'],
    })
    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)
    if (response.status === 204) {
      setRepositories(repositories.filter(
        repository => repository.id !== id
      ))
    }
    // toast error
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.title}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
