import React from 'react'
import axios from 'axios'

const addMovieToUser = (e) => {
    e.preventDefault()
    console.log(e.target.dataset)
    const { title, poster, year } = e.target.dataset
    
    //Send API call here
    axios
    
}

const SResult = ({movie, index}) => {

    
    return (
        <div className="p-1" >
            <div className="card p-1" index={`${index}`}>
                <div className="card-header" style={{background:"#F56600"}}>
                    <div>
                        <h6 className="d-inline" >{movie.Title}
                            <span className="badge badge-primary float-right">{movie.Year}</span>
                        </h6>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row text-center">
                        <img src={`${movie.Poster}`}  style={{width: "15rem"}}className="thumbnail img-responsive" />
                    </div>
                </div>
                <div className="card-footer" style={{background:"#F56600"}}>
                    <h4 className="d-inline">
                        <button className="btn btn-primary btn-sm font-weight-bold float-right" data-title={`${movie.Title}`}data-poster={`${movie.Poster}`}data-year={`${movie.Year}`}onClick={(e) => addMovieToUser(e)}>Add</button>
                    </h4>
                </div>
            </div>
        </div>
    )
}

export default SResult