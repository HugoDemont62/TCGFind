import pokemon from 'pokemontcgsdk';
import { useEffect, useState } from 'react';
import { Container, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/getpok.scss';

pokemon.configure({ apiKey: 'c8452179-1a23-4351-8c61-a70d0e27fa10' });


export default function Sets() {
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    
    
    function Pokemon({ name, artist, image, printed, release, id }) {
        return (
            <div className='sets'>
                <a href={"/Sets/"+id}>
                    <div className='sets__content'>
                        <img src={image} alt={'set : '+ name}/>
                    </div>
                    <div className='sets__content2'>
                    <h5>{name}</h5>
                    <p>Total cards : {printed}</p>
                    <p>Release date : {release}</p>
                    </div>
                </a>
            </div>
        );
    }

    async function GetPokemon() {
        setLoading(true);
        pokemon.set.all().then(sets => {
            const setsArray = Object.values(sets);
            setResults({ data: setsArray })
            setLoading(false);
        })

    }
    useEffect(() => {
        (async () => {
            await GetPokemon();
        })();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <>
            <div className='main'>
            <input type="text" placeholder="Search for a Set!" className="form-control mb-3" onChange={event => { setSearchTerm(event.target.value) }} />
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
                            <li key={result.id}>
                                <Pokemon
                                    name={result.name}
                                    artist={result.artist}
                                    id={result.id}
                                    printed={result.printedTotal}
                                    release={result.releaseDate}
                                    image={result.images.logo}
                                />
                            </li>
                        );
                    })}
                </ul>
            </Container>
            </div>
        </>
    );
}
