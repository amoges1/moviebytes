import React from 'react'

const SResult = ({movie, index}) => {

    
    return (
        <div className="p-1">
        <div className="card p-1" index={`${index}`}>
            <div className="card-header" style={{background:"#F56600"}}>
                <div>
                    <h6 className="d-inline">{movie.Title}
    <span className="badge badge-primary float-right">{movie.Year}</span>
                    </h6>
                </div>
            </div>
            <div className="card-body">
                <div className="row text-center">
                    <img src={`${movie.Poster}`} alt={`${movie.Poster}`} style={{width: "15rem"}}className="thumbnail img-responsive" />
                </div>
            </div>
            <div className="card-footer" style={{background:"#F56600"}}>
                <h4 className="d-inline">
                    <button className="btn btn-primary btn-sm font-weight-bold float-right">Add</button>
                </h4>
            </div>
        </div>
        </div>
    )
}

export default SResult