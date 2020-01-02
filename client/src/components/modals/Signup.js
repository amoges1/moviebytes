import React, {useState} from 'react';
//import axios from 'axios';

const Signup = () => {
    //formData to store all field values (state)
    //setForm to update formdata (update state)
    const [formData, setFormData] = useState({
        name:'', 
        email:'',//set initState
        password: '',
        password2: ''
    }); //using Hook replaces traditional state

    const { name, email, password, password2 } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = async e => {
        //state accessible from const {} = formdata
        e.preventDefault();
        if(password !== password2) {
            console.log("Passwords don't match");
        } else {
            console.log('SUCCESS');
            
            // Below is used if not using Redux action
            // const newUser = {
            //     name, email, password
            // }
            // try {
            //     const config = {
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     }

            //     const body = JSON.stringify(newUser)
            //     const res = await axios.post('/api/users', body, config)
            //     console.log(res.data); //should receive token!
                
            // } catch (err) {
            //     console.error();
            // }
        }
    }
    return (
        <div className="modal" id="signup">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header" style={{background:"#F56600"}}>
                        <h4 className="modal-title text-white">Create Account</h4>
                        <button type="button" className="close text-white" data-dismiss="modal">&times;</button>
                    </div>

                    <div className="modal-body">
                        <form  onSubmit={e => onSubmit(e)}>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input type="name" className="form-control" placeholder="Enter name" id="name" name="name" value={name} onChange={e => onChange(e)} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email address:</label>
                                <input type="email" className="form-control" placeholder="Enter email" id="email" name="email" value={email} onChange={e => onChange(e)} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input type="password" className="form-control" placeholder="Enter password" minLength="6" id="password" name="password" value={password} onChange={e => onChange(e)} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password2">Confirm Password:</label>
                                <input type="password" className="form-control" placeholder="Enter password" id="password2" minLength="6" name="password2" value={password2} onChange={e => onChange(e)} required />
                            </div>
                            <div className="modal-footer p-0" style={{background:"#F56600"}}>
                                <button type="submit" className="btn btn-primary btn-success">Signup</button>
                            </div>
                        </form>
                    </div>
                

                </div>
            </div>
        </div> 
    )
}

export default Signup