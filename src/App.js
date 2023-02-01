import './App.css';
import { Menub } from './Menu/Navbar';
import pokemon from 'pokemontcgsdk';

// get all pokemon from set pl1
pokemon.card.all({q:' set.id:pl1' })
  .then(cards => {
    console.log(cards);
  })

function App() {
  return (
    <div className="App">

      <Menub />

    </div>
  );
}

export default App;