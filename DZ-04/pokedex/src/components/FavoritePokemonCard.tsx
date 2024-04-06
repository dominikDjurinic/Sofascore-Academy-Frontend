import '../styles/FavoritePokemonCard.css'
import { Heart } from './Heart';

interface Favorite{
    name: string
    id: number
    image: string   
}

export function FavoritePokemonCard(props:{name:string, id:number, image:string, favorite:Favorite[], editFavorite:(favArray:Favorite[])=>void}){

    const numGenerator = "#" + ('0000'+ props.id).slice(-5);

    return(
        <>
        <div className='poke-card'>
                <Heart name={props.name} id={props.id} image={props.image} favorite={props.favorite} editFavorite={props.editFavorite} callFrom='favCard'/>
                <div className='pokemonFav-imgDiv'>
                    <img src={props.image}></img>
                </div>
                <div className='pokemonFav-descriptDiv'>
                    <h2>{numGenerator} {props.name}</h2>
                </div>
            </div>
        </>
    )
}