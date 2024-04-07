import '../styles/Type.css'

export function Type(props: {type:string}){    //tipovi pokemona
    return(
        <div className={`type-div ${props.type}`}>{props.type}</div>
    )
}