import React from 'react'
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-md bg-dark navbar-dark">
            <a className="navbar-brand">MovieBytes </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="home.html" style={{background:"#F56600", color:"white"}} >Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="search.html" style={{background:"#F56600", color:"white"}} >Search</a>
                    </li> 
                </ul>    
            </div>  
        </nav> 
    )
}

export default Navbar