import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import '../App.css';
import { connect } from 'react-redux';


class Header extends Component {
  render() {
    if (this.props.viewedComponent === 'bin' || this.props.viewedComponent === 'new-bin') {
        return (
            <div>
                <header className="bin-header">
                    <div className='bin-logo-div' >
                        <Link to='/'>
                        <img src={logo} className="bin-logo" alt="logo" />
                        </Link>
                    </div>
                    <div className='bin-shelf-title-div' >
                        <Link to={`/bins/${this.props.updatedShelfId}`}>
                        <h1 className="bin-shelf-title">Shelf { this.props.updatedShelfId }</h1>
                        </Link>
                    </div>
                    <div className='bin-title-div' >
                        <h1 className='bin-title' >Bin { this.props.updatedBinId }</h1>
                    </div>
                </header>
             </div>
        )
    }
    else if (this.props.viewedComponent === 'shelf') {
        return (
            <div>
                <header className="shelf-header">
                    <Link to='/'>
                        <div className='shelf-logo-div' >
                            <img src={logo} className="shelf-logo" alt="logo" />
                        </div>
                    </Link>
                    <h1 className="shelf-title">Shelf {this.props.updatedShelfId}</h1>
                </header>
            </div>
        )
    }
    else return (
        <div>
            <header className="App-header">
                <img src={logo} className="logo" alt="logo" />
                <h1 className="App-title">SHELFIE</h1>
            </header>
        </div>

    );
  }
}

function mapStateToProps(state){
    return {
        viewedComponent: state.viewedComponent,
        updatedBinId: state.updatedBinId,
        updatedShelfId: state.updatedShelfId
    }
};

export default connect(mapStateToProps)(Header);