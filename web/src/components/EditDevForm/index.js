import React, { useState, useEffect } from 'react';
import { MdOutlineCancelPresentation } from 'react-icons/md';


function EditDevForm({ dev, onSubmit, option, setAlert }) {
  const [github_username, setGithubUsername] = useState('');
  const [name, setName] = useState('');
  const [techs, setTechs] = useState('');
  const [bio, setBiografia] = useState('');

  useEffect(() => {
    setGithubUsername(dev.github_username ? dev.github_username : '');
    setName(dev.name ? dev.name : '');
    setTechs(dev.techs ? dev.techs : '');
    setBiografia(dev.bio ? dev.bio : '');
  }, [dev])

  async function handleSubmit(e) {
    e.preventDefault();

    option(false)

    await onSubmit({
      github_username,
      name,
      techs,
      bio,
    });

    setGithubUsername('');
    setName('');
    setTechs('');
    setBiografia('');

  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <strong className="header">Alterar</strong>
        <div className="input-block">
          <label htmlFor="github_username">Usuário do Github</label>
          <input
            name="github_username"
            id="github_username"
            value={github_username}
            onChange={e => setGithubUsername(e.target.value)}
            disabled={true}
          />
        </div>

        <div className="input-block">
          <label htmlFor="name">Nome</label>
          <input
            name="name"
            id="name"
            required
            autoFocus={true}
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="techs">Tecnologias</label>
          <input
            name="techs"
            id="techs"
            required
            value={techs}
            onChange={e => setTechs(e.target.value)}
          />
        </div>
        <div className="input-block">
          <label htmlFor="bio">Biografia</label>
          <input
            name="bio"
            id="bio"
            value={bio}
            onChange={e => setBiografia(e.target.value)}
          />
        </div>

        <button type="submit">Alterar</button>
        <div className="cancel-button">
          <MdOutlineCancelPresentation onClick={() => { option(false) }} size={30} color="#FF5B5B" />
        </div>
      </form>
    </>
  );
}

export default EditDevForm;