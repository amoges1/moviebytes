import React, {useState} from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import SResult from './SResult'
import { setAlert } from '../../actions/alert';
import Alert from '../layout/Alert';

const Search = () => {
    
    //set initial state using hook
    const [currState, setCurrState] = useState({
        movie:'',
        results: []
    })
    
    const { movie, results } = currState;

    const onChange = e => setCurrState({...currState, [e.target.name]: e.target.value})

    const onSubmit = async e => {
        e.preventDefault()
        const query = `https://www.omdbapi.com/?apikey=93ad5a12&s=${movie}&plot=full`
        const data = await fetch(query).then(res => res.json()) 
               
        if(data.Response === "True") {
            setCurrState({...currState, results: data.Search})
        } else {
            setAlert("hello", 'danger')
            console.error(data.Error);   
        }
    }

    return (

        <div className="container pt-3 border-bottom">
            <form onSubmit={e => onSubmit(e)}>
                <Alert />
                <div className="form-group">
                    <h4 className="p-2 text-center font-weight-bold">Find your favorite movies!</h4>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Ex: Star Wars" name="movie" id="term" value={movie} onChange={e => onChange(e)} required/>
                        <div className="input-group-append">
                            <button type="submit" className="btn text-white font-weight-bold" style={{background:"#F56600"}}>Search</button>
                        </div>
                    </div>
                    <p className="text-center"><em>Powered by OMDb API</em></p>
                </div>
            </form>
        { results.length ? (
            <div className="row row-eq-height">
            {
                results.map( (movie, id) => {
                    return <SResult movie={movie} key={id}/>
                })
            }
        </div>
            ) : null}
        </div>

 
        
    )
}

Search.propTypes = {
    setAlert: PropTypes.func.isRequired
}

export default connect(null, {setAlert})(Search)