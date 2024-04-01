export function ScrollToTop(){
    return(
        <div className="topScroll-div" onClick={()=> window.scrollTo(0,0)}><i className="material-icons icon-white" id="close-x">expand_less</i></div>
    )
}