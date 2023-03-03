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

    function Pokemon({ name, artist, image, setid, setname, setprinted, number, pokedex, types, evolvesFrom, prices, priceurl, id }) {

        const evolve = () => {
            if(evolvesFrom){
                return (
                    <Card.Text>Evolve from : {evolvesFrom}</Card.Text>
                )
            } else {
                return (
                    <Card.Text>This card does not has an old evolve.</Card.Text>
                )
            }
        }

        const type = () => {
            if(types){
                return (
                <Card.Text>Type : {types}</Card.Text>
                )
            } else {
                return (
                <Card.Text>This card does not has type.</Card.Text>
                )
            }
        }

        const pokedexx = () => {
            if(pokedex){
                return (
                <Card.Text>Pokedex number : {pokedex}</Card.Text>
                )
            } else {
                return (
                <Card.Text>This card does not has pokedex number.</Card.Text>
                )
            }
        }


        return (
            <Card style={{ width: '18rem' }} className="cardmain">
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>Artist : {artist}</Card.Text>
                    <Card.Text>Set : <a href={"/Sets/"+setid}>{setname}</a></Card.Text>
                    <Card.Text>Card number : {number}/{setprinted}</Card.Text>
                    {pokedexx()}
                    {type()}
                    {evolve()}
                    <Card.Text>Average price : <a href={priceurl} target="_blank">{prices}$</a></Card.Text>
                </Card.Body>
            </Card>
        );
    }

    async function GetPokemon() {
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
                                    prices={result.cardmarket.prices.averageSellPrice}
                                    priceurl={result.cardmarket.url}
                                    setprinted={result.set.printedTotal}
                                    number={result.number}
                                    pokedex={result.nationalPokedexNumbers}
                                    image={result.images.large}
                                />
                            </li>
                        );
                    })}
                </ul>
            </Container>
        </>
    )
}