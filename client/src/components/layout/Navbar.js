import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'

const Navbar = ({ auth: {isAuthed, loading }, logout }) => {
    const authLinks = (
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link className="nav-link" to="/home" style={{background:"#F56600", color:"white"}} >Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/search" style={{background:"#F56600", color:"white"}} >Search</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/" style={{background:"#F56600", color:"white"}} onClick={logout}>Logout</Link>
            </li>  
        </ul>    
    );
  
    return (
        <nav className="navbar navbar-expand-md bg-dark navbar-dark">
            <a className="navbar-brand">MovieBytes </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                {
                    !loading && (  isAuthed ? authLinks : null )
                }
            </div>  
        </nav> 
    )
}
Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, {logout})(Navbar)