import { useState } from 'react'
import '../styles/Header.css'
import { Menu } from './Menu'

export function Header(){

    const [openMenu, setMenuOpen] = useState(false);
    const [chosenSettings,setChosenSettings] = useState(false)

    return (
        <>
            <div className="header-container">
                <div>
                    <i className="material-symbols-outlined light-dark icon-white">favorite</i>
                </div>
                <div className="headerTitle">
                    <img className='logoImg' src="../public/images/pokeball.png"></img>
                    <p onClick={()=> window.scrollTo(0,0)} className='hName'>POKÉDEX</p>
                </div>
                <div className='settings-div' onMouseEnter={()=>{setMenuOpen(true); setChosenSettings(true)}} onMouseLeave={()=>{setMenuOpen(false); setChosenSettings(false)}}>
                    <div className='settings'>
                        <i className={`material-symbols-outlined light-dark icon-white ${chosenSettings? "chosenMode":""}`}>expand_more</i>
                        <i className={`material-symbols-outlined light-dark icon-white ${chosenSettings? "chosenMode":""}`}>settings</i>
                    </div>
                    <Menu open={openMenu}/>
                </div>
            </div>
            
        </>
    )
}