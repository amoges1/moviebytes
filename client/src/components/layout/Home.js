import React from 'react'
import starwars_check from '../img/starwars_check.jpg'
const Home = () => {
    return (
        <div>
            <div className="container-fluid p-3" style={{background: "#111111"}}>
                <h1 className="display-3 text-white text-center">
                    Movie Collection
                </h1>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-6 p-3">
                        <div className="card">
                            <div className="card-header" style={{background: "#F56600"}}>
                                <div>
                                    <h4 className="d-inline">Title
                                        <span className="badge badge-primary float-right">45</span>
                                    </h4>
                                    
                                </div>
                                <div>
                                    <h6 className="d-inline">Director
                                        <span className="badge badge-success float-right">PG</span>
                                    </h6>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="container">
                                        <img src={starwars_check} width="100rem" alt="image" />
                                        <div >
                                            <h6 className="d-inline">Production: </h6>
                                            <p>20th Century Fox</p>    
                                        </div>
                                        <br/>
                                        <div>
                                            <h6>Runtime:</h6>
                                            <p>90 min</p>  
                                        </div>
                                        <div>
                                            <h6 >Released: </h6>
                                            <p>30 Jan 2009</p>     
                                        </div>
                                    </div>
                                    <div className="container">
                                        <div>
                                            <h6 className="d-inline">Plot: </h6>
                                            <p className="d-inline">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium adipisci cupiditate perspiciatis molestiae sit earum, quam similique, saepe itaque dolore vitae fuga quaerat aliquam in veniam! Labore nobis atque officiis?</p> 
                                        </div>
                                    </div>
                                </div>
                                    <div className="rating">
                                        <h5 className="text-center">Ratings</h5>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <p>Internet Movie Database
                                                    <span className="badge badge-primary">80</span>
                                                </p>
                                            </div>
                                            <div className="col-md-4">
                                                <p>Rotten Tomatoes
                                                    <span className="badge badge-primary">7</span>
                                                </p>
                                            </div>
                                            <div className="col-md-4">
                                                <p>Metacritic
                                                    <span className="badge badge-primary">90</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="personal">
                                        <h5 className="text-center">Personal</h5>
                                        <form action="#">
                                            <div className="form-group">
                                                <label htmlFor="score">My Score:</label>
                                                <select className="form-control" id="score">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>

                                                <label htmlFor="review">My Review:</label>
                                                <textarea className="form-control" id="review" rows="3"></textarea>
                                            </div>
                                        </form>
                                        
                                    </div>
                     
                                
                            </div>
                            <div className="card-footer" style={{background:"#F56600"}}>
                                <h5 className="d-inline"><span className="badge badge-success">Watched</span></h5>
                                <h4 className="d-inline">
                                    <button className="btn btn-primary btn-sm font-weight-bold float-right">Update</button>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home