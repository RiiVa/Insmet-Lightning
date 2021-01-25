import React, { Component } from 'react';
import Page from './page'
import { connect } from 'react-redux'


class Maps extends Component {
    

    
    render() {
        console.log(this.props)
        return (
            <Page />
        );
    }
}

export default Maps;