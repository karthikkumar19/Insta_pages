import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    pages:[],
    loading:false,
    purchased:false
}
// const purchaseInit = (state) => {
//     return updateObject(state,{purchased:false});
// }
const addPageStart = (state) => {
    return updateObject(state,{loading:true});
}
const addPageSuccess = (state,action) =>{
    const newPage = updateObject(action.pageData,{id:action.pageId});
    return updateObject(state,{
        loading:false,
        purchased:true,
        pages:state.pages.concat(newPage)
    });
}
const addPageFail = (state) => {
    return updateObject(state,{loading:false});
}
const fetchPagesStart = (state) => {
    return updateObject(state,{loading:true});
}
const fetchPagesSuccess = (state,action) => {
    return updateObject(state, {
        pages:action.pages,
        loading:false,
    });
}
const fetchPagesFail = (state) => {
    return updateObject(state,{loading:false});
}

const orderReducer = (state = initialState, action) =>{
    switch (action.type){
        // case actionTypes.PURCHASE_INIT:return purchaseInit(state);
        case actionTypes.ADD_PAGE_START:return addPageStart(state);
        case actionTypes.ADD_PAGE_SUCCESS:return addPageSuccess(state,action);
        case actionTypes.ADD_PAGE_FAIL:return addPageFail(state);
        case actionTypes.FETCH_PAGES_START:return fetchPagesStart(state);
        case actionTypes.FETCH_PAGES_SUCCESS:return fetchPagesSuccess(state,action);  
        case actionTypes.FETCH_PAGES_FAIL:return fetchPagesFail(state);
        default :
        return state;
    }
}

export default orderReducer;