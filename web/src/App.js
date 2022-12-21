import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './components/DevForm';
import EditDevForm from './components/EditDevForm';
import DevItem from './components/DevItem';

function App() {

  const [devs, setDevs] = useState([]);
  const [showElement, setShowElement] = useState(false)
  const [nameDev, setNameDev] = useState('')
  const [resultAlert, setResultAlert] = useState(null)

  const show = () => setShowElement(true)
  const hide = () => setShowElement(false)
  const tempDev = (data) => setNameDev(data)
  const changeAlert = (data) => setResultAlert(data)

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }
    loadDevs();
    //alert(resultAlert)

  }, [devs.length], nameDev);

  function handleChangeForm(data) {
    data
      ? show()
      : hide()
  }

  function getDev(data) {
    tempDev(data)
  }

  function setAlert(data) {

    //console.log(data)
    changeAlert(data)
    console.log(resultAlert)

  }

  async function handleAddDev(data) {
    const response = await api.post('/devs', data)
    setDevs([...devs, response.data]);

    console.log('adicionou')
    changeAlert('alertSave')
    showAlert()

  }

  async function handleUpdateDev(data) {
    //console.log(data)
    await api.put('/update', data);
    setDevs([]);

    console.log('alterou')
    changeAlert('alertUpdate')
    showAlert()

  }

  async function handleRemoveDev(data) {
    await api.delete('/delete', data);
    setDevs([]);

    console.log('removeu')
    changeAlert('alertDelete')
    showAlert()

  }

  function showAlert() {

    resultAlert != ''
    ? setTimeout(function () {
        let div = document.getElementById('alert-box');
        // Exibe a DIV
        div.style.opacity = 1;
        // Oculta a div
        setTimeout(function () {
          div.style.opacity = 0;
        }, 3000); // O valor é representado em milisegundos.
      }, 500) // O valor é representado em milisegundos.
    : 
    changeAlert(null)
    }

return (
  <div id="app">
    <aside>
      {!showElement
        ? <DevForm
          onSubmit={handleAddDev}
          setAlert={setAlert}
          resultAlert={resultAlert}
        />
        : <EditDevForm
          onSubmit={handleUpdateDev}
          option={handleChangeForm}
          dev={nameDev}
          resultAlert={resultAlert}
          setAlert={setAlert}
        />
      }
    </aside>
    <main>
      {
        resultAlert == 'alertSave'
          ? <div id='alert-box' className="alert-box save">Dev cadastrado com sucesso!!!</div>
          : resultAlert == 'alertUpdate'
            ? <div id='alert-box' className="alert-box update">Dev atualizado com sucesso!!!</div>
            : resultAlert == 'alertDelete'
              ? <div id='alert-box' className="alert-box delete">Dev deletado com sucesso!!!</div>
              : <div id='' className="alert-box"></div>
      }
      <ul>
        {devs.map(dev => (
          <DevItem
            key={dev._id}
            dev={dev}
            setAlert={getDev}
            option={handleChangeForm}
            getDev={getDev}
            resultAlert={resultAlert}
            onSubmit={handleRemoveDev}
          />
        ))}
      </ul>
    </main>
  </div>
);
}

export default App;
