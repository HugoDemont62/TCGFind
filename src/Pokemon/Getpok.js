import pokemon from 'pokemontcgsdk';
import { useEffect, useState } from 'react';
import { Container, Card, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/getpok.scss';

pokemon.configure({ apiKey: 'c8452179-1a23-4351-8c61-a70d0e27fa10' });


function Getpok() {
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);

   
    function Pokemon({ name, artist, image, set, id }) {
        return (
            <>
                <div className='card3d'>
                    <a href={"/Getpok/" + id}><img src={image} className='carte' />
                    </a>
                </div>
            </>
        );
    }

    function map(val, minA, maxA, minB, maxB) {
        return minB + ((val - minA) * (maxB - minB)) / (maxA - minA);
      }
      
      function Card3D(card, ev) {
        let img = card.querySelector('img');
        let imgRect = card.getBoundingClientRect();
        let width = imgRect.width;
        let height = imgRect.height;
        let mouseX = ev.offsetX;
        let mouseY = ev.offsetY;
        let rotateY = map(mouseX, 0, 180, -25, 25);
        let rotateX = map(mouseY, 0, 250, 25, -25);
        let brightness = map(mouseY, 0, 250, 1.5, 0.5);
        
        img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        img.style.filter = `brightness(${brightness})`;
      }
      
      var cards = document.querySelectorAll('.card3d');
      
      cards.forEach((card) => {
        card.addEventListener('mousemove', (ev) => {
          Card3D(card, ev);
        });
        
        card.addEventListener('mouseleave', (ev) => {
          let img = card.querySelector('img');
          
          img.style.transform = 'rotateX(0deg) rotateY(0deg)';
          img.style.filter = 'brightness(1)';
        });
      });


    async function GetPokemon() {
        pokemon.card.where({ pageSize: 48, page: page, orderBy: 'name' }).then(cards => {
            const cardsArray = Object.values(cards);
            setResults({ data: cardsArray[0] })
        })

    }
    useEffect(() => {
        (async () => {
            await GetPokemon();
        })();
    }, [page]);
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