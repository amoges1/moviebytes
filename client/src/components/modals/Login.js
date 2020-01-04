import React,  {useState} from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { login } from '../../actions/auth'
import Alert from '../layout/Alert';

//login is prop passed
const Login = ({login, isAuthed }) => {
    const [formData, setFormData] = useState({
        email:'',//set initState
        password: '',
    }); //using Hook replaces traditional state

    const { email, password } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = async e => {
        e.preventDefault()
        login(email, password)
    }

    // Redirect if logged in
    if(isAuthed) {
        const modalBackdrop = document.getElementsByClassName("modal-backdrop show")
        modalBackdrop[0].removeAttribute("class")
        return <Redirect to="/home" />
    }
    return (
        <div className="modal" id="login">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header" style={{background:"#F56600"}}>
                        <h4 className="modal-title text-white">Create Account</h4>
                        <button type="button" className="close text-white" data-dismiss="modal">&times;</button>
                    </div>
    
                    <div className="modal-body">
                        <form onSubmit={ e => onSubmit(e)}>
                            <Alert />
                            <div className="form-group">
                                <label htmlFor="email">Email address:</label>
                                <input type="email" className="form-control" placeholder="Enter email" id="semail" name="email" value={email} onChange={ e=> onChange(e)} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input type="password" className="form-control" placeholder="Enter password" id="spassword" name="password" value={password} onChange={ e=> onChange(e)} required/>
                            </div>
                            <div className="modal-footer p-0" style={{background:"#F56600"}}>
                                <button type="submit" className="btn btn-primary btn-success">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div> 

    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthed: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthed: state.auth.isAuthed //refers to /reducers/initStates
})

export default connect(mapStateToProps, { login })(Login)