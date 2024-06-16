import { useNavigate } from 'react-router-dom'
import '../styles/Home.css'
import { Footer } from '../components/Footer';
import { useContext, useState } from 'react';
import ThemeContext from '../context/ThemeContext';
import { MenuHome } from '../components/MenuHome';



export function Home(){
    const navigate = useNavigate();
    const changeRoute = () => {
        navigate(`login`);
    }

    const theme = useContext(ThemeContext);
    const [openMenu, setMenuOpen] = useState(false);
    const [chosenSettings,setChosenSettings] = useState(false)

    return(
        <>
        <div className={`home ${theme.theme}-theme`}>
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
            <div className='settingsHome' onMouseEnter={()=>{setMenuOpen(true); setChosenSettings(true)}} onMouseLeave={()=>{setMenuOpen(false); setChosenSettings(false)}}>
                <MenuHome open={openMenu}/>
                <div className='settingHome-div'>
                    <i className={`material-symbols-outlined light-dark icon-white ${chosenSettings? "chosenMode":""}`}>settings</i>
                </div>
            </div>
            <Footer/>
        </div>  
        </>
    )
}