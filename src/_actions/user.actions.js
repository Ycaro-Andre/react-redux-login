import { userService } from '../_services/user.service';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    getUsers
};

function login(email, password, from) {
    return dispatch => {

        let userInfo = { email, password }
        dispatch({ type: 'LOGIN_USER', userInfo });

        userService.login(email, password)
            .then(
                user => { 
                    dispatch({ type: 'LOGIN_SUCCESS', user });
                    history.push(from);
                },
                error => {
                    dispatch({ type: 'LOGIN_FAILURE', error });
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

}

function logout() {
    userService.logout();
    return { type: 'USER_LOGOUT' };
}

function register(user) {
    return dispatch => {
        dispatch(() => { return {type: 'REGISTER_USER', user} });

        userService.register(user)
            .then(
                user => { 
                    dispatch({ type: 'REGISTER_USER_SUCCESS', user });

                    //Verifica se tem usuário logado, se sim, vai para a listagem, senão, volta para o login
                    !localStorage.getItem('user') ? history.push('/login') : history.push('/');
                    console.log(localStorage.getItem('user'));
                    
                    dispatch(alertActions.success('Usuário registrado com sucesso'));
                },
                error => {
                    dispatch({ type: 'REGISTER_USER_FAILURE', error });
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
}

function getUsers() {
    return dispatch => {
        dispatch({ type: 'USER_LIST' });

        userService.getUsers()
            .then(
                users => dispatch({ type: 'USER_LIST_SUCCESS', users }),
                error => dispatch({ type: 'USER_LIST_FAILURE', error })
            );
    };
}