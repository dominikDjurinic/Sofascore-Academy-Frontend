import { useNavigate } from 'react-router-dom'
import '../styles/Login.css'
import { Footer } from '../components/Footer';
import { useContext, useState } from 'react';
import ThemeContext from '../context/ThemeContext';
import ProfileContext from '../context/ProfileContext';

export function Login(){
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [showIncorrect, setShowIncorrect] = useState(false);

    const theme = useContext(ThemeContext);
    const username = useContext(ProfileContext);

    const navigate = useNavigate();
    const changeRoute = (int: number) => {                  //promjena rute, odlazak na drugu stranicu
        if(int===2){
            navigate(`/collection`,{ replace: true });
        }else{
            navigate(`/`);
        }
        
    }

    const validation = () => {                          //provjera ispravnosti prijave korisnika
        setShowIncorrect(false);
        if(email==="sofa2024" && pass==="1234"){
            username.changeUsername(email);
            localStorage.setItem("username", email);
            changeRoute(2);
        }else{
            setEmail("");
            setPass("");
            setShowIncorrect(true);
        }
    }

    const closeMsg = () => {                    //zatvaranje div-a s Incorrect msg
        setShowIncorrect(false);
    }


    return(
        <div className={`${theme.theme}-theme hf-div`}>
            <div className='form-back'>
                <div>
                    <button className="btn returnBtn" id="btn-back" onClick={() => changeRoute(1)}><i className="material-icons icon-red">close</i>Return to home page</button>
                    <div className="hint-container hint">
                    <p><span>! HINT:</span> test E-mail : <span>sofa2024</span>, test Password : <span>1234</span></p>
                    </div>
                    {showIncorrect===true ? (
                        <div className="hint-container incorrect" id="incorrect">
                        <i className="material-icons icon-black" id="close-x" onClick={closeMsg}>close</i><p><span>Incorrect email or password.</span> Try again!</p>
                        </div>
                    ):(<></>)}
                </div>
                <div className="form-container">
                    <div className="forma div-column center-align">
                    <img className="logo-img" src="../public/images/pokeball.png"></img>
                    <p id="signIn">Sign In</p>
                    <div className="btnForm div-column center-align">
                        <form className="register-form">
                        <div className="div-column">
                            <label className="input-label" htmlFor="mail">E-mail</label>
                            <input id="mail" type="email" name="email" placeholder="Enter e-mail adress" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="div-column">
                            <label className="input-label" htmlFor="pass">Password</label>
                            <input id="pass" type="password" name="password" placeholder="Enter password" value={pass} onChange={(e) => setPass(e.target.value)}/>
                        </div>
                        <div className="div-inline uvjeti">
                            <label id="passForgot" htmlFor="pass"><a className="linkovi" href="">Forgot password?</a></label>
                            <div className="div-inline">
                            <input id="privacy" type="checkbox" name="privacy" value="yes"/>
                            <label className="info" htmlFor="privacy">Remember me.</label>
                            </div>
                        </div>
                        <div className="div-column">
                            <div className="captcha-div">
                            <img className="captcha-img center-align" src="../public/images/captcha.png"></img>
                            </div>
                            <input type="text" name="notRobot" id="robot" placeholder="Enter words and numbers from picture above"/>
                        </div>
                        </form>
                        <div className="div-column center-align">
                        <button type="submit" className="lgn-button" id="lgn-btn" onClick={validation}>Log In</button>
                        <p className="info">Don't have account? <a className="linkovi" href="">Create account</a></p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}