import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { logout, deactivate } from '../../actions/auth'

const Navbar = ({ auth: {isAuthed, loading }, logout }) => {
    const navMenu = [ "Home", "Search"]
    const navStyle = {
        color:"white",
        fontWeight: "600"
    }
    const authLinks = (
        <div className="navbar-nav ml-auto">
            {
                navMenu.map((navItem, index) => {
                    return <Link key={`${index}`} className="nav-item nav-link" to={`/${navItem.toLowerCase()}`} style={navStyle} >{navItem}</Link>
                })
            }
 
            <div className="dropdown">
                <a className="nav-item nav-link dropdown-toggle text-white" 
                    id="userDropdown" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false" href="#user" style={navStyle}>Settings</a>
                
                <ul className="dropdown-menu" aria-labelledby="userDropdown">                           
                    <Link  className="dropdown-item" to="/" onClick={deactivate}>Delete Account</Link>
                    <Link className="dropdown-item" to="/" onClick={logout}>Logout</Link>
                </ul>    
            </div>
             
        </div>    
    );
  
    return (
        <nav className="navbar navbar-expand-sm" style={{background:"#F56600"}}>
            <div className="container">
                <Link to="/" className="navbar-brand" style={navStyle} > MovieBytes </Link>
            
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                
                {
                    !loading && (  isAuthed ? authLinks : null )
                }
                
            </div> 
            </div> 
        </nav> 
    )
}
Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    deactivate: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, {logout, deactivate})(Navbar)