import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import SignInSide from './Components/Login/Login';
import Registerrole from "./Components/Register/Registerrole";
import Home from "./Components/HomePage/HomePage1";
import Home3 from "./Components/HomePage/Homepage3";
import Home2 from "./Components/HomePage/HomePage2";
import Attendence from "./Components/Attendence/Attendence";
import Leaverequests from "./Components/LeaveRequests/Leaverequests";
import Viewpeople from "./Components/Viewpeople/Viewpeople";
import Attendencereport from "./Components/Attendencereport/Attendencereport";
import Approveleaves from "./Components/Approveleaves/Approveleaves";
import Leavepage from "./Components/LeaveRequests/Leavepage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home3 />}/>
        <Route exact path="/Start" element={<Home />}/>
        <Route exact path="/Authority" element={<Home2 />}/>
        <Route exact path="/login" element={<SignInSide />}/>
        <Route exact path="/Authority/Register_role" element={<Registerrole />}/>
        <Route exact path="/Start/Attendence" element={<Attendence />}/>
        <Route exact path="/Start/Leaverequests" element={<Leaverequests />}/>
        <Route exact path="/Authority/Viewpeople" element={<Viewpeople />}/>
        <Route exact path="/Authority/Attendencereport" element={<Attendencereport />}/>
        <Route exact path="/Authority/Approveleaves" element={<Approveleaves />}/>
        <Route exact path="/Start/Leavepage" element={<Leavepage />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
