import '../styles/index.scss'

export default function About() {
    return (
        <>
            <div className='about'>
                <div className='home__content'>
                    <h1 className='home__title'>About the Pokémon TCG Find API</h1>
                    <h5 className='home__title2'>What is this?</h5>
                    <p className='home__text'>This is a simple API for the Pokémon Trading Card Game. It is a work in progress, and is not affiliated with The Pokémon Company in any way.</p>
                    <h5 className='home__title2'>How do I use it?</h5>
                    <p className='home__text'>This API is free to use, but please be considerate of the server load. If you are making a large number of requests, please consider caching the data on your end.</p>
                    <h5 className='home__title2'>How do I contribute?</h5>
                    <p className='home__text'>If you would like to contribute to this project, please feel free to fork the project on <a href="https://github.com/HugoDemont62/TCGFind"> Github.</a></p>
                    <h5 className='home__title2'>How do I contact you?</h5>
                    <p className='home__text'>If you have any questions, comments, or concerns, please feel free to contact me at <a href="mailto:drique.noah@gmail.com"> my mail.</a></p>
                    <h5 className='home__title2'>Who made this beautiful api work ?</h5>
                    <p className='home__text'>This beautiful and fully working API was made by <a href="https://github.com/nwyux">Noah Drique</a> and <a href="https://github.com/HugoDemont62/">Hugo Demont.</a></p>
                    </div>
            </div>
        </>
    );
}