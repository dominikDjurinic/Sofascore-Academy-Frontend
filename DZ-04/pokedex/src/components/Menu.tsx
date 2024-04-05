import { useContext } from 'react';
import '../styles/Menu.css'
import { useNavigate } from 'react-router-dom'
import ThemeContext from '../context/ThemeContext';
import ProfileContext from '../context/ProfileContext';

export function Menu(props:{open:boolean}){

    const navigate = useNavigate();
    const changeRoute = () => {
        navigate(`/`);
    }


    const theme = useContext(ThemeContext);
    const username = useContext(ProfileContext);

    return(
        <div className={`menu ${props.open? "menuOpen":"menuClose"}`}>
            <div className="choise-div profile-div">
                <p className="choise">Theme: <span className='boldText upperCaseText'>{theme.theme}</span></p>
            </div>
            <div className="choise-div light-dark-div profile-div">
                <div className={`light-dark icon-white ${theme.theme==="light"? "chosenMode div-chose":""}`} onClick={()=>{localStorage.setItem("theme","light"); theme.changeTheme();}}><i className="material-symbols-outlined">light_mode</i></div>
                <div className={`light-dark icon-white ${theme.theme==="dark"? "chosenMode div-chose":""}`} onClick={()=>{localStorage.setItem("theme","dark"); theme.changeTheme();}}><i className="material-symbols-outlined">dark_mode</i></div>
            </div>
            <div className="choise-div">
                <p className="choise">Profile: <span className='boldText'>{username.username}</span></p>
            </div>
            <div className="choise-div divHover">
                <p className="choise boldText underlineText" onClick={changeRoute}>Log Out</p>
            </div>
        </div>
    )
}