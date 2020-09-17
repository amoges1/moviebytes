import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addMovieToUser } from '../../actions/movies'

const SResult = ({movie, addMovieToUser}) => {
    
    return (
        <div className="col-md-4 p-3" key={`${movie._id}`}>
            <div className="card">
                <div className="card-header" style={{background: "#F56600"}}>
                <div>
                    <h5 className="d-inline">{movie.Title} </h5>
                </div>
            </div>
            <div className="card-body" style={{backgroundImage: `${movie.poster}`}}>
                <div className="row justify-content-around">
                    <div className="p-2 col-xs-5">
                        <img src={movie.Poster} width="125rem" alt="" />
                    </div>
                </div>
            </div>
            <div className="card-footer" style={{background:"#F56600"}}>
                <h5 className="d-inline"><span className="badge badge-primary">{movie.Year}</span></h5>
                <h4 className="d-inline">
                    <button className="btn btn-success btn-sm font-weight-bold float-right" data-title={`${movie.Title}`} data-poster={`${movie.Poster}`} data-year={`${movie.Year}`} onClick={(e) => addMovieToUser(e.target.dataset)}>Add</button>                
                </h4>
            </div>
        </div>
     </div>
    )
}

SResult.propTypes = {
    addMovieToUser: PropTypes.func.isRequired
}

export default connect(null, {addMovieToUser}) (SResult)