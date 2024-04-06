import { createContext } from "react"

const RemoveContext = createContext({
    removeList: ['',''],
    removingPokemons: (remove:string[]) => {remove}
})

export default RemoveContext;