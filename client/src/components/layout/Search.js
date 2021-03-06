import React, {useState} from 'react'
import { connect } from 'react-redux';
import SResult from './SResult'


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
            alert(data.Error);   
        }
    }

    return (

        <div className="container border-bottom">
            <form onSubmit={e => onSubmit(e)}>
               
                <div className="container-fluid p-3 mt-2">
                    <h1 className="display-5 text-center">Find Your Movies</h1>
                </div>
                <div className="form-group">
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


export default connect(null, {})(Search)