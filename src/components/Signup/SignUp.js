import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/UserContext';
import './SignUp.css';

const SignUp = () => {
    const [error, setError] =useState(null);
    const {createUser, signInGoogle} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignUp = event =>{
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password= form.password.value;
        const confirm = form.confirm.value
        console.log(email, password, confirm);

        if(password.length < 6){
            setError('Password must be 6 digits!!');
            return;
        }
        if(password !== confirm){
            setError('Your password did not match!!')
            return ;
        }
        
        createUser(email , password)
        .then(result =>{
            const user = result.user;
            console.log("signup user",user);
            form.reset();
            navigate('/')
        })
        .catch(error =>{
            console.error(error);
            setError(error.message)
        })
    }

    const handleSignInGoogle = event =>{
        signInGoogle()
        .then(result =>{
            const user =result.user;
            console.log(user);
            navigate('/');
        })
        .catch(error => {
            console.error(error);
            setError(error.message)
        })
    }
    return (
        <div className='form-sign-container'>
            <h1 className='form-title'>Sign up</h1>
            <form onSubmit={handleSignUp}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder='Your Email' required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder='Your Password' required />
                </div>
                <div className="form-control">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name="confirm" placeholder='Confirm Your Password' required />
                </div>
                <div className='error-msg'>{error}</div>
                <input className='btn-submit' type="submit" value="Sign Up" />
                <p><small>Already Have an Account? <Link to='/login'>Login</Link></small></p>
            </form>
            <div>
            <input onClick={handleSignInGoogle} className='btn-submit' type="submit" value="Continue with Google" />
            </div>
        </div>
    );
};

export default SignUp;