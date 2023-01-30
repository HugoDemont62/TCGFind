import './App.css';
import pokemon from 'pokemontcgsdk';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Card, Button } from "react-bootstrap";

pokemon.configure({apiKey: 'c8452179-1a23-4351-8c61-a70d0e27fa10'});

function Getpok() {
  const [results, setResults] = useState([]);
 
  async function GetPokemon() {
    try {
      const data = (await axios.get("https://api.pokemontcg.io/v2/cards/")).data;
      setResults(data)
  } catch(err) {
      console.error("error CharacterGroup/getCharacters",err)
  }
}
useEffect(() => {
(async() => {
  await GetPokemon();
})();
},[]);


function Pokemon({name, artist, image, id}) {
  return (
      <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={image} />
          <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>artist : {artist}</Card.Text>
              {/* <Card.Text>Id : {id}</Card.Text> */}
          </Card.Body>
      </Card>
  );
}

  return (
    <>
    <div className="App">
      <h1>Get Pokemon</h1>

      {results.data && results.data.map((result) => {
        return (
          <Pokemon
            key={result.id}
            name={result.name}
            artist={result.artist}
            image={result.images.small}
          />
        );
      })}
    </div>
    </>
  );
}

function App() {
  return (
    <div className="App">

      <Getpok />

    </div>
  );
}

export default App;
