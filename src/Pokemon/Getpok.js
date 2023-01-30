import pokemon from 'pokemontcgsdk';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Card, Button } from "react-bootstrap";

pokemon.configure({ apiKey: 'c8452179-1a23-4351-8c61-a70d0e27fa10' });

function Getpok() {
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    
    
    function Pokemon({ name, artist, image, id }) {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>artist : {artist}</Card.Text>
                    <Card.Text>Id : {id}</Card.Text>
                </Card.Body>
            </Card>
        );
    }
    
    async function GetPokemon() {
        try {
            const data = (await axios.get("https://api.pokemontcg.io/v2/cards/")).data;
            setResults(data)
        } catch (err) {
            console.error("error CharacterGroup/getCharacters", err)
        }
    }
    useEffect(() => {
        (async () => {
            await GetPokemon();
        })();
    }, []);
    return (
        <>
                <Container className="d-flex justify-content-center">
                <input type="text" placeholder="Rechercher un personnage" className="form-control mb-3" onChange={event => {setSearchTerm(event.target.value)}}/>
                <p className="text-center">Résultats : {results.data && results.data.filter((val) => {
                    if (searchTerm == "") {
                        return val
                    } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val
                    }
                }).length}</p>

            <ul className="cards">

                    {results.data && results.data.filter((val) => {
                        if (searchTerm == "") {
                            return val
                        } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return val
                        }
                    }).map((result) => {
                        return (
                            <li>
                            <Pokemon
                                key={result.id}
                                name={result.name}
                                artist={result.artist}
                                id={result.id}
                                image={result.images.small}
                            />
                            </li>
                        );
                    })}
                </ul>
                </Container>
        </>
    );
}

export default Getpok;