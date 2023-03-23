import '../styles/index.scss'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import pokemon from 'pokemontcgsdk';
import Card3d from "../Pokemon/Card3d";

pokemon.configure({ apiKey: 'c8452179-1a23-4351-8c61-a70d0e27fa10' });

export default function Index() {
    const [results, setResults] = useState([]);
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
        pokemon.card.all({ q: 'name:gengar' }).then(cards => {            
            const cardsArray = Object.values(cards);
            setResults({ data: cardsArray })
            setLoading(false);
        })
    }
    useEffect(() => {
        GetPokemon();
    }, []);

    useEffect(() => {
        Card3d();
    }, [results]);

    return (
        <>
            <div className='home'>
                <div className='home__content'>
                    <h1 className='home__title'>Welcome to the Pokémon TCG Find API</h1>
                    <h3 className='home__h3'>This is a simple API that allows you to search for Pokémon cards, sets and more!</h3>
                </div>

                <div className='home__content2'>
                    <h2 className='home__title2'>Start browsing some stuff!</h2>
                    <div className='home__content3'>
                        <button className='home__button'><Link to="/Getpok">Cards</Link></button>
                        <button className='home__button'><Link to="/Sets">Sets</Link></button>
                        <button className='home__button'><Link to="/Searchpok">Search</Link></button>
                    </div>
                </div>

                <div className='home__content4'>
                    <h2 className='home__title3'>Or check out some random cards!</h2>
                    <div className='home__content5'>
                    <ul className="cards">
                           {loading ? <div className="loading">Loading...</div> :  results.data && results.data.map((val, key) => {
                                return <li key={val.id}> <Pokemon name={val.name} artist={val.artist} image={val.images.small} setid={val.set.id}
                                    setname={val.set.name} id={val.id} key={key} /></li>
                            }
                            ).filter((val, key) => key < 3)
                            }

                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}