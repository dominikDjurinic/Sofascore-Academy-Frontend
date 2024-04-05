import { createContext } from "react"

const ThemeContext = createContext({
    theme: "",
    changeTheme: () => {}
})

export default ThemeContext;