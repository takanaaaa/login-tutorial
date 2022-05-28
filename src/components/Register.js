import React, {useEffect, useState} from 'react';
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";
import { auth, provider } from "../firebase";
import { Navigate, Link } from "react-router-dom";

function Register() {

  // state変数「user」を定義
  const [user, setUser] = useState("");

  // ログインしているか判定
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  });

  return(
    <>
      {user ? (
        <Navigate to={`/`} />
      ): (
      <>
        <div>
          <h1>新規登録</h1>
          <UserInfo />
          <SignInWithGoogleButton />
          <p>ログインは<Link to ={`/login/`}>こちら</Link></p>
        </div>
      </>
      )}
    </>
  );
};

export default Register;

//ユーザー情報登録
function UserInfo() {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleSubmit = async (e) => {
    // リロードされないようにする
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(registerEmail, registerPassword);
    } catch(error) {
      alert("正しく入力してください");
    }
    auth.createUserWithEmailAndPassword(registerEmail.value, registerPassword.value);
  };

  const handleChangeEmail = (e) => {
    setRegisterEmail(e.target.value)
  };

  const handleChangePassword = (e) => {
    setRegisterPassword(e.target.value)
  };

  return(
    <form onSubmit={handleSubmit}>
    <div className='formItem'>
      <label>メールアドレス</label>
      <input
      name="email"
      type="email"
      placeholder="email"
      value={registerEmail}
      onChange={handleChangeEmail}>
      </input>
    </div>
    <div className='formItem'>
      <label>パスワード</label>
      <input
      name="password"
      type="password"
      placeholder="password"
      value={registerPassword}
      onChange={handleChangePassword}>
      </input>
    </div>
    <button>登録</button>
  </form>
  );
};

// googleでサインイン
function SignInWithGoogleButton() {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
  };

  return(
    <button onClick={signInWithGoogle}>
      Googleでサインイン
    </button>
  );
}