import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types' 
import { updateMovieReview } from '../../actions/movies';

const handleMovieUpdates = (e, updateMovieReview) => {
    e.preventDefault()
    const movieID = e.target.dataset.key
    const updates = {
        score: document.querySelector(`[data-score="${movieID}"]`).value,
        review: document.querySelector(`[data-review="${movieID}"]`).value
    }

    updateMovieReview(movieID, updates)   
}

const Home = ({movies: {movies}, updateMovieReview}) => {
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
                                                <h5 className="d-inline">{movie.title}                    </h5>
                                            </div>
                                        </div>
                                        <div className="card-body" style={{backgroundImage: `${movie.poster}`}}>
                                            <div className="row justify-content-around">
                                                <div className="p-2 col-xs-5">
                                                    <img src={movie.poster} width="125rem" alt="" />
                                                </div>
                                                <div className="col-xs-7 rating text-center">
                                                    <form>
                                                        <div className="form-group">
                                                            <label><h6>My Review:</h6></label>
                                                            <select className="form-control" data-score={`${movie._id}`} defaultValue={`${movie.score}`}>
                                                                <option>1</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                                <option>4</option>
                                                                <option>5</option>
                                                            </select>
                                                            <br/>
                                                            <textarea className="form-control" rows="3" data-review={`${movie._id}`}defaultValue={`${movie.review || ""}`}>
                                                            </textarea>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer" style={{background:"#F56600"}}>
                                            <h5 className="d-inline"><span className="badge badge-success">{movie.year}</span></h5>
                                            <h5 className="d-inline"><span className="badge badge-primary">Watched</span></h5>
                                            <h4 className="d-inline">
                                                <button className="btn btn-primary btn-sm font-weight-bold float-right" onClick={(e) => handleMovieUpdates(e, updateMovieReview)} data-key={`${movie._id}`}>Save</button>
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
    movies: PropTypes.object.isRequired,
    updateMovieReview: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    movies: state.movies
})

export default connect(mapStateToProps, {updateMovieReview})(Home)