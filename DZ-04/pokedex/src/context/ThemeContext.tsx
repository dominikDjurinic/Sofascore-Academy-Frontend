import { createContext } from "react"

const ThemeContext = createContext({        //CONTEXT - globalni pristup podacima o temi od svih komponenti, izbjegavamo prop drilling
    theme: "",
    changeTheme: () => {}
})

export default ThemeContext;