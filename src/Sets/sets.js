import pokemon from 'pokemontcgsdk';
import { useEffect, useState } from 'react';
import { Container, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

pokemon.configure({ apiKey: 'c8452179-1a23-4351-8c61-a70d0e27fa10' });


export default function Sets() {
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    
    
    function Pokemon({ name, artist, image, id }) {
        return (
            <Card style={{ width: '18rem' }} className="cardmain">
                <a href={"/Sets/"+id}><Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>artist : {artist}</Card.Text>
                    <Card.Text>Id : {id}</Card.Text>
                </Card.Body></a>
            </Card>
        );
    }

    async function GetPokemon() {
        pokemon.set.all().then(sets => {
            const setsArray = Object.values(sets);
            setResults({ data: setsArray })
            //  console.log(setsArray[0])
        })

    }
    useEffect(() => {
        (async () => {
            await GetPokemon();
        })();
    }, []);
    return (
        <>
            <input type="text" placeholder="Rechercher un Set" className="form-control mb-3" onChange={event => { setSearchTerm(event.target.value) }} />
            <p className="text-center">Résultats : {results.data && results.data.filter((val) => {
                if (searchTerm === "") {
                    return val
                } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val
                }
            }).length}</p>

            <Container className="d-flex justify-content-center">

                <ul className="cards">

                    {results.data && results.data.filter((val) => {
                        if (searchTerm === "") {
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
                                    image={result.images.logo}
                                />
                            </li>
                        );
                    })}
                </ul>
            </Container>
        </>
    );
}
