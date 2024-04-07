import { createContext } from "react"

const RemoveContext = createContext({           //CONTEXT - globalni pristup podacima o dislike pokemonima iz Modal komponente
    removeList: ['',''],
    removingPokemons: (remove:string[]) => {remove}
})

export default RemoveContext;