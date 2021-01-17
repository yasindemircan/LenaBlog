export const mainReducer = (state,action) => {
    switch (action.type) {
		case 'FETCH_SUCCESS':
         //   console.log("action",action)
			return {
				loading: false,
				data: action.payload,
				error: ''
			}
		case 'FETCH_ERROR':
			return {
				loading: false,
				data: {},
				error: 'Something went wrong!'
            }
    
         
		default:
			return state
	}
}