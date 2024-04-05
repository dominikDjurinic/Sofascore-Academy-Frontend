export function ScrollToTop(){
    return(
        <div className="topScroll-div" onClick={()=> window.scrollTo({top: 0, behavior: 'smooth'})}><i className="material-icons icon-white" id="close-x">expand_less</i></div>
    )
}