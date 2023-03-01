import pokemon from 'pokemontcgsdk'
import { useEffect, useState } from 'react'
import { Container, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    useParams
  } from "react-router-dom";

export default function Eachset() {
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    let { name } = useParams();

    function Pokemon({ name, artist, image, id }) {
        return (
            <Card style={{ width: '18rem' }} className="cardmain">
                <a href={"/Getpok/"+id}><Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>artist : {artist}</Card.Text>
                    <Card.Text>Id : {id}</Card.Text>
                </Card.Body></a>
            </Card>
        );
    }

    async function GetPokemon() {
        pokemon.card.where({q: 'set.id:'+name}).then(sets => {
            const setsArray = Object.values(sets);
            setResults({ data: setsArray[0] })
            // console.log(setsArray[0])
        })

    }
    useEffect(() => {
        (async () => {
            await GetPokemon();
        })();
    }, []);
    return (
        <>
            <h1>Eachset</h1>

            <input type="text" placeholder="Rechercher un Pokémon" className="form-control mb-3" onChange={event => { setSearchTerm(event.target.value) }} />
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