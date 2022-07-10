import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Classe usada para checar se usuário está logado
function AuthenticationRouter({ component: Component, roles, ...rest }) {
    return (
        <Route {...rest} render={props => {
            // verifica se o usuário está logado, se não estiver, volta pra pg de login
            if (!localStorage.getItem('user')) {
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }

            // se estiver logado, prossegue para a página normalmente
            return <Component {...props} />
        }} />
    );
}

export { AuthenticationRouter };