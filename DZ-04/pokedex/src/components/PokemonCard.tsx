import { useEffect, useState } from 'react'
import '../styles/PokemonCard.css'
import '../components/Details.tsx'
import { Details } from '../components/Details.tsx'
import { Type } from './Type.tsx'
import { Heart } from './Heart.tsx'

interface StatsItem {
    base_stat: number
}

interface TypeItem {
    slot: number
    type: TypeObj
}

interface TypeObj {
    name: string
}

interface SpiecesItem {
    url: string
}

interface ArtWorkItem{
    front_default: string
    front_shiny:string
}

interface OtherItem{
    "official-artwork": ArtWorkItem
}

interface SpritesItem {
    front_default: string
    back_default: string
    other: OtherItem
    front_shiny: string
    back_shiny: string
}

  
interface PokemonDet {
    stats: StatsItem[]
    height: number
    weight: number
    types: TypeItem[]
    id: number
    species: SpiecesItem
    sprites: SpritesItem
    name: string
}

interface Favorite{
    name: string
    id: number
    image: string   
}



export function PokemonCard(props: {name:string, url:string, favorite:Favorite[], editFavorite:(favArray:Favorite[])=>void}){    

    const [pokemon, setPokemon] = useState<PokemonDet|undefined>(undefined);
    const [selectedFav,setSelectedFav] = useState(false);


    useEffect(() => {

        const fetchDetailsPokemon = async () => {
            try {
                const jsonResponse = await (await fetch(`${props.url}`)).json()
                setPokemon(jsonResponse)
            } catch (e) {
                console.error(e)
            }
        }

        fetchDetailsPokemon();
    },[])

    useEffect(()=>{
        const ind = props.favorite.findIndex((fav:Favorite)=>{return fav.name===props.name });
        if(ind===-1){ //select
            setSelectedFav(false)
        }else{//deselect
            setSelectedFav(true)
        }
    },[props.favorite])

    if (!pokemon) {
        return null
    }

    const numGenerator = "#" + ('0000'+ pokemon?.id).slice(-5);
    
    return(
        <>
            <div className='poke-row'>
                <Heart name={props.name} id={pokemon.id} image={pokemon.sprites.other['official-artwork'].front_shiny} favorite={props.favorite} editFavorite={props.editFavorite} callFrom='pokCard'/>
                <div className='pokemon-imgDiv'>
                    <img className={`pokemonSize ${selectedFav?"pokeTranslateOut transImage op0":"pokeTranslateIn transImage op1"}`} src={pokemon.sprites.other['official-artwork'].front_default}></img>
                    <img className={`pokemonSize ${selectedFav?"pokeTranslateIn transImage op1":"pokeTranslateOut transImage op0"}`} src={pokemon.sprites.other['official-artwork'].front_shiny}></img>
                </div>
                <div className='pokemon-descriptDiv'>
                    <h1>{numGenerator} {props.name}</h1>
                    <div className='description-div'>
                        <div className='details-div'>
                            <p>Health points: <span>{pokemon.stats[0].base_stat} HP</span></p>
                            <p>Height: <span>{pokemon.height*10} cm</span></p>
                            <p>Weight: <span>{pokemon.weight} kg</span></p>
                            <div className='types'><p>Type: </p><div className='types'>{pokemon.types.map(({type},ind)=> {return <Type key={pokemon.name+ind} type={type.name}/>})}</div></div>
                            <Details url={pokemon.species.url}/>
                        </div>
                        <div className='fullView-div'>
                            <p>Full view:</p>
                            <div className='fullImage-div'>
                                <img className={`fullViewImg ${selectedFav?"pokeOpOut transFullView op0":"pokeOpIn transFullView op1"}`} src={pokemon.sprites.front_default}></img>
                                <img className={`fullViewImg backView ${selectedFav?"pokeOpOut transFullView op0":"pokeOpIn transFullView op1"}`} src={pokemon.sprites.back_default}></img>
                                <img className={`fullViewImg ${selectedFav?"pokeOpIn transFullView op1":"pokeOpOut transFullView op0"}`} src={pokemon.sprites.front_shiny}></img>
                                <img className={`fullViewImg backView ${selectedFav?"pokeOpIn transFullView op1":"pokeOpOut transFullView op0"}`} src={pokemon.sprites.back_shiny}></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}