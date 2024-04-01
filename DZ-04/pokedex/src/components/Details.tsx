import { useEffect, useState } from "react";

interface LanguageItem{
    name: string
}

interface FlavorTextItem {
    flavor_text: string
    language: LanguageItem
}

interface PokemonDetails{
    flavor_text_entries: FlavorTextItem[]
}

export function Details(props: {url:string}){

    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails|undefined>(undefined);

    useEffect(() => {

        const fetchFlavorText = async () => {       //dohvat podataka s opisom pokemona s URI-ja
            try {
                const jsonResponse = await (await fetch(`${props.url}`)).json()
                setPokemonDetails(jsonResponse);
            } catch (e) {
                console.error(e)
            }
        }

        fetchFlavorText();
    },[])
    
    if (!pokemonDetails) {
        return null
    }

    //provjera je li tekst na engleskom jeziku
    function engText(){
        const n = pokemonDetails?.flavor_text_entries.length;
        if(n===undefined){
            return
        }
        for(let i=0;i<n;i++){
            if(pokemonDetails?.flavor_text_entries[i].language.name === "en"){
                return pokemonDetails.flavor_text_entries[i].flavor_text.replace('\f',' ');
            }
        }
        return "No english text."
    }

    return(
        <p>Deatils: <span>{engText()}</span></p>
    )
}

