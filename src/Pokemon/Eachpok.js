import pokemon from 'pokemontcgsdk'
import { useEffect, useState } from 'react'
import { Container, Card, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    useParams
} from "react-router-dom";

export default function Eachpok() {
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    let { name } = useParams();

    function Pokemon({ name, artist, image, setid, setname, types, evolvesFrom, prices, id }) {

        const evolve = () => {
            if(evolvesFrom){
                return (
                    <Card.Text>Evolue de : {evolvesFrom}</Card.Text>
                )
            } else {
                return (
                    <Card.Text>Pas d'évolution précédente.</Card.Text>
                )
            }
        }

        return (
            <Card style={{ width: '18rem' }} className="cardmain">
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>Artiste : {artist}</Card.Text>
                    <Card.Text>Set : <a href={"/Sets/"+setid}>{setname}</a></Card.Text>
                    <Card.Text>Type : {types}</Card.Text>
                    {evolve()}
                    <Card.Text>Prix moyen : {prices}</Card.Text>
                </Card.Body>
            </Card>
        );
    }

    async function GetPokemon() {
        // display a set by id
        pokemon.card.all({ q: 'id:' + name }).then(pok => {
            const pokArray = Object.values(pok);
            setResults({ data: pokArray })
            // console.log(pokArray[0])
        })

    }
    useEffect(() => {
        (async () => {
            await GetPokemon();
        })();
    }, []);

    return (
        <>
            <h1></h1>

          
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
                                    setid={result.set.id}
                                    setname={result.set.name}
                                    types={result.types}
                                    evolvesFrom={result.evolvesFrom}
                                    prices={result.prices}
                                    image={result.images.small}
                                />
                            </li>
                        );
                    })}
                </ul>
            </Container>
        </>
    )
}