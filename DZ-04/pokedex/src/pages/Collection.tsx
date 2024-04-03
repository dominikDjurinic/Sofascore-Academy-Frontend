import { useState, useEffect } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PokemonCard } from "../components/PokemonCard";
import { PokemonCardSwitch } from "../components/PokemonCardSwitch";
import { ScrollToTop } from "../components/ScrollToTop";

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



export function Collection(){

    const [responsePokemons,setResponsePokemons] = useState<PokemonResponse[]>([]);
    const [nextApi,setNextApi] = useState(0);
    const [loading,setLoading] = useState(false);
    const [end,setEnd] = useState(false);
    const [scrollTop,setScrollTop] = useState(false);
    const [widthChanged, setWidthChanged] = useState(window.screen.width);

    useEffect(() => {

        const fetchPokemons = async () => {
            setLoading(true)
            try {
                let jsonResponse

                if(nextApi===0){
                    console.log("usao")
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
        setWidthChanged(window.screen.width);
    }

    useEffect(() =>{ //promjena velicine prozora
        window.addEventListener('resize', onResize);
    }, [])


    if (!responsePokemons) {
        return null
    }

    return(
        <>
            <div className="light-theme">
                <Header/>
                {responsePokemons.map(({results}) => (
                    results.map(({name, url},ind)=> {
                        if(widthChanged<=900){
                            return <PokemonCard key={name} name={name} url={url}/>
                        }else{
                            if(ind%2===0){
                                return <PokemonCard key={name} name={name} url={url}/>
                            }else{
                                return <PokemonCardSwitch key={name} name={name} url={url}/>
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
            
        </>
    )
}