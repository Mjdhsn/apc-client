import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
//
import "./App.scss";
import 'react-tabs/style/react-tabs.css';
//
import Dashboard from "./pages/dashboard/dashboard";
import Contact from "./pages/contact/contact";
import DataList from "./pages/data/data";
import Visualization from "./pages/visualization/visualization";
import DataViewer from "./pages/viewer/viewer";
import Polling from "./pages/polling/Polling";
import UserManagment from "./pages/user-managment/userManagement";
import EditUser from "./pages/user-managment/partials/EditUser";
import Unit from "./pages/unit/unit";
import Coalition from "./pages/colalition/coalition";
import AboutUs from "./pages/about/aboutus";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import useToken from './compononts/useToken'
import AnalysisTablePageResult from "./pages/analysis/AnalysisTable/AnalysisTable"
import Country from "./pages/information/Country/Country";
import State from "./pages/information/State/State";
import District from "./pages/information/District/District";
import Constituency from "./pages/information/Constituency/Constituency";
import Lga from "./pages/information/LGA/Lga";
import Ward from "./pages/information/Ward/Ward";
import PollingInfo from "./pages/information/Polling/Polling";
import GeneralParties from "./pages/parties/GeneralParties";
import GeneralPolling from "./pages/polling/GeneralPolling";
import Active from "./pages/active";
import Profile from "./pages/profile";
import SetPassword from "./pages/setPassword";
import ForgotPassword from "./pages/forgotPassword";

import ResultPresidential from "./pages/results/subPage/Presidential";
import ResultSenate from "./pages/results/subPage/Senate";
import ResultREP from "./pages/results/subPage/REP";

// analysis 
import { Presidential, REP, Senate } from "./pages/analysis";

// comparism
import { Presidential as ComparismPresidential, REP as ComparismREP, Senate as ComparismSenate } from './pages/Comparism'
import { authInit } from "./config/state";
import { useAtom } from "jotai";
import { usePost } from "./hooks/useFetch";
import { toast } from "react-toastify";
import { toastOption } from "./utils/toastOption";
import Global from "./compononts/Loading/Global";
import PrivateRoutes from "./utils/PrivateRoutes";


function App() {
  
  // hook
  const rfData = usePost('refresh_token')
  
  const { token, setToken } = useToken();
  const [auth, setAuth] = useAtom(authInit)

  // get data from localstorage
  const user = localStorage.getItem("user")

  // destrcutured data
  const { mutate, isSuccess, isError, data, error, isLoading } = rfData

  // use effect
  useEffect(() => {
    if(user && localStorage.getItem("loged") === 'web-loged'){
      mutate({ refreshtoken : user })
      localStorage.removeItem("access_token")
    }
  }, [])

  useEffect(() => {
    if(isSuccess){
      setAuth(data.data.user)
      localStorage.setItem("access_token", data.data.access_token)
      localStorage.setItem("user", data.data.refresh_token)
    }else if(isError){
      toast.error(error.response?.data?.msg, toastOption);
      localStorage.removeItem("access_token")
      localStorage.removeItem("user")
    }
  }, [isSuccess, isError])

  if (isLoading) return <Global />

  return (
    <div className="App">      
    
      <Router>
        <>
          <Routes>
            <Route element={<PrivateRoutes />} >
                <Route exact path="/dashboard" element={<Dashboard token={token} setToken={setToken} />}></Route>
                <Route exact path="/" element={<Dashboard token={token} setToken={setToken} />}></Route>

                {/* information route */}
                <Route exact path="/country" element={<Country token={token} setToken={setToken} />}></Route>
                <Route exact path="/state" element={<State token={token} setToken={setToken} />}></Route>
                <Route exact path="/lga" element={<Lga token={token} setToken={setToken} />}></Route>
                <Route exact path="/ward" element={<Ward token={token} setToken={setToken} />}></Route>
                <Route exact path="/polling-info" element={<PollingInfo token={token} setToken={setToken} />}></Route>
                <Route exact path="/district" element={<District token={token} setToken={setToken} />}></Route>
                <Route exact path="/constituency" element={<Constituency token={token} setToken={setToken} />}></Route>

                {/* Coalition route */}
                <Route exact path="/country-coalition" element={ <Country token={token} setToken={setToken} type="coalition"/>}></Route>
                <Route exact path="/state-coalition" element={<State token={token} setToken={setToken} type="coalition"/>}></Route>
                <Route exact path="/lga-coalition" element={<Lga token={token} setToken={setToken} type="coalition"/>}></Route>
                <Route exact path="/ward-coalition" element={<Ward token={token} setToken={setToken} type="coalition"/>}></Route>
                <Route exact path="/polling-coalition" element={<PollingInfo token={token} setToken={setToken} type="coalition" />}></Route>
                <Route exact path="/collation-district" element={<District token={token} setToken={setToken} type="coalition" />}></Route>
                <Route exact path="/collation-constituency" element={<Constituency token={token} setToken={setToken} type="coalition" />}></Route>

                <Route exact path="/general-polling" element={<GeneralPolling token={token} setToken={setToken} />}></Route>
                <Route exact path="/polling" element={<Polling token={token} setToken={setToken} />}></Route>
                <Route exact path="/parties" element={<GeneralParties token={token} setToken={setToken} />}></Route>
                <Route exact path="/unit" element={<Unit token={token} setToken={setToken} />}></Route>
                <Route exact path="/aboutus" element={<AboutUs token={token} setToken={setToken} />}></Route>
                <Route exact path="/contactus" element={<Contact token={token} setToken={setToken} />}></Route>

                <Route exact path="/results/presidential" element={<ResultPresidential token={token} setToken={setToken} />}></Route>
                <Route exact path="/results/senate" element={<ResultSenate token={token} setToken={setToken} />}></Route>
                <Route exact path="/results/rep" element={<ResultREP token={token} setToken={setToken} />}></Route>
                        
                <Route exact path="/analysis/presidential" element={<Presidential token={token} setToken={setToken} />}></Route>
                <Route exact path="/analysis/rep" element={<REP token={token} setToken={setToken} />}></Route>
                <Route exact path="/analysis/senate" element={<Senate token={token} setToken={setToken} />}></Route>
                <Route exact path="/analysis/:level_key/:party" element={<AnalysisTablePageResult token={token} setToken={setToken} />}></Route>
                        
                <Route exact path="/comparism/presidential" element={<ComparismPresidential token={token} setToken={setToken} />}></Route>
                <Route exact path="/comparism/rep" element={<ComparismREP token={token} setToken={setToken} />}></Route>
                <Route exact path="/comparism/senate" element={<ComparismSenate token={token} setToken={setToken} />}></Route>

                <Route exact path="/profile/:id" element={<Profile token={token} setToken={setToken} />}></Route>               
                <Route exact path="/edit-user/:id" element={<EditUser token={token} setToken={setToken} />}></Route>               

                {/* <Route exact path="/user-managment/add" element={!user && user !== "" && user !== undefined ? <Login setToken={setToken} /> : <AddUser token={token} setToken={setToken} />}></Route>
                <Route exact path="/user-managment/edit/:userId" element={!user && user !== "" && user !== undefined ? <Login setToken={setToken} /> : <EditUser token={token} setToken={setToken} />}></Route> */}
                <Route exact path="/user-managment" element={!auth ? <Login setToken={setToken} /> : <UserManagment token={token} setToken={setToken} />}></Route>
                <Route exact path="/visualization" element={<Visualization token={token} setToken={setToken} />}></Route>
                <Route exact path="/data" element={<DataList token={token} setToken={setToken} />}></Route>
                <Route exact path="/viewer" element={<DataViewer token={token} setToken={setToken} />}></Route>               
            </Route>

            <Route exact path="/register" element={!auth ? <Register setToken={setToken} /> : <Navigate to="/dashboard" />} ></Route>
            <Route exact path="/active/:id" element={!auth ? <Active setToken={setToken} /> : <Navigate to="/dashboard" />} ></Route>
            <Route exact path="/set-password/:id" element={!auth ? <SetPassword setToken={setToken} /> : <Navigate to="/dashboard" />} ></Route>
            <Route exact path="/forgot-password" element={!auth ? <ForgotPassword setToken={setToken} /> : <Navigate to="/dashboard" />} ></Route>
            <Route exact path="/login" element={!auth ? <Login setToken={setToken} /> : <Navigate to="/dashboard" />}></Route>
          </Routes>
        </>
      </Router>
    </div>
  );
}

export default App;
