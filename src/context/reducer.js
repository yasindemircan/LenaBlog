export const initialState = {
	loading: true,
	error: '',
    data: []
}


export const mainReducer = (state=initialState,action) => {
    switch (action.type) {
		case 'FETCH_SUCCESS':
         //  console.log("action",action)
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
        case 'FETCH_SUCCESS_MORE':
               // console.log("action",action)
                return {
                    ...state,
                    loading: false,
                    data: state.data.concat(action.payload),
                    error: '',
                 }
		default:
			return state
	}
}