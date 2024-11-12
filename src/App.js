import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import './styles/base.css';

function App() {
  return (
    <div className='virtual-body'>
      <Navbar/>
      <Dashboard/>
    </div>
  );
}

export default App;
