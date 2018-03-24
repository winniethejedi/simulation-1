import React, { Component } from 'react';
import { Switch, Route} from 'react-router-dom';
import App from './App';
import ShelfA from './Components/ShelfA';
import ShelfB from './Components/ShelfB';
import ShelfC from './Components/ShelfC';
import ShelfD from './Components/ShelfD';



export default (
        <Switch>
            <Route exact path='/' component={ App } />
            <Route path='/bins/A' component={ ShelfA } />
            <Route path='/bins/B' component={ ShelfB } />
            <Route path='/bins/C' component={ ShelfC } />
            <Route path='/bins/D' component={ ShelfD } />
        </Switch>
)