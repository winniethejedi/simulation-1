import { CHANGE_COMPONENT, UPDATE_BIN_ID, UPDATE_SHELF_ID} from '../Actions/constraints';
import { combineReducers } from 'redux';

function viewedComponent (state ='home', action){
    switch(action.type){
        case CHANGE_COMPONENT :
            return state = action.payload;
    default:
        return state;
    }
};

function updatedBinId (state = '', action){
    switch(action.type){
        case UPDATE_BIN_ID :
            return state = action.payload;
        default:
            return state;
    }
};

function updatedShelfId (state = '', action){
    switch(action.type){
        case UPDATE_SHELF_ID :
            return state = action.payload;
        default:
            return state;
    }
};

const rootReducer = combineReducers({viewedComponent, updatedBinId, updatedShelfId});

export default rootReducer;