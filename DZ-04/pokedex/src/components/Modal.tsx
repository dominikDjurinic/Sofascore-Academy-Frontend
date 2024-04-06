import '../styles/Modal.css';
import { FavoritePokemonCard } from './FavoritePokemonCard';


interface Favorite{
    name: string
    id: number
    image: string   
}

export function Modal(props:{open:boolean, close:(close:boolean)=>void, favorite:Favorite[], editFavorite:(favArray:Favorite[])=>void}){


    if(props.open){

        return(
            <>
                <div className='backdrop' onClick={()=>{props.close(false);}}></div>
                <div className='modal-container'>
                    <div className='closeBtn' onClick={()=>{props.close(false);}}>
                        <i className="material-icons icon-black">close</i><span>Close</span>
                    </div>
                    <div className='modalTitle'>
                        <h3><i className="material-symbols-outlined  icon-red">favorite</i>Favorites</h3>
                    </div>
                    <div className='favorites-cards'>
                        {props.favorite.length === 0? <p>No favorites</p>:null}
                        {props.favorite.map(({name, id, image})=>{
                            return <FavoritePokemonCard key={name} name={name} id={id} image={image} favorite={props.favorite} editFavorite={props.editFavorite}/>
                        })}
                    </div>
                </div>
            </>
            
            
        )
    }else{
        return null;
    }
}