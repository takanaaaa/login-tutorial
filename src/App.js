import './App.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import MyPage from "./components/MyPage";
import Register from './components/Register';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path={`/register/`} element={<Register />} />
          <Route path={`/login/`} element={<Login />} />
          <Route path={`/`} element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
