import { useNavigate } from 'react-router-dom'
import '../styles/Home.css'
import { Footer } from '../components/Footer';



export function Home(){
    const navigate = useNavigate();
    const changeRoute = () => {
        navigate(`login`);
    }

    return(
        <>
        <div className='home light-theme'>
            <div className='homeBack'>
                <div className="homeTitle">
                    <img className='logoImgHome' src="../public/images/pokeball.png"></img>
                    <p className='homeName'>POKÉDEX</p>
                </div>
                <div className='homeMsg'>
                    <p><span className='hName'>POKÉDEX</span> is a collection of Pokémon with their basic characteristics and graphical representations.</p>
                    <p style={{fontWeight: 'bold', textShadow: '1px 1px black'}}>Explore Pokémon, have fun and learn something new about them!</p>
                </div>
                <div className='btnStart-div'>
                    <button onClick={changeRoute} className='btn btn-lgn'>Log In to explore</button>
                    <button className='btn btn-guest'>Explore as a guest</button>
                </div>
            </div>
            <Footer/>
        </div>  
        </>
    )
}