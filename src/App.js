import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import "./styles/base.css";
import Login from "./components/Login";
import Data from "./components/Data";

function App() {
  return (
    <div className="virtual-body">
      {window.location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Dashboard />} />
        <Route path="income" element={<Data dataType="income"/>}/>
        <Route path="expense" element={<Data dataType="expense"/>}/>
      </Routes>
    </div>
  );
}

export default App;
