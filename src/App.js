import './assets/styles/App.scss';
import Welcome from './pages/Welcome/Welcome';
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
