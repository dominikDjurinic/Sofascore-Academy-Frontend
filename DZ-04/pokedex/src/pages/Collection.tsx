import { useState, useEffect, useContext } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PokemonCard } from "../components/PokemonCard";
import { PokemonCardSwitch } from "../components/PokemonCardSwitch";
import { ScrollToTop } from "../components/ScrollToTop";
import ThemeContext from "../context/ThemeContext";
import { Modal } from "../components/Modal";
import RemoveContext from "../context/RemoveContext";

interface ResponseItem {
    name: string
    url: string
}
  
interface PokemonResponse {
    count: number
    next: string | null
    previous: string | null
    results: ResponseItem[]
}

interface Favorite{
    name: string
    id: number
    image: string   
}


export function Collection(){

    const [responsePokemons,setResponsePokemons] = useState<PokemonResponse[]>([]);
    const [nextApi,setNextApi] = useState(0);
    const [loading,setLoading] = useState(false);
    const [end,setEnd] = useState(false);
    const [scrollTop,setScrollTop] = useState(false);
    const [widthChanged, setWidthChanged] = useState(window.innerWidth);
    const [openModal, setOpenModal] = useState(false);
    const [favorites, setFavorites] = useState<Favorite[]>([]);

    const theme = useContext(ThemeContext);

    const removingPokemons = (newArray:string[]) =>{  //funkcija za promjenu contexta RemoveContext od child komponenta
        setRemoveList(()=>({
            removeList:newArray, 
            removingPokemons
        }));
    }

    const [removeList, setRemoveList] = useState({removeList:[''], removingPokemons});  //potvrduje dislike/ favorite remove iz Modal komponente nakon zatvaranja

    useEffect(() => {

        const fetchPokemons = async () => {     /**FETCH - dohvat pokemona s API-ja**/
            setLoading(true)
            try {
                let jsonResponse

                if(nextApi===0){
                    jsonResponse = await (await fetch('https://pokeapi.co/api/v2/pokemon')).json()
                }else{
                    jsonResponse = await (await fetch(`${responsePokemons[nextApi-1].next}`)).json()  //dohvat sa sljedeće poveznice
                }
                setResponsePokemons([...responsePokemons,jsonResponse])
                setLoading(false)
            } catch (e) {
                console.error(e)
            }
        }
    
        fetchPokemons();

    },[nextApi])

    const handleScroll = () => {            /**detekcija kraja scrolla (INFINITE SCROLL)**/
        if (window.innerHeight + Math.round(document.documentElement.scrollTop) < document.body.offsetHeight || loading) {
            return;
        }
        if(responsePokemons[nextApi].next===null){ //provjera kraja pokemona
            setLoading(false);
            setEnd(true);
            return;
        } 
        setNextApi(nextApi+1);  //dohvat sljedecih 20 pokemona
    };
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

    const onScroll = () => {        //povratak na vrh stranice
        if(document.documentElement.scrollTop > 0){
            setScrollTop(true)
        }else{
            setScrollTop(false)
        }
    }

    useEffect(() =>{
        window.addEventListener('scroll', onScroll);
    }, [])

    const onResize = () => {       //odredivanje tocne velicine ekrana za odabir ispravnog dizajna PokemonCard (responzivnost)
        setWidthChanged(window.innerWidth);
    }

    useEffect(() =>{            //promjena velicine prozora
        window.addEventListener('resize', onResize);
    }, [])

    useEffect(()=>{             //nakon zatvaranja Modal komponente potrebno remove favorita koje je korisnik dislike
        if(!openModal){
            let favorite = favorites;
            removeList.removeList.forEach((name)=> favorite=favorite.filter((fav:Favorite)=>{return fav.name!==name}));
            setFavorites(favorite);
        }
    },[openModal])

    if (!responsePokemons) {
        return null
    }

    const switchModal = (open:boolean) => {     //otvori ili zatvori Modal komponentu
        if(open){
            removingPokemons([]);
        }
        setOpenModal(open);
    }

    const editFavorites = (editedFavorite:Favorite[]) => {      //promjena favorita
        setFavorites(editedFavorite);
    }

   

    return(
        <>
        <RemoveContext.Provider value={removeList}>
            <div className={`${theme.theme}-theme`}>
                <Modal open={openModal} close={switchModal} favorite={favorites} editFavorite={editFavorites}/>
                <Header open={switchModal} opened={openModal}/>
                {responsePokemons.map(({results}) => (
                    results.map(({name, url},ind)=> {
                        if(widthChanged<=900){
                            return <PokemonCard key={name} name={name} url={url} favorite={favorites} editFavorite={editFavorites}/>
                        }else{
                            if(ind%2===0){
                                return <PokemonCard key={name} name={name} url={url} favorite={favorites} editFavorite={editFavorites}/>
                            }else{
                                return <PokemonCardSwitch key={name} name={name} url={url} favorite={favorites} editFavorite={editFavorites}/>
                            }
                        }
                    }
                    ))
                )
                }
                <div className="LoadEndMsg">
                    {loading && <h3>Loading...</h3>}
                    {end && <h3>End of collection Pokémon</h3>}
                </div>
                {scrollTop && <ScrollToTop/>}
                <Footer/>
            </div>
        </RemoveContext.Provider>  
        </>
    )
}