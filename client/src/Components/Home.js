import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeComponent } from '../Redux/Actions/action';
import Header from './Header';

class Home extends Component {
  
  componentWillMount(){
    this.props.changeComponent('home');
  }
  render() {
    return (
      <div className="App">
         <Header/>
         <Link to='/bins/A'><div className='shelf-button'><h1 className='shelf-button-title'>Shelf A</h1></div></Link>
         <Link to='/bins/B'><div className='shelf-button'><h1 className='shelf-button-title'>Shelf B</h1></div></Link>
         <Link to='/bins/C'><div className='shelf-button'><h1 className='shelf-button-title'>Shelf C</h1></div></Link>
         <Link to='/bins/D'><div className='shelf-button'><h1 className='shelf-button-title'>Shelf D</h1></div></Link>
      </div>
    );
  }
}

export default connect(null, {changeComponent: changeComponent})(Home);