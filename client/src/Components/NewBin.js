import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { changeComponent, updateBinId } from '../Redux/Actions/action';
import Header from './Header';

class Bin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bin: {},
            id: '',
            shelfId: '',
            binId: '',
            name: '',
            price:'',
            addedBin: {},
        }
    }

    componentWillMount() {
        this.props.changeComponent('new-bin');
        this.props.updateBinId(this.props.match.params.id.substr(1, 1));
        this.setState({
            id: this.props.match.params.id,
            shelfId: this.props.match.params.id.substr(0, 1),
            binId: this.props.match.params.id.substr(1, 1)
        })
            axios
            .get(`//localhost:8000/api/bin/${ this.props.match.params.id }`)
            .then(res => {
                this.setState({
                    bin: res.data
                })
            })
    }
    render() {

        return (
            <div>
                <Header/>
                <div className='new-bin-body' >
                    <img src="http://lorempixel.com/200/200/business/" alt="Awesome!" className='business-image' />
                    <div className='input-div' >
                        <p className ='name-title' >Name</p><br/>
                        <input type="text" onChange={e => this.onInputChange('name', e.target.value)} /><br/>
                    </div>
                    <div className='input-div' >
                        <p className='price-title' >Price</p><br/>
                        <input type="number" onChange={e => this.onInputChange('price', e.target.value)} /><br/>
                    </div>
                    <div className='add-inventory' onClick={e => this.clickOnAdd()} >
                        <h2 className='add-inventory-title' >+ Add Inventory</h2>
                    </div>
                </div>
            </div>
        )
    }
    onInputChange(input, value) {
        this.setState({
            [input]: value
        })
    }

    clickOnAdd() {
        axios
            .post(`//localhost:8000/api/bin/${ this.state.id }`, {
                name: this.state.name,
                binId: this.state.binId,
                id: this.state.id,
                price: this.state.price,
                shelfId: this.state.shelfId
            })
            .then(res => {
                this.props.history.push(`/bins/${this.state.shelfId}`);
            })
    }
}

export default connect(null, {changeComponent: changeComponent, updateBinId: updateBinId})(Bin);