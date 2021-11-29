const { createStore, combineReducers,applyMiddleware } = require("redux")
const logger = require('redux-logger').default

//State creation
const initialState = {
    numOfLaptops : 100
}

const mobileState = {
    numOfMobiles : 500
}

//Actions
const buyLaptop = ()=>{
    return {
        type : "BUY_LAPTOP"
    }
}

const buyMobile = ()=>{
    return {
        type : "BUY_MOBILE"
    }
}

//Reducer creation 
const laptopReducer = (state=initialState, action)=>{
    if (action.type ===  "BUY_LAPTOP"){
        return {numOfLaptops: state.numOfLaptops - 1}
    } 
    else{
        return state
    }

}

const mobileReducer = (state=mobileState, action)=>{
    if (action.type ===  "BUY_MOBILE"){
        return {numOfLaptops: state.numOfMobiles - 1}
    } 
    else{
        return state
    }

}

const rootReducer = combineReducers({laptops:laptopReducer, mobiles:mobileReducer})
const store = createStore(rootReducer,applyMiddleware(logger))
console.log(store)
store.subscribe(()=>{console.log(store.getState())})
store.dispatch(buyLaptop())
store.dispatch(buyLaptop())
store.dispatch(buyMobile())