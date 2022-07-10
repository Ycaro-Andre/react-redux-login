import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function HomePage() {
    const users = useSelector(state => state.users);
    const [filter, setFilter] = useState('');
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getUsers());
    }, []);

    function handleChange(e) {
        const { value } = e.target;

        setFilter(value);
    }

    return (
        <div>
            <h1>Logado como {user.email}</h1>
            <h3>Usuários:</h3>
            {users.items &&
                <ul>
                    {
                    // Se o filtro estiver vazio, exibe tudo
                    filter == '' ?
                    users.items.map(user => (
                        <li>
                            {user.email}
                        </li>
                    ))
                    :
                    // Se cair aqui, o filtro não está vazio, então filtra os usuários
                    users.items.filter(user => user.email.includes(filter)).map(filteredUser => (
                        <li>
                            {filteredUser.email}
                        </li>
                    ))}
                </ul>
            }
            <h4>Filtrar:</h4>
            <input type="text" name="filter" value={filter} onChange={handleChange} />
            <p>
                <Link to="/login" className='mr-3'>Logout</Link>
                <Link to="/register" className="btn btn-primary">Cadastrar</Link>
            </p>
        </div>
    );
}

export { HomePage };