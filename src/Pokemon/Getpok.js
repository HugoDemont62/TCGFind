import pokemon from 'pokemontcgsdk';
import { useEffect, useState } from 'react';
import { Container, Card, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

pokemon.configure({ apiKey: 'c8452179-1a23-4351-8c61-a70d0e27fa10' });


function Getpok() {
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);




    function Pokemon({ name, artist, image, set, id }) {
        return (
            <Card style={{ width: '18rem' }} className="cardmain">
                <a href={"/Getpok/"+id}><Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>Artist : {artist}</Card.Text>
                    <Card.Text>Set : {set}</Card.Text>
                </Card.Body></a>
            </Card>
        );
    }


    async function GetPokemon() {
        pokemon.card.where({ pageSize: 48, page: page, orderBy: 'name' }).then(cards => {
            const cardsArray = Object.values(cards);
            setResults({ data: cardsArray[0] })
            //  console.log(cardsArray[0])
        })

    }
    useEffect(() => {
        (async () => {
            await GetPokemon();
        })();
    }, [page]);
    return (
        <>
            <input type="text" placeholder="Rechercher un Pokémon dans cette liste" className="form-control mb-3" onChange={event => { setSearchTerm(event.target.value) }} />
            <p className="text-center">Résultats : {results.data && results.data.filter((val) => {
                if (searchTerm === "") {
                    return val
                } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val
                }
            }).length}</p>

            <div className='btn-pok'>
            <Button variant="secondary" size="sm" onClick={() => { setPage(page -1)}}>Page Précédente</Button>
            <Button variant="primary" size="sm" onClick={() => { setPage(page + 1) }}>Page Suivante</Button>{' '}
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
                            <li>
                                <Pokemon
                                    key={result.id}
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
            <Button variant="secondary" size="sm" onClick={() => { setPage(page -1)}}>Page Précédente</Button>
            <Button variant="primary" size="sm" onClick={() => { setPage(page + 1) }}>Page Suivante</Button>{' '}
            </div>
        </>
    );
}

export default Getpok;