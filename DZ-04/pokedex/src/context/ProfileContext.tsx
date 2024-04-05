import { createContext } from "react"

const ProfileContext = createContext({
    username: "",
    changeUsername: (user:string) => {user}
})

export default ProfileContext;