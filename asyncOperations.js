const { createStore, applyMiddleware } = require("redux")
const thunk = require('redux-thunk').default;
const axios = require('axios')
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';


//State
const initialState = {
    users : [],
    error : '',
    isLoading : false
}

//Actions
const fetchUsersRequest = ()=>{
    return {
        type :  FETCH_USERS_REQUEST
        
    }
}

const fetchUsersSuccess = ()=>{
    return {
        type : FETCH_USERS_SUCCESS,
        data : users
    }
}

const fetchUsersFail = (error)=>{
    return {
        type : FETCH_USERS_FAIL,
        data : error
    }
}

//Reducer creation
const usersReducer = (state=initialState,action)=>{
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return {...state,isLoading:true}
        case FETCH_USERS_SUCCESS:
            return {...state,users:action.data,error:''}
        case FETCH_USERS_FAIL:
            return {...state,users:[],error:action.data}
        default:
            return state;

    }
}

const fetchUsers = ()=>{
    return function(dispatch){
        dispatch(fetchUsersRequest());
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response=>{
            let users = response.data.map(user=>user.id);
            dispatch(fetchUsersSuccess(users))
        })
        .catch(error=>{
            dispatch(fetchUsersFail(error))
            
        })
    }
}


const store = createStore(usersReducer ,applyMiddleware(thunk))
store.subscribe(()=>{console.log(store.getState())})
store.dispatch(fetchUsers())
