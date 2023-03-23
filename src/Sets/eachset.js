import pokemon from 'pokemontcgsdk'
import { useEffect, useState } from 'react'
import { Container, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/getpok.scss';
import Card3d from '../Pokemon/Card3d';
import {
    useParams
} from "react-router-dom";

export default function Eachset() {
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    let { name } = useParams();

    function Pokemon({ name, artist, image, set, id }) {

        return (
            <>
                <div className='card3d'>
                    <div className='card3d__content'>
                        <a href={"/Getpok/" + id}>
                            <img src={image} className='carte' />
                        </a>
                    </div>
                </div>
            </>
        );
    }

    async function GetPokemon() {
        setLoading(true);
        pokemon.card.where({ q: 'set.id:' + name }).then(sets => {
            const setsArray = Object.values(sets);
            setResults({ data: setsArray[0] })
            setLoading(false);
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
                {/* grab the name of the set */}
                <h1 className="text-center">Set id : {name}</h1>

                <input type="text" placeholder="Seek for a Pokémon!" className="form-control mb-3" onChange={event => { setSearchTerm(event.target.value) }} />
                <p className="text-center">Results : {results.data && results.data.filter((val) => {
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
            </div>
        </>
    )
}