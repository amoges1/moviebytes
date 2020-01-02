import React from 'react'
import inception from '../img/inception.jpg';
import justice_league from '../img/justice_league.jpg';
import rushhour_3 from '../img/rushhour_3.jpg';
import star_wars_dv from '../img/star_wars_dv.jpg';
import ipman_2 from '../img/ipman_2.jpg';
import SignupModal from '../modals/Signup'
import LoginModal from '../modals/Login'

const Landing = () => {
    const heroStyle = {
        textAlign: "center",
        position: "absolute",
        top: "75%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "white",
        zIndex: "2"
    }
    return (
       <div>
            <div className="container-fluid p-0">
                <div id="movies_list" className="carousel slide" data-ride="carousel">    
                    <div className="hero-text" style={heroStyle}>
                        <button type="button" className="btn btn-dark text-white font-weight-bold" style={{background:"#F56600"}} data-toggle="modal" data-target="#signup">Signup</button>
                        <button type="button"className="btn btn-dark text-white font-weight-bold" style={{background:"#F56600"}} data-toggle="modal" data-target="#login">Login</button>
                    </div>
                    <div className="carousel-inner" style={{backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", position: "relative"}}>
                        <div className="carousel-item active">
                            <img src={inception} alt="Inception" width="100%"/>
                        </div>
                        <div className="carousel-item">
                            <img src={justice_league} alt="Justice_League" width="100%"/>
                        </div>
                        <div className="carousel-item">
                            <img src={rushhour_3} alt="RushHour_3" width="100%"/>
                        </div>
                        <div className="carousel-item">
                            <img src={star_wars_dv} alt="Star_Wars_DV" width="100%"/>
                        </div>
                        <div className="carousel-item">
                            <img src={ipman_2} alt="IPMan_2" width="100%"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid p-3">
                <div className="row">
                    <div className="col-md-4 text-center">
                        <h3 className="display-5">Create Account</h3>
                        <p>Sign up today to list your favorite-seen or not seen movies.</p>
                    </div>
                    <div className="col-md-4 text-center">
                        <h3 className="display-5">Search Movies</h3>
                        <p>Find relevant movie information powered by OMDb API.</p>
                    </div>
                    <div className="col-md-4 text-center">
                        <h3 className="display-5">Review Selections</h3>
                        <p>Write personal reviews as you continue your movie watching journey.</p>
                    </div>
                </div>
            </div>
            <SignupModal />
            <LoginModal />
        </div>
    )
}

export default Landing