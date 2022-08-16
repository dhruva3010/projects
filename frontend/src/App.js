import logo from './logo.svg';
import './App.css';
import Header from './Components/Header.component';
import Login from './Components/Login.component';
import DashboardComponent from './Components/Dashboard.component';
import { BrowserRouter, Route } from 'react-router-dom/cjs/react-router-dom.min';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Route path="/" component={Login} exact />
          <Route path="/userinfo" component={DashboardComponent} exact />
        </div>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
