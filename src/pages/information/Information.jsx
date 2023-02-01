import { NavLink } from "@mantine/core";
import React from "react";
import { useState } from "react";
import Header from "../../compononts/header";
import removeToken from "../../compononts/useToken";
import css from "./Information.module.scss";
import Lga from "./LGA/Lga";
import State from "./State/State";

const renderSwitch = (index) => {
  switch (index) {
    case 0:
      return <State source="stateTab"/>
    case 1:
      return <Lga/>
    default:
      break;
  }
};


const Information = ({ token, setToken }) => {
  const [active, setActive] = useState(0);
  const navLinks = ["State", "LGA", "Ward", "Polling Unit"];
  return (
    <>
      <Header token={removeToken} />
      <div className={css.container}>
        <div className={css.sidebar}>
          <span className={css.sidebarHead}>Information Scope</span>
          {navLinks.map((item, index) => (
            <NavLink
              key={item}
              active={index === active}
              label={item}
              onClick={() => setActive(index)}
              color="dark"
              variant="filled"
              className={css.navLink}
            />
          ))}
        </div>
        <div className={css.main}>
            {renderSwitch(active)}
        </div>
      </div>
    </>
  );
};

export default Information;
