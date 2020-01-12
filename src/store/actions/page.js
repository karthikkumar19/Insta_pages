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
            dispatch(addPageSuccess(response.data.name, pageData));
        } )
        .catch( error => {
            dispatch(addPageFail(error));
        } );
    }
}

export const addPageInit = () => {
    return {
        type:actionTypes.ADD_PAGE_INIT
    };
};

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

export const dscPage = (newState) => {
    return dispatch => {
        dispatch(fetchPagesStart());
        newState.sort((a, b) => parseFloat(b.followers) - parseFloat(a.followers));
        dispatch(fetchPagesSuccess(newState));
    }
}


export const ascPage = (newState) => {
    return dispatch => {
        dispatch(fetchPagesStart());
        newState.sort((a, b) => parseFloat(a.followers) - parseFloat(b.followers));
        dispatch(fetchPagesSuccess(newState));
    }
}

export const searchPage = (name) => {
    return dispatch => {
        const queryParams = '?orderBy="name"&equalTo="' + name + '"';
        axios.get('/pages.json' + queryParams)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                console.log(fetchedOrders.length)
                if(fetchedOrders.length !==0){
                    dispatch(fetchPagesSuccess(fetchedOrders));
                }else{
                    dispatch(fetchPage());
                }
            })
            .catch(err => {
                dispatch(fetchPagesFail(err));
            });
    }
}

export const fetchPage = ( ) => {
    return dispatch => {
        dispatch(fetchPagesStart());
        const wordRef = firebase.database().ref('pages');
        console.log(wordRef);
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
      console.log(newState);
       dispatch(fetchPagesSuccess(newState));
            })
            
    }
}


export const editPageSuccess = () => {
    return{
        type:actionTypes.EDIT_PAGE_SUCCESS,
    };
};

export const editPageFail = (error) => {
    return{
        type: actionTypes.EDIT_PAGE_FAIL,
        error: error
    };
}

export const editPageStart = () =>{
    return{
        type:actionTypes.EDIT_PAGE_START
    };
}
export const editPageInit = () =>{
    return{
        type:actionTypes.EDIT_PAGE_INIT
    };
}

export const editPage = (id,pageData) => {
    return dispatch => {
        dispatch (editPageStart());
        axios.put('/pages/'+ id + '.json',pageData)
    .then(res => {
        console.log(res);
        dispatch(editPageSuccess());
    }).catch(err => {
        console.log(err);
        dispatch(editPageFail(err));
    })
    }
}
