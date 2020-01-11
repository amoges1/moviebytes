import React, {useState} from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'


import SResult from './SResult'

import axios from 'axios'
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
        const query = `http://www.omdbapi.com/?apikey=93ad5a12&s=${movie}&plot=full`

        const data = await fetch(query).then(res => res.json()) 
        console.log(data);
        
        if(data.Response === "True") {
            setCurrState({...currState, results: data.Search})
        } else {
            setAlert("hello", 'danger')
            console.error(data.Error);
            
        }
        console.log(results);
        

    }

    return (

        <div className="container pt-3 ">
            <form onSubmit={e => onSubmit(e)}>
                <Alert />
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Ex: Star Wars" name="movie" value={movie} onChange={e => onChange(e)} required/>
                    <div className="input-group-append">
                        <button type="submit" className="btn btn-primary">Search</button>
                    </div>
                </div>
                <p className="text-center">Powered by OMDb API</p>
            </form>
        { results.length ? (
            <div className="row">
            {
                results.map( (movie, id) => {
                    return <SResult movie={movie} key={id} index={id}/>
                })
            }
        </div>
            ) : (
                <div><p>I'm waiting for your search!!</p></div>
            )}
        </div>

 
        
    )
}

Search.propTypes = {
    setAlert: PropTypes.func.isRequired
}

export default connect(null, {setAlert})(Search)