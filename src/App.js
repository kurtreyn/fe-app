import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import '../src/styles/style.css';

function App() {
  const [occupations, setOccupations] = useState(null);
  const [states, setStates] = useState(null);

  useEffect(() => {
    async function fetchForm() {
      fetch(`https://frontend-take-home.fetchrewards.com/form`, {
        method: 'GET',
      })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          if (data) {
            const occupationList = data.occupations;

            const statesList = data.states;
            const stateNames = statesList.map((stateName) => {
              return stateName.name;
            });
            setOccupations(occupationList);
            setStates(stateNames);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
    fetchForm();
  }, []);

  return (
    <div className="App">
      <Home occupations={occupations} states={states} />
    </div>
  );
}

export default App;
