export function users(state = {}, action) {
    switch (action.type) {
        case 'USER_LIST_SUCCESS':
            return {
                items: action.users
            };
        case 'USER_LIST_FAILURE':
            return {
                error: action.error
            };
        case 'USER_DELETE':
            return {...state};
        case 'USER_DELETE_SUCCESS':
            // remove usuário do estado
            return {
                items: state.items.filter(user => user.id !== action.id)
            };
        case 'USER_DELETE_FAILURE':
            return {
                ...state,
                items: state.items.map(user => {
                    if (user.id === action.id) {
                        return { deleteError: action.error };
                    }

                    return user;
                })
            };
        default:
            return state
    }
}