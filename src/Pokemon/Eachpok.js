import pokemon from 'pokemontcgsdk'
import { useEffect, useState } from 'react'
import { Container, Card, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/getpok.scss';
import {
    useParams
} from "react-router-dom";
import Card3d from './Card3d';

export default function Eachpok() {
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    let { name } = useParams();

    function Pokemon({ name, artist, image, setid, setname, setprinted, number, pokedex, types, evolvesFrom, prices, priceurl, lastprice, id }) {

        const evolve = () => {
            if (evolvesFrom) {
                return (
                    <Card.Text>Evolve from : {evolvesFrom}</Card.Text>
                )
            } else {
                return (
                    <Card.Text>This card does not have an old evolve.</Card.Text>
                )
            }
        }

        const type = () => {
            if (types) {
                return (
                    <Card.Text>Type : {types}</Card.Text>
                )
            } else {
                return (
                    <Card.Text>This card does not have any type.</Card.Text>
                )
            }
        }

        const pokedexx = () => {
            if (pokedex) {
                return (
                    <Card.Text>Pokedex number : {pokedex}</Card.Text>
                )
            } else {
                return (
                    <Card.Text>This card does not have a pokedex number.</Card.Text>
                )
            }
        }


        return (
            <>  
                <div className='eachcard'>
                    <div className='eachcard__content'>
                            <img src={image} className='carte' width={'350px'} height={'500px'} />
                    </div>
                    <div className='eachcard__content2'>
                    <Card.Title>{name}</Card.Title>
                    <div className='card_set'>
                    <Card.Text>Artist : {artist}</Card.Text>
                    <Card.Text>Set : <a href={"/Sets/" + setid}>{setname}</a></Card.Text>
                    <Card.Text>Card number : {number}/{setprinted}</Card.Text>
                    </div>
                    <div className='card_type'>
                    {pokedexx()}
                    {type()}
                    {evolve()}
                    </div>
                    <Card.Text>Average price : <a href={priceurl} target="_blank">{prices}$</a></Card.Text>
                    <Card.Text>Last price : <a href={priceurl} target="_blank">{lastprice}$</a></Card.Text>
                    </div>
                </div>
            </>
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
        GetPokemon();
      }, []);
      
      useEffect(() => {
        Card3d();
      }, [results]);


      if (loading) {
        return <div className="loading">Loading...</div>;
      }

    return (
        <>
            <div className='main'>
                <div className='eachpok'>
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
                                        lastprice={result.cardmarket.prices.avg1}
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
                </div>
            </div>
        </>
    )
}