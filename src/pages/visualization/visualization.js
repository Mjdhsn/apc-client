import React, { useState, useMemo } from "react";
import { Navigate } from "react-router-dom";
import useToken from "../../compononts/useToken";
//components
import Header from "../../compononts/header";
import "./visualization.css";
import { authInit } from "../../config/state";
import { useAtom } from "jotai";

function Visualization() {
  const [userLogged, setUserLogged] = useState();
  const [auth, setAuth] = useAtom(authInit)
  const { removeToken } = useToken();


  useMemo(() => {
    if (auth){
      setUserLogged(true);
    }
  }, []);

  return (
    <>
      {userLogged !== null ? (
        <div className="visualization">
          <Header token={removeToken}/>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}

export default Visualization;
