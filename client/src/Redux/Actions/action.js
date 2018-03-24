import {CHANGE_COMPONENT, UPDATE_SHELF_ID, UPDATE_BIN_ID} from '../Actions/constraints';

export function changeComponent(componentName){
    return {
        type: CHANGE_COMPONENT,
        payload: componentName
    }
}

export function updateShelfId(id) {
    return {
        type: UPDATE_SHELF_ID,
        payload: id
    }
}

export function updateBinId(id) {
    return {
        type: UPDATE_BIN_ID,
        payload: id
    }
}