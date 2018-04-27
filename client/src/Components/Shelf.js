import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { changeComponent, updateShelfId } from '../Redux/Actions/action';
import Header from './Header';

class Shelf extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bins: [],
            id: '',
            newBin: {},
            name: '',
            price: '',
            deletedBin: {},
        }
    }

    componentWillMount() {
        this.props.changeComponent('shelf');
        this.props.updateShelfId(this.props.match.params.id);
        this.setState({
            id: this.props.match.params.id,
            newBin: this.props.newBin,
            name: this.props.name,
            price: this.props.price,
            deletedBin: this.props.deletedBin
        })
            axios
            .get(`//localhost:4000/api/shelf/${ this.props.match.params.id }`)
            .then(res => {
                this.setState({
                    bins: res.data,
                })
            })
    }

    render() {
        const id = this.props.match.params.id;
        const bins = this.state.bins
            .map((bin, i) => {
                if (this.state.bins[i] === null || this.state.bins[i] === undefined ) {
                    return <Link to={`/create/${ id }${ i + 1 }`} key ={i}> <div className='unfilled-bin-button' ><h1>+ Add Inventory </h1> </div></Link>;
                }
                else return <Link to={`/bin/${ id }${ i + 1 }`} key={i} ><div className='bin-button' ><h1 className='bin-button-title' >{ this.state.bins[i].name } </h1></div></Link>;
        });
        return (
            <div>
                <Header/>
                <div className='bins-div' >
                { bins }
                </div>
            </div>
        )
    }


}

export default connect(null, {changeComponent: changeComponent, updateShelfId: updateShelfId})(Shelf);