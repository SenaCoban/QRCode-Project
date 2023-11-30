import './App.css';
import Navi from './Layout/Navi';
import Employee from './Pages/Employee';
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className='App-body'>
        <Navi />
        <Employee />

        <Routes>

          <Route path="/" element={<Navigate to="/" />} />

          <Route exact path='#' element={<Employee />} />
        </Routes>


      </div>
    </div>
  );
}

export default App;