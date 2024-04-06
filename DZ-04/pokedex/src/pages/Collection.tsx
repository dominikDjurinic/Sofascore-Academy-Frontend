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

    const removingPokemons = (newArray:string[]) =>{
        setRemoveList(()=>({
            removeList:newArray, 
            removingPokemons
        }));
    }

    const [removeList, setRemoveList] = useState({removeList:[''], removingPokemons});

    useEffect(() => {

        const fetchPokemons = async () => {
            setLoading(true)
            try {
                let jsonResponse

                if(nextApi===0){
                    jsonResponse = await (await fetch('https://pokeapi.co/api/v2/pokemon')).json()
                }else{
                    jsonResponse = await (await fetch(`${responsePokemons[nextApi-1].next}`)).json()
                }

                console.log(jsonResponse)
                setResponsePokemons([...responsePokemons,jsonResponse])
                setLoading(false)
            } catch (e) {
                console.error(e)
            }
        }
    
        fetchPokemons();

    },[nextApi])

    const handleScroll = () => {
        if (window.innerHeight + Math.round(document.documentElement.scrollTop) < document.body.offsetHeight || loading) {
            return;
        }
        if(responsePokemons[nextApi].next===null){ //provjera kraja pokemona
            setLoading(false);
            setEnd(true);
            return;
        } 
        setNextApi(nextApi+1);
    };
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

    const onScroll = () => {
        if(document.documentElement.scrollTop > 0){
            setScrollTop(true)
        }else{
            setScrollTop(false)
        }
    }

    useEffect(() =>{
        window.addEventListener('scroll', onScroll);
    }, [])

    const onResize = () => {       //odredivanje tocne velicine za odabir PokemonCard
        setWidthChanged(window.innerWidth);
    }

    useEffect(() =>{ //promjena velicine prozora
        window.addEventListener('resize', onResize);
    }, [])

    useEffect(()=>{
        if(!openModal){
            let favorite = favorites;
            removeList.removeList.forEach((name)=> favorite=favorite.filter((fav:Favorite)=>{return fav.name!==name}));
            setFavorites(favorite);
        }
    },[openModal])

    if (!responsePokemons) {
        return null
    }

    const switchModal = (open:boolean) => {
        setOpenModal(open);
    }

    const editFavorites = (editedFavorite:Favorite[]) => {
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