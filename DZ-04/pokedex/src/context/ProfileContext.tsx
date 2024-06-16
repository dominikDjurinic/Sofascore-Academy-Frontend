import { createContext } from "react"

const ProfileContext = createContext({      //CONTEXT - globalni pristup username
    username: "",
    changeUsername: (user:string) => {user}
})

export default ProfileContext;