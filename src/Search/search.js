import pokemon from 'pokemontcgsdk';
import { useEffect, useState } from 'react';
import { Container, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/getpok.scss';
import Card3d from '../Pokemon/Card3d';


pokemon.configure({ apiKey: 'c8452179-1a23-4351-8c61-a70d0e27fa10' });

export default function Searchpok() {
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    function Search() {
        return (
            <input type="text" placeholder="Seek for a Pokémon ! Ex : Charizard, Blastoise, Rayquaza, etc..." className="form-control mb-3" onChange={event => { setSearchTerm(event.target.value) }} />
        )
    }

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
        if (searchTerm == "")
            return []
        pokemon.card.all({ q: 'name:' + searchTerm }).then(cards => {
            const cardsArray = Object.values(cards);
            setResults({ data: cardsArray })
            setLoading(false);
        })
    }
    useEffect(() => {
        GetPokemon();
    }, [searchTerm]);

    useEffect(() => {
        Card3d();
    }, [results]);


    
    return (
        <>
            <div className='main'>
                <div className='search'>
                    <input type="text" placeholder="Find a Pokémon! Ex: Charizard, Blastoise, Rayquaza, etc..." className="form-control mb-3" onChange={event => { setSearchTerm(event.target.value) }} />
                    <p className="text-center">Results : {results.data && results.data.filter((val) => {
                        if (searchTerm === "") {
                            return val
                        } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return val
                        }
                    }).length}</p>
                    
                    <Container className="d-flex justify-content-center">
                        <ul className="cards">
                        {loading ? <div className="loading">Loading your research...</div> :  results.data && results.data.map((val, key) => {
                                return <li key={val.id}> <Pokemon name={val.name} artist={val.artist} image={val.images.small} setid={val.set.id}
                                    setname={val.set.name} id={val.id} key={key} /></li>
                            })}
                        </ul>
                    </Container>
                </div>
            </div>
        </>
    )
}