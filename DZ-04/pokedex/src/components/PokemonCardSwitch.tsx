import { useEffect, useState } from 'react'
import '../styles/PokemonCard.css'
import { Details } from './Details'
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
    front_shiny: string
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


export function PokemonCardSwitch(props: {name:string, url:string,favorite:Favorite[], editFavorite:(favArray:Favorite[])=>void}){
    
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
            <div className='pokemon-descriptDiv-Switch'>
                    <h1 className='namePokemon'>{numGenerator} {props.name}</h1>
                    <div className='description-div-switch switch-des-div'>
                        <div className='details-div'>
                            <p>Health points: <span>{pokemon.stats[0].base_stat} HP</span></p>
                            <p>Height: <span>{pokemon.height*10} cm</span></p>
                            <p>Weight: <span>{pokemon.weight} kg</span></p>
                            <div className='types'><p>Type: </p><div className='types'>{pokemon.types.map(({type},ind)=> {return <Type key={pokemon.name+ind} type={type.name}/>})}</div></div>
                            <Details url={pokemon.species.url}/>
                        </div>
                        <div className='fullView-div'>
                            <p>Full view:</p>
                            <div>
                                <img className='fullViewImg' src={`${selectedFav?pokemon.sprites.front_shiny:pokemon.sprites.front_default}`}></img>
                                <img className='fullViewImg' src={`${selectedFav?pokemon.sprites.back_shiny:pokemon.sprites.back_default}`}></img>
                            </div>
                        </div>
                    </div>
                </div>
                <Heart name={props.name} id={pokemon.id} image={pokemon.sprites.other['official-artwork'].front_shiny} favorite={props.favorite} editFavorite={props.editFavorite} callFrom='pokCardSwitch'/>
                <div className='pokemon-imgDiv-Switch'>
                    <img src={`${selectedFav?pokemon.sprites.other['official-artwork'].front_shiny:pokemon.sprites.other['official-artwork'].front_default}`} id='pokemonImg'></img>
                </div>
            </div>
        </>
    )
}