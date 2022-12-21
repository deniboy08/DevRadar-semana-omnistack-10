import React from 'react';
import { MdDelete, MdOutlineEditNote } from 'react-icons/md';

import './styles.css'

function DevItem({ dev, onSubmit, option, getDev, setAlert }) {


  function handleChangeForm() {
    option(true)

    getDev({
      github_username: dev.github_username,
      name: dev.name,
      techs: dev.techs,
      bio: dev.bio
    });

    window.scrollTo(0, 0);
  }

  async function handleSubmit() {

    if (confirm(`Tem certeza que deseja excluir o usuário ${dev.name}?`))
      await onSubmit({
        params: {
          github_username: dev.github_username
        }
      });

  }

  return (
    <li className="dev-item">
      <div className="group-buttons">
        <div className="dev-buttons">
          <MdOutlineEditNote onClick={() => { handleChangeForm() }} size={25} />
        </div>
        <div className="dev-buttons">
          <MdDelete onClick={() => { handleSubmit() }} size={25} color="#FF5B5B" />
        </div>
      </div>
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs && dev.techs.join(', ')}</span>
        </div>
      </header>
      <p>{dev.bio} </p>
      <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
    </li>
  )
}

export default DevItem;