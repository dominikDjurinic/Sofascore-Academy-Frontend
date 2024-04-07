import { useContext } from 'react';
import '../styles/MenuHome.css'
import ThemeContext from '../context/ThemeContext';

export function MenuHome(props:{open:boolean}){ //izbornik početne stranice


    const theme = useContext(ThemeContext);

    return(
        <div className={`menuHome ${props.open? "menuHomeOpen":"menuHomeClose"}`}>
            <div className="choise-div-Home">
                <div className={`light-dark icon-white ${theme.theme==="light"? "chosenMode div-chose":""}`} onClick={()=>{theme.changeTheme(); localStorage.setItem("theme","light")}}><i className="material-symbols-outlined">light_mode</i></div>
                <div className={`light-dark icon-white ${theme.theme==="dark"? "chosenMode div-chose":""}`} onClick={()=>{theme.changeTheme(); localStorage.setItem("theme","dark")}}><i className="material-symbols-outlined">dark_mode</i></div>
            </div>
        </div>
    )
}