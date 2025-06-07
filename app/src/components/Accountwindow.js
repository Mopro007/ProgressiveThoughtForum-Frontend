import React, { useState } from 'react';
import '../styles/Accountwidow.css';

const AccountWindow = ({ accountWindowHandle, userData, signOut, signIn, signUp, setPuplishWindowVisible }) => {
    const [isSignIn, setIsSignIn] = useState(true);
    console.log(userData);

    return (
        userData ? (
            <div className="account-window">
                <h2>{userData.name}</h2>
                <p>{userData.email}</p>
                <div className="account-actions">
                    {userData.role === 'admin' && <button className="admin-button" onClick={() => setPuplishWindowVisible(true)}>نشر مقالة</button>}
                    <button className="signout-button" onClick={() => signOut()}>تسجيل الخروج</button>
                    <button className="signout-button" onClick={() => accountWindowHandle()}> اغلاق</button>
                </div>
            </div>
        ) : (
            <div className="account-window">
                <p>الرجاء انشاء حساب او تسجيل الدخول لعرض معلومات المستخدم</p>
                
                {isSignIn ? (
                    <form onSubmit={(e) => { e.preventDefault(); signIn(e); }}>
                        <input type="email" placeholder="Email" required name='email'/>
                        <input type="password" placeholder="Password" required name='password'/>
                        <button type="submit">تسجيل الدخول</button>
                        <p className="toggle-auth" onClick={() => setIsSignIn(false)}>او قم بأنشاء حساب</p>
                    </form>  
                ) : (
                    <form onSubmit={(e) => { e.preventDefault(); signUp(e); }}>
                        <input type="text" placeholder="Name" required name='name'/>
                        <input type="email" placeholder="Email" required name='email'/>
                        <input type="password" placeholder="Password" required name='password'/>
                        <button type="submit">انشاء حساب</button>
                        <p className="toggle-auth" onClick={() => setIsSignIn(true)}>او قم بتسجيل الدخول</p>
                    </form>
                )}
            </div>
        )
    );
};

export default AccountWindow;