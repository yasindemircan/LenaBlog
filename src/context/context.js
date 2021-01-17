import React, { useReducer, useEffect,createContext, useState } from 'react'
import {mainReducer} from "./reducer" 
//const BlogContext = React.createContext();

export const BlogContext = createContext();

const initialState = {
	loading: true,
	error: '',
    data: {}
    // dispatch: action => {
    //     initialState()   
    // }
}


const URL_CREATOR = (params) => {
   return(
    params ? `https://www.lenasoftware.com/api/v1/en/maestro/1?page=${params}&count=10`
    : "https://www.lenasoftware.com/api/v1/en/maestro/1"
   )
}
export const BlogContextProvider = props => {
   // const [store,setStore] = useState(mainReducer,initialState)
    const [state, dispatch] = useReducer(mainReducer, initialState, ()=> {
        console.log("state:",initialState.data)
        return initialState.data;
    })
    const BASE_URL = "https://www.lenasoftware.com/api/v1/en/maestro/1"
    const BASE_URL2 = "https://www.lenasoftware.com/api/v1/en/maestro/1?page={1}&count=10"
   // console.log("Blogiçi ",state);
    useEffect(()=>{
       const  fetchData = async () => {
            try{
                let response = await fetch(URL_CREATOR());
                let jsonData = await response.json();
              //  console.log("API DATA::",jsonData.result[0]);
                dispatch({ type: 'FETCH_SUCCESS', payload: jsonData.result })
            }catch(err){
                console.log("hata :",err)
                dispatch({ type: 'FETCH_ERROR' })
            }
        }
        fetchData()
    },[])
    return (
        <BlogContext.Provider value={[state,dispatch]}>
          
          {
             // console.log("state:",state),
             // state.loading ? 'Loading':state,
              props.children
              }
        </BlogContext.Provider>
      );

}
const BlogConsumer = BlogContext.Consumer;

export default BlogConsumer;