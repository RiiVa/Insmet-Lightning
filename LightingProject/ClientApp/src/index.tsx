import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, Switch,Redirect} from 'react-router-dom'
import Maps from './components/liveMaps'
import {store} from './redux/store'
import Login from './components/Login/SignIn'
import {history} from './_helpers/history';

const Root = (
    <Provider store= {store}>
    <Router history={history}>
        <Switch>
            
                
                <Route exact path= "/" render={()=>(localStorage.getItem('user')?<Maps/>:<Redirect to="/login"/>)} />
                
                <Route path= "/login" component = {Login} />
            

        </Switch>
    </Router>
    </Provider>
);
console.log(localStorage.getItem('user'))
ReactDOM.render(Root, document.getElementById('root'));