import { useEffect, useState, useContext } from "react";
import RemoveContext from "../context/RemoveContext";

interface Favorite{
    name: string
    id: number
    image: string   
}


export function Heart(props:{name:string, id:number, image:string, favorite:Favorite[], editFavorite:(favArray:Favorite[])=>void, callFrom:string}){
    
    const [selectedFav,setSelectedFav] = useState(true);

    const remove = useContext(RemoveContext);

    let favorites:Favorite[] = [];

    useEffect(()=>{
        if(props.callFrom==='favCard'){
            return
        }
        const ind = props.favorite.findIndex((fav:Favorite)=>{return fav.name===props.name });
        if(ind===-1){ //select
            setSelectedFav(false)
        }else{//deselect
            setSelectedFav(true)
        }
    },[favorites])

    const addRemoveFavorite = () => {     
        const ind = props.favorite.findIndex((fav:Favorite)=>{return fav.name===props.name });
        if(ind===-1){ //select
            favorites.push(...props.favorite,{name:props.name,id:props.id,image:props.image});
            props.editFavorite(favorites);
        }else{//deselect
            if(props.callFrom==='favCard'){
                if(selectedFav){
                    setSelectedFav(false);
                    const list = remove.removeList;
                    list.push(...list,props.name)
                    remove.removingPokemons(list)
                }else{
                    setSelectedFav(true);
                    let list = remove.removeList;
                    list = list.filter((name:string)=>{return name!==props.name});
                    remove.removingPokemons(list);
                }
            }else{
                favorites=props.favorite.filter((fav:Favorite)=>{return fav.name!==props.name});
                props.editFavorite(favorites);
            }
        }
    }

    return(
        <div className={`${props.callFrom==='favCard'?'heart-icon-Fav': props.callFrom=='pokCard'?'heart-icon':'heart-icon-switch'}`} onClick={addRemoveFavorite}>
            <i className={`material-symbols-outlined ${selectedFav?"icon-red":"light-dark-red icon-gray"}`}>favorite</i>
        </div>
    )
}