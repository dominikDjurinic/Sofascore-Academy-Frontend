import '../styles/Type.css'

export function Type(props: {type:string}){
    return(
        <div className={`type-div ${props.type}`}>{props.type}</div>
    )
}