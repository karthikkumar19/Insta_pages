import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import firebase from '../../firebase';


export const addPageSuccess = (id, pageData) => {
    return{
        type:actionTypes.ADD_PAGE_SUCCESS,
        pageId: id,
        pageData:pageData
    };
};

export const addPageFail = (error) => {
    return{
        type: actionTypes.ADD_PAGE_FAIL,
        error: error
    };
}

export const addPageStart = () =>{
    return{
        type:actionTypes.ADD_PAGE_START
    };
}

export const addPage = (pageData) => {
    return dispatch => {
        dispatch (addPageStart());
        axios.post( '/pages.json', pageData )
        .then( response => {
            dispatch(purchaseBurgerSuccess(response.data.name, pageData));
        } )
        .catch( error => {
            dispatch(purchaseBurgerFail(error));
        } );
    }
}

// export const purchaseInit = () => {
//     return {
//         type:actionTypes.PURCHASE_INIT
//     };
// };

export const fetchPagesSuccess = (pages) => {
    return{
        type:actionTypes.FETCH_PAGES_SUCCESS,
        pages:pages
    };
};

export const fetchPagesFail = (error) =>{
    return{
        type:actionTypes.FETCH_PAGES_FAIL,
        error:error
    };
};

export const fetchPagesStart = () => {
    return{
        type:actionTypes.FETCH_PAGES_START
    };
};

export const fetchPage = ( ) => {
    return dispatch => {
        dispatch(fetchPagesStart());
        // const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        const wordRef = firebase.database().ref('pages');
    wordRef.on('value', (snapshot) => {
      let words = snapshot.val();
      let newState =[];
      for (let name in words){
        newState.push({
          id:name,
          name:words[name].name,
          followers:words[name].followers,
          instaId:words[name].instaId,
          pageLink:words[name].pageLink,
          language:words[name].language
        });
      }
       dispatch(fetchOrdersSuccess(newState));
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
            });
    }
}