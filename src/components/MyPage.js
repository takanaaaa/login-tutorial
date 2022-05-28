import React, {useState, useEffect} from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from "../firebase"
import {
  useNavigate,
  Navigate
} from "react-router-dom";

const MyPage = () => {

  const [user, setUser] = useState("");
  // ログイン判定が終わるまでリダイレクトさせない
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // ログイン判定が終わった時点でfalseに変わる
      setLoading(false);
    });
  });

  return(
    <>
      {!loading &&(
        <>
          {!user ? (
            <Navigate to={`/login/`} />
            ) : (
              <>
              <div>
                <h1>マイページ</h1>
                <div className='content'>
                  <p>アカウントID:</p>
                  <p>{user && user.email}</p>
                </div>
                <LogOutButton />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default MyPage;

function LogOutButton() {
  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    navigate("/login/");
  }
  return(
    <button onClick={logout}>ログアウト</button>
  );
}