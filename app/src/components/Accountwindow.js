import React, { useState } from 'react';
import '../styles/Accountwidow.css';

const AccountWindow = ({ userData, signOut, signIn, signUp, setPuplishWindowVisible }) => {
    const [isSignIn, setIsSignIn] = useState(true);
    console.log(userData);

    return (
        userData ? (
            <div className="account-window">
                <h2>{userData.name}</h2>
                <p>{userData.email}</p>
                <div className="account-actions">
                    {userData.role === 'admin' && <button className="admin-button" onClick={() => setPuplishWindowVisible(true)}>New Article</button>}
                    <button className="signout-button" onClick={() => signOut()}>Sign Out</button>
                </div>
            </div>
        ) : (
            <div className="account-window">
                <p>Please Sign In or Sign Up to view your account details.</p>
                
                {isSignIn ? (
                    <form onSubmit={(e) => { e.preventDefault(); signIn(e); }}>
                        <input type="email" placeholder="Email" required name='email'/>
                        <input type="password" placeholder="Password" required name='password'/>
                        <button type="submit">Sign In</button>
                        <p className="toggle-auth" onClick={() => setIsSignIn(false)}>or Sign Up</p>
                    </form>  
                ) : (
                    <form onSubmit={(e) => { e.preventDefault(); signUp(e); }}>
                        <input type="text" placeholder="Name" required name='name'/>
                        <input type="email" placeholder="Email" required name='email'/>
                        <input type="password" placeholder="Password" required name='password'/>
                        <button type="submit">Sign Up</button>
                        <p className="toggle-auth" onClick={() => setIsSignIn(true)}>or Sign In</p>
                    </form>
                )}
            </div>
        )
    );
};

export default AccountWindow;