import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Container from './ui/Container'
import List from './ui/List'

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path='/' exact component={Container} />
                    <Route path='/list' component={List} />
                </div>
            </Router>
        );
    }
}

export default App;
