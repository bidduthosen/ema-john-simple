import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/UserContext';
import logo from '../../images/Logo.svg'
import './Header.css'

const Header = () => {
    const {user, logOut} = useContext(AuthContext);
    const handleSignOut =()=>{
        logOut()
        .then(()=>{})
        .catch(error=>console.error(error))
    }
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Manage Inventory</Link>
                <Link to='/about'>About Us</Link>
                {user?.email && user?.uid ? 
                    <Link onClick={handleSignOut} to='/login' className='logout-link'>Logout</Link>
                :
                <>
                    <Link to='/login'>Login</Link>
                    <Link to='/signup'>Sign Up</Link>
                </>
                }
            </div>
        </nav>
    );
};

export default Header;