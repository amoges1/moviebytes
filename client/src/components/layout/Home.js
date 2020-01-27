import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types' 




const Home = ({movies: {movies}}) => {
    console.log("MADE IT",movies);

    return (
        <div>
            <div className="container-fluid p-3" style={{background: "#111111"}}>
                <h1 className="display-3 text-white text-center">
                    Movie Collection
                </h1>
            </div>

            <div className="container">
                <div className="row">
                    {
                        movies.length === 0 ? (
                            <h1>Add some movies!</h1>
                        ) : (
                            movies.movies.map(movie => {
                                return (
                                    <div className="col-md-6 p-3" key={`${movie._id}`}>
                                        <div className="card">
                                            <div className="card-header" style={{background: "#F56600"}}>
                                            <div>
                                                <h4 className="d-inline">{movie.title}
                                                    <span className="badge badge-primary float-right">45</span>
                                                </h4>
                                            </div>
                                        </div>
                                        <div className="card-body" style={{backgroundImage: `${movie.poster}`}}>
                                            <div className="row">
                                                <div className="container">
                                                    <img src={movie.poster} width="100rem" alt="" />
                                                    <div>
                                                        <h6 >Released: </h6>
                                                        <p>{movie.year}</p>     
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="rating">
                                                <h5 className="text-center">Personal</h5>
                                                <form action="#">
                                                    <div className="form-group">
                                                        <label >My Score:</label>
                                                        <select className="form-control" >
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                            <option>5</option>
                                                        </select>
                                                        <label >My Review:</label>
                                                        <textarea className="form-control" rows="3"></textarea>
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
                            )
                        })
                        ) 
                    }
                    
                </div>
            </div>
        </div>
    )
}

Home.propTypes = {
    movies: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    movies: state.movies
})

export default connect(mapStateToProps)(Home)