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
            editMode: [false],
            name: '',
            price: '',
            deletedBin: {},
        }
    }

    componentWillMount() {
        this.props.changeComponent('bin');
        this.props.updateBinId(this.props.match.params.id.substr(1, 1));
        this.setState({
            id: this.props.match.params.id,
            shelfId: this.props.match.params.id.substr(0, 1),
            binId: this.props.match.params.id.substr(1, 1)
        })
            axios
            .get(`//localhost:4000/api/bin/${ this.props.match.params.id }`)
            .then(res => {
                this.setState({
                    bin: res.data,
                    name: res.data.name,
                    price: res.data.price
                })
            })
    }
    render() {
        const editOrSave = this.state.editMode
            .map((value, i) => {
                if (this.state.editMode[i] === false) {
                    return <div key='edit' > 
                        <img src="http://lorempixel.com/200/200/business/" alt="Awesome!" className='business-image' />
                        <div className='input-div' >
                            <p className ='name-title' >Name</p>
                            <input type="text" readOnly='readonly' className='edit-mode-input' placeholder={ this.state.bin.name } /><br/>
                        </div>
                        <div className='input-div' >
                            <p className='price-title' >Price</p>
                            <input type="number" readOnly='readonly' className='edit-mode-input' placeholder={ this.state.bin.price } />
                        </div>
                    </div>
                }
                else return <div key='save'> 
                    <img src="http://lorempixel.com/200/200/business/" alt="Awesome!" className='business-image' />
                    <div className='input-div' >
                        <p className ='name-title' >Name</p>
                        <input type="text" placeholder={ this.state.bin.name } onChange={e => this.onInputChange('name', e.target.value)} /><br/>
                    </div>
                    <div className='input-div' >
                        <p className='price-title' >Price</p>
                        <input type="number" placeholder={ this.state.bin.price } onChange={e => this.onInputChange('price', e.target.value)} />
                    </div>
                </div>
            })
            const editOrSaveButton = this.state.editMode
            .map((value, i) => {
                if (this.state.editMode[i] === false) {
                    return <div className='small-button' key='edit' onClick={e => this.clickOnEdit()} >
                            <h3 className='small-button-title' >EDIT</h3>
                        </div>
                }
                else return <div key='save' className='small-button' onClick={e => this.clickOnSave()}>
                    <h3 className='small-button-title' id='save-button-title'  >SAVE</h3>
                </div>
        
            })
        return (
            <div className='bin-all' >
                <div className='bin-header-div' >
                  <Header/>
                </div>
                    <div className='edit-save-delete-div' >
                        <div className='edit-save-div' >{ editOrSave }</div>
                        <div className='edit-save-delete-buttons' >
                            {editOrSaveButton}
                            <div className='small-button' onClick={e => this.clickOnDelete()} ><h3 className='small-button-title' >DELETE</h3></div>
                        </div>
                    </div>
            </div>
        )
    }

    clickOnEdit() {
        this.setState({
            editMode: [true]
        })
    }

    clickOnSave() {
        axios
        .put(`//localhost:4000/api/bin/${ this.state.id }`, {
            name: this.state.name,
            binId: this.state.binId,
            id: this.state.id,
            price: this.state.price,
            shelfId: this.state.shelfId
        })
        .then(res => {
            this.setState({
                name: res.data.name,
                price: res.data.price,
                editMode: [false]
            })
            axios
            .get(`//localhost:4000/api/bin/${ this.props.match.params.id }`)
            .then(res => {
                this.setState({
                    bin: res.data
                })
            })
        })

    }

    clickOnDelete() {
        axios
        .delete(`//localhost:4000/api/bin/${ this.state.id }`)
        .then(res => {
            this.props.history.push(`/bins/${this.state.shelfId}`);
        })
    }

    onInputChange(input, value) {
        this.setState({
            [input]: value
        })
    }
}

export default connect(null, {changeComponent: changeComponent, updateBinId: updateBinId})(Bin);