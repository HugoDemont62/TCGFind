import pokemon from 'pokemontcgsdk';
import { useEffect, useState } from 'react';
import { Container, Card, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/getpok.scss';
import Card3d from './Card3d';

pokemon.configure({ apiKey: 'c8452179-1a23-4351-8c61-a70d0e27fa10' });


function Getpok() {
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);


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
        pokemon.card.where({ pageSize: 48, page: page, orderBy: 'name' }).then(cards => {
            const cardsArray = Object.values(cards);
            setResults({ data: cardsArray[0] })
            setLoading(false);
        })
    }
      
      useEffect(() => {
        GetPokemon();
      }, [page]);
      
      useEffect(() => {
        Card3d();
      }, [results]);


      if (loading) {
        return <div className="loading">Loading...</div>;
      }

    return (
        <>
            <div className='main'>
                <input type="text" placeholder="Search a Pokémon in this page!" className="form-control mb-3" onChange={event => { setSearchTerm(event.target.value) }} />
                <p className="text-center">Results : {results.data && results.data.filter((val) => {
                    if (searchTerm === "") {
                        return val
                    } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val
                    }
                }).length}</p>

                <div className='btn-pok'>
                    <Button variant="secondary" size="sm" onClick={() => { setPage(page - 1) }}>Previous</Button>
                    <Button variant="primary" size="sm" onClick={() => { setPage(page + 1) }}>Next</Button>{' '}
                </div>
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
                                <li key={result.id}>
                                    <Pokemon
                                        name={result.name}
                                        artist={result.artist}
                                        id={result.id}
                                        set={result.set.name}
                                        image={result.images.small}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </Container>
                <div className='btn-pok'>
                    <Button variant="secondary" size="sm" onClick={() => { setPage(page - 1) }}>Previous</Button>
                    <Button variant="primary" size="sm" onClick={() => { setPage(page + 1) }}>Next</Button>{' '}
                </div>
            </div>
        </>
    );

}

export default Getpok;