import React, { useState, useEffect } from 'react';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";
import { auth, provider } from "../firebase";
import { Navigate, Link } from "react-router-dom";

function Login() {

  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  });

  return(
    <>
      {user ? (
        <Navigate to={`/`} />
      ):(
        <>
          <div>
            <h1>ログインページ</h1>
            <UserInfo />
            <LogInWithGoogleButton />
            <p>サインインは<Link to ={`/register/`}>こちら</Link></p>
          </div>
        </>
      )}
    </>
  );
};

export default Login;

function UserInfo() {

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(loginEmail, loginPassword)
    } catch(error) {
      alert("メールアドレスまたはパスワードが間違っています。");
    }
  };

  const handleChangeEmail = (e) => {
    setLoginEmail(e.target.value)
  };

  const handleChangePassword = (e) => {
    setLoginPassword(e.target.value)
  };

  return(
    <form onSubmit={handleSubmit}>
    <div className='formItem'>
      <label>メールアドレス</label>
      <input
      name="email"
      type="email"
      placeholder="email"
      value={loginEmail}
      onChange={handleChangeEmail}/>
    </div>
    <div className='formItem'>
      <label>パスワード</label>
      <input
      name="password"
      type="password"
      placeholder="password"
      value={loginPassword}
      onChange={handleChangePassword} />
    </div>
    <button>ログイン</button>
  </form>
  );
};

// googleでログイン
function LogInWithGoogleButton() {
  const logInWithGoogle = () => {
    signInWithPopup(auth, provider)
  };

  return(
    <button onClick={logInWithGoogle}>
      Googleでサインイン
    </button>
  );
}