import '../styles/Header.css'
import { useNavigate } from 'react-router-dom'

export function Header(){
    const navigate = useNavigate();
    const changeRoute = () => {
        navigate(`/`);
    }
    return (
        <>
            <div className="header-container light-theme">
                <div>
                    <img className='icon' src="../public/images/heart.png"></img>
                </div>
                <div className="headerTitle">
                    <img className='logoImg' src="../public/images/pokeball.png"></img>
                    <p className='hName'>POKÉDEX</p>
                </div>
                <div>
                    <img className='icon' src="../public/images/settings.png" onClick={changeRoute}></img>
                </div>
            </div>
        </>
    )
}