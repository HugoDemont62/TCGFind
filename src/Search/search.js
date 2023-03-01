import pokemon from 'pokemontcgsdk';
import { useEffect, useState } from 'react';
import { Container, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

pokemon.configure({ apiKey: 'c8452179-1a23-4351-8c61-a70d0e27fa10' });

export default function Searchpok() {
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    function Search() {
        return (
            <input type="text" placeholder="Rechercher un Pokémon ! Ex : Charizard, Blastoise, Rayquaza, etc..." className="form-control mb-3" onChange={event => { setSearchTerm(event.target.value) }} />
        )
    }

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
        if(searchTerm=="")
            return []
        pokemon.card.all({q: 'name:' + searchTerm}).then(cards => {
            const cardsArray = Object.values(cards);
            console.log("ICI", cardsArray)
            setResults({ data: cardsArray})
        })
    }
    useEffect(() => {
        (async () => {
            await GetPokemon();
        })();
    }, [searchTerm]); 
    console.log(results)
    return (
        <>
            <input type="text" placeholder="Rechercher un Pokémon ! Ex : Charizard, Blastoise, Rayquaza, etc..." className="form-control mb-3" onChange={event => { setSearchTerm(event.target.value) }} />
            <p className="text-center">Résultats : {results.data && results.data.filter((val) => {
                if (searchTerm === "") {
                    return val
                } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val
                }
            }).length}</p>
            <Container className="d-flex justify-content-center">
                <ul className="cards">
                {results.data && results.data.map((val, key) => {
                    return <li> <Pokemon name={val.name} artist={val.artist} image={val.images.small} id={val.id} key={key} /></li>
                })}
                </ul>
            </Container>
            </>
    )
}