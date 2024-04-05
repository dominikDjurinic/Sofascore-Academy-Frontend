import { useEffect, useState } from 'react'
import '../styles/PokemonCard.css'
import '../components/Details.tsx'
import { Details } from '../components/Details.tsx'
import { Type } from './Type.tsx'

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
}

interface OtherItem{
    "official-artwork": ArtWorkItem
}

interface SpritesItem {
    front_default: string
    back_default: string
    other: OtherItem
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


export function PokemonCard(props: {name:string, url:string}){    

    const [pokemon, setPokemon] = useState<PokemonDet|undefined>(undefined);


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


    if (!pokemon) {
        return null
    }

    const numGenerator = "#" + ('0000'+ pokemon?.id).slice(-5);
    
    return(
        <>
            <div className='poke-row'>
                <div className='heart-icon'>
                    <i className="material-symbols-outlined light-dark-red icon-gray">favorite</i>
                </div>
                <div className='pokemon-imgDiv'>
                    <img src={pokemon.sprites.other['official-artwork'].front_default} id='pokemonImg'></img>
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
                            <div>
                                <img className='fullViewImg' src={pokemon.sprites.front_default}></img>
                                <img className='fullViewImg' src={pokemon.sprites.back_default}></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}