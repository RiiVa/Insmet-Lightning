import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Maps from './components/liveMaps'
import {store} from './redux/store'

const Root = (
    <Provider store= {store}>
    <BrowserRouter>
        <Switch>
            <Route path= "/" component = {Maps} />
        </Switch>
    </BrowserRouter>
    </Provider>
);

ReactDOM.render(Root, document.getElementById('root'));