import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function RegisterPage() {
    const [user, setUser] = useState({
        email: '',
        password: '',
        confirmedPassword: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.email && user.password) {
            dispatch(userActions.register(user));
        }
    }

    return (
        <div>
            <h2>Cadastrar Usuário</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" name="email" value={user.email} onChange={handleChange} className={'form-control' + (submitted && !user.email ? ' is-invalid' : '')} />
                    {submitted && !user.email &&
                        <div className="invalid-feedback">Email é necessário</div>
                    }
                </div>
                <div className="form-group">
                    <label>Senha</label>
                    <input type="password" name="password" value={user.password} onChange={handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} />
                    {submitted && !user.password &&
                        <div className="invalid-feedback">Senha é necessária</div>
                    }
                </div>
                <div className="form-group">
                    <label>Confirmar Senha</label>
                    <input type="password" name="confirmedPassword" value={user.confirmedPassword} onChange={handleChange} className={'form-control' + (submitted && !user.confirmedPassword ? ' is-invalid' : '')} />
                    {submitted && !user.confirmedPassword && user.confirmedPassword != user.password &&
                        <div className="invalid-feedback">As senhas não batem</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        Cadastrar
                    </button>
                    <Link to="/login" className="btn btn-link">Cancelar</Link>
                </div>
            </form>
        </div>
    );
}

export { RegisterPage };