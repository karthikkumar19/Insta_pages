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

export const searchPage = (instaid,startname,stopname) => {
    

    return dispatch => {
        const ref = firebase.database().ref('pages');
        ref
  .orderByChild('instaId')
  .equalTo(instaid)
  .on('value', function(snapshot) { 
      var movie = snapshot.val();
      console.log(movie);
      let newstate=[];
      for(let name in movie){
        //   if(movie[name].stops)
        let stop = movie[name].stops;
        console.log(stop)
        // for(let i in stop){
        //     console.log(stop[i]);
        // }
        newstate.push(stop);
          console.log(newstate);
          var arr = [];
          console.log(arr);
for (var key in newstate) {
  arr.push(newstate[key]);
}
console.log(arr);
console.log(arr[0]);
var arr1 =[];
let arr2 = arr[0];
for (var key in arr2) {
    arr1.push(arr2[key]);
  }
  console.log(arr1);
  
//   var today = new Date();
// var time = today.getHours() + ":" + today.getMinutes();
//   console.log(time);
var ind1,ind2 ='';
  for(let i=0; i<arr1.length; i++){
      if(arr1[i].busname === startname){
        console.log(i);
        ind1 = i;
      }else if(arr1[i].busname === stopname){
          console.log(i);
          ind2 = i;
      }
          
    }
    var slice = arr1.slice(ind1, ind2+1);
    let newState =[];
    for(let name in slice){
        newState.push({
            id:name,
            busname:slice[name].busname,
            fare:slice[name].fare,
            time1:slice[name].time1,
            time2:slice[name].time2,
            time3:slice[name].time3
          });    }
          console.log(newState);
//   }
 

        //   if(movie[name].stops["periyar"]){
        //       console.log("tr")
        //   }
      }
    })
}
}
        // const queryParams = '?orderBy="name&instaId"&equalTo="' + name + '"';
        // axios.get('/pages.json' + queryParams)
        //     .then(res => {
        //         const fetchedOrders = [];
        //         for (let key in res.data) {
        //             fetchedOrders.push({
        //                 ...res.data[key],
        //                 id: key
        //             });
        //         }
        //         console.log(fetchedOrders.length)
        //         if(fetchedOrders.length !==0){
        //             dispatch(fetchPagesSuccess(fetchedOrders));
        //         }else{
        //             dispatch(fetchPage());
        //         }
        //     })
        //     .catch(err => {
        //         dispatch(fetchPagesFail(err));
        //     });
    


export const fetchPage = ( ) => {
    return dispatch => {
        dispatch(fetchPagesStart());
        const wordRef = firebase.database().ref('pages');
        console.log(wordRef.repo);
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
