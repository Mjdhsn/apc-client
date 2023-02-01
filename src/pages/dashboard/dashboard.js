import React from "react";
import "react-responsive-combo-box/dist/index.css";
import Header from "../../compononts/header";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Slider from "../../compononts/Slider/Slider";
import useToken from '../../compononts/useToken'
import css from "./dashboard.module.scss";
import MainSearch from "../../compononts/MainSearch/MainSearch";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BluePrint } from "../../compononts/BluePrint/BluePrint";
import { authInit } from "../../config/state";
import { useAtom } from "jotai";


const Dashboard = (props) => {
  const navigate= useNavigate()
  const { removeToken } = useToken();
  const [auth, setAuth] = useAtom(authInit)

  useEffect(()=> {
    if(!auth){
      navigate('/login');
    }
  },[])

  return (
    <>
      <Header token={removeToken}/>
      <div className={css.dashboard}>
        
        <div className={css.dashboard_wrapper} ><Slider /></div>
        <BluePrint/>

      </div>
    </>
  );
};

export default Dashboard;
