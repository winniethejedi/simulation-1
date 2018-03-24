import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Shelf from './Components/Shelf';
import Bin from './Components/Bin';
import NewBin from './Components/NewBin';

class App extends Component {
constructor(props) {
  super(props);

  this.state = {
    newBin: {},
    name: '',
    price: '',
    deletedBin: {}
  };
};
  render() {
    return (
          <Router>
            <Switch>
              <Route exact path='/' component={ Home } />
              <Route path='/bins/:id' component={ Shelf } />
              <Route path='/bin/:id' component={ Bin }/>
              <Route path='/create/:id' component={ NewBin } />
            </Switch>
          </Router>
    );
  }
}

export default App;
