import React, { useReducer,createContext } from 'react'
import {mainReducer,initialState} from "./reducer" 


export const BlogContext = createContext();

export const BlogContextProvider = props => {
    const [state, dispatch] = useReducer(mainReducer, initialState)
   
    return (
        <BlogContext.Provider value={[state,dispatch]}>
           {props.children}
        </BlogContext.Provider>
      );
}
const BlogConsumer = BlogContext.Consumer;

export default BlogConsumer;