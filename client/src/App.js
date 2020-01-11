import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

// Redux
import { Provider } from 'react-redux'; //connects react w/ redux
import store from './store';
import './App.css';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth'
import Home from './components/layout/Home';
import Search from './components/layout/Search';

if(localStorage.token) {
    setAuthToken(localStorage)
}
//Fragment is ghost element, no show on DOM
const App = () => {
    useEffect( () => { //Hook
        store.dispatch(loadUser())
    }, []) //second param makes it run once, useEffect basically componentDidMount

    return (
    <Provider store={store}>
        <Router>
            <Fragment>
                <Navbar/>
                <Route exact path="/" component={Landing}/>
                    <Switch>
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/search" component={Search} />
                    </Switch>
            </Fragment>
        </Router>
    </Provider>
)}

export default App;
