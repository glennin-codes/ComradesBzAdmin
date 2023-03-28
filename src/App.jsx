import { BrowserRouter, Route, Routes } from '@router';
import Products from '@components/Products';
import Manageproducts from '@components/ManageProduct';
import Login from '@components/Auth/Login';
import SignUp from '@components/Auth/Signup';
import VerifyEmail from '@components/Verification';
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/manage" element={<Manageproducts />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/verifycode" element={<VerifyEmail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
