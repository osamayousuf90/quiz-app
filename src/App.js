import './assets/styles/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css'
import Welcome from './pages/Welcome/Welcome';
import TestProgress from './pages/TestProgress';
import { BrowserRouter , Routes , Route } from 'react-router-dom';


function App() {
  return (
      <>
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<Welcome/>}></Route>  
        </Routes>
      </BrowserRouter>  
      </>
  );
}

export default App;
