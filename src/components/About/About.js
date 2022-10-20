import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/UserContext';

const About = () => {
    const {user} = useContext(AuthContext);
    console.log(user)
    return (
        <div>
            <h3> this is about us!!! Login email: {user?.email}</h3>
        </div>
    );
};

export default About;