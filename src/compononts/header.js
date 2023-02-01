import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import css from "./Header.module.scss";
import { Avatar, Menu } from "@mantine/core";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { navbar, collationNav, resultNav, InformationNav } from "../utils/header";
import { authInit } from "../config/state";
import { useAtom } from "jotai";
import { analysisPath, coallationPath, compPath, conditionalRoute, conditionalRouteWOcollate, presidentialGuys, repGuys, resultPath, senateGuys } from "../config/constant";
import logo from '../assets/logo.png'
import { MdOutlineKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md'
import { infoPath } from "../config/constant";

const Header = (props) => {
  const [pages, setPages] = useState([
    ["Home", "/"],
    ["Results", "/results"],
    ["Visualization", "/visualization"],
    ["About Us", "/aboutus"],
    ["Contact Us", "/contactus"],
  ]);
  const [menuOpened, setMenuOpened] = useState(false);
  const location = useLocation()
  const navigate = useNavigate();

  const [auth, setAuth] = useAtom(authInit)

  // useEffect for authentication
  useEffect(() => {
    if (auth) {
      setPages([
        ["Home", "/dashboard"],
        ["Results", "/results"],
        ["Visualization", "/visualization"],
        ["About Us", "/aboutus"],
        ["Contact Us", "/contactus"],
        ["Country", "/country"],
      ]);
    }
  }, []);

  const signOut = async () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  const userManagment = async () => {
    navigate("/user-managment");
  };

  const profile = async () => {
    navigate(`/profile/${auth?._id}`);
  };


  // conditional second childs
  const cSecondChilds = conditionalRoute[auth?.role]

  if(auth?.role !== 'admin' && auth?.agents.length > 0){
    cSecondChilds.push(...conditionalRoute[auth?.agents[0]?.role])
  }

  return (
    <div className={css.container}  >
      {menuOpened ? (
        <CloseIcon
          className={css.menuIcon}
          onClick={() => setMenuOpened((prev) => !prev)}
        />
      ) : (
        <MenuIcon
          className={css.menuIcon}
          onClick={() => setMenuOpened((prev) => !prev)}
        />
      )}

      <div className={css.logo} > 
        <Link to="/dashboard" >
          <img src={logo} />

          <div>
            <span> NNPP 2023 </span>
            <span>ELECTION TRACKER</span>
          </div>        
        </Link>
      </div>

      <ul
        className={css.menu}
        style={{ transform: menuOpened && "translateX(0)" }}
      >
        <NavLink
          className={({ isActive }) => (isActive ? css.active : "inactive")}
          to="/dashboard"
        >
          Home
        </NavLink>

        <Menu
          trigger="hover"
          openDelay={100}
          closeDelay={400}
          style={{ cursor: "pointer" }}
        >
          <Menu.Target>
            <span className={`${infoPath.includes(location.pathname) && css.active} ${css.item_arrow}`} >Information <span className={css.arrow_icon} > <MdOutlineKeyboardArrowDown /> </span></span>
          </Menu.Target>

          <Menu.Dropdown >
            {InformationNav.map((e,i) => {
              if(auth?.role === 'admin' || conditionalRouteWOcollate[auth?.role]?.includes(e.key)){
                return (
                  <Menu.Item
                    onClick={() => {
                      navigate(e.path);
                    }}
                    key={i}
                  >
                    {e.label}
                  </Menu.Item>      
                )                
              }
            })}
          </Menu.Dropdown>
        </Menu>


        {collationNav.map((item, i) => {
          return (
            <Menu
              key={i}
              trigger="hover"
              openDelay={100}
              closeDelay={400}
              style={{ cursor: "pointer" }}
              className={({ isActive }) => (isActive ? css.active : "inactive")}
            >
              <Menu.Target>
                <span className={`${coallationPath.includes(location.pathname) && css.active} ${css.item_arrow}`} >{item.name} <span className={css.arrow_icon} > <MdOutlineKeyboardArrowDown /> </span> </span>
              </Menu.Target>

              <Menu.Dropdown>
                {item.firstChilds.map((firstChild, i) => {
                  if(auth?.role === 'admin' || conditionalRoute[auth?.role]?.includes(firstChild.name.toLowerCase())){
                      return (
                        <Menu.Item
                          key={i}
                        >
                          <Menu
                            trigger="hover"
                            openDelay={50}
                            closeDelay={50}
                            style={{ cursor: "pointer" }}
                            className={({ isActive }) =>
                              isActive ? css.active : "inactive"
                            }
                          >
                            <Menu.Target>
                              <span className={css.item_arrow} >{firstChild.name} <span className={css.arrow_icon} ><MdKeyboardArrowRight/></span></span>
                            </Menu.Target>

                            <Menu.Dropdown className={css.secondMenu}>
                              {firstChild.secondChilds.map((secondChild, i) => {
                                if(auth?.role === 'admin' || cSecondChilds?.includes(secondChild.name.toLowerCase())){
                                  return (
                                    <Menu.Item
                                      onClick={() => {
                                        navigate(secondChild.link, {state: {parent: firstChild.name, key: secondChild.key, child: secondChild.name, routeLevel: secondChild.routeLevel}});
                                      }}
                                      key={i}
                                    >
                                      <span>
                                        {secondChild.name}
                                      </span>
                                    </Menu.Item>
                                  );                                  
                                }
                              })}
                            </Menu.Dropdown>
                          </Menu>
                        </Menu.Item>
                      );
                  }
                })}
              </Menu.Dropdown>
            </Menu>
          );
        })}

        
        {resultNav.map((item, i) => {
          return (
            <Menu
              key={i}
              trigger="hover"
              openDelay={100}
              closeDelay={400}
              style={{ cursor: "pointer" }}
              className={({ isActive }) => (isActive ? css.active : "inactive")}
            >
              <Menu.Target>
                <span className={`${resultPath.includes(location.pathname) && css.active} ${css.item_arrow}`} >{item.name} <span className={css.arrow_icon} > <MdOutlineKeyboardArrowDown /> </span></span>
              </Menu.Target>

              <Menu.Dropdown>
                {item.firstChilds.map((firstChild, i) => {
                  if(auth?.role === 'admin' || conditionalRoute[auth?.role]?.includes(firstChild.name.toLowerCase())){
                    return (
                      <Menu.Item
                      key={i}
                      >
                        <Menu
                          trigger="hover"
                          openDelay={50}
                          closeDelay={50}
                          style={{ cursor: "pointer" }}
                          className={({ isActive }) =>
                            isActive ? css.active : "inactive"
                          }
                        >
                          <Menu.Target>
                            <span className={css.item_arrow} >{firstChild.name} <span className={css.arrow_icon} ><MdKeyboardArrowRight/></span></span>
                          </Menu.Target>
                          
                          <Menu.Dropdown className={css.secondMenu}>
                            {firstChild.secondChilds.map((secondChild, i) => {
                              if(auth?.role === 'admin' || conditionalRouteWOcollate[auth?.role]?.includes(secondChild.name.toLowerCase())){
                                return (
                                  <Menu.Item
                                  onClick={() => {
                                    navigate(secondChild.link, {state: {parent: firstChild.name, child: secondChild.name, routeLevel: secondChild.routeLevel}});
                                  }}
                                  key={i}>
                                    <span>
                                      {secondChild.name}
                                    </span>
                                  </Menu.Item>
                                );                                
                              }
                            })}
                          </Menu.Dropdown>
                        </Menu>
                      </Menu.Item>
                    );                    
                  }

                })}
              </Menu.Dropdown>
            </Menu>
          );
        })}

        {navbar.map((item, i) => {
          return (
            <Menu
              key={i}
              trigger="hover"
              openDelay={100}
              closeDelay={400}
              style={{ cursor: "pointer" }}
              className={({ isActive }) => (isActive ? css.active : "inactive")}
            >
              <Menu.Target>
                <span className={`${analysisPath.includes(location.pathname) && css.active} ${css.item_arrow}`} >{item.name} <span className={css.arrow_icon} > <MdOutlineKeyboardArrowDown /> </span></span>
              </Menu.Target>

              <Menu.Dropdown>
                {item.firstChilds.map((firstChild, i) => {
                  if(auth?.role === 'admin' || conditionalRoute[auth?.role]?.includes(firstChild.name.toLowerCase())){
                    return (
                      <Menu.Item
                      key={i}
                      >
                        <Menu
                          trigger="hover"
                          openDelay={50}
                          closeDelay={50}
                          style={{ cursor: "pointer" }}
                          className={({ isActive }) =>
                            isActive ? css.active : "inactive"
                          }
                        >
                          <Menu.Target>
                            <span className={css.item_arrow} >{firstChild.name} <span className={css.arrow_icon} ><MdKeyboardArrowRight/></span></span>
                          </Menu.Target>
                          
                          <Menu.Dropdown className={css.secondMenu}>
                            {firstChild.secondChilds.map((secondChild, i) => {
                              if(auth?.role === 'admin' || conditionalRouteWOcollate[auth?.role]?.includes(secondChild.name.toLowerCase())){
                                return (
                                  <Menu.Item
                                  onClick={() => {
                                    navigate(secondChild.link, {state: {parent: firstChild.name, child: secondChild.name, routeLevel: secondChild.routeLevel}});
                                  }}
                                  key={i}>
                                    <span>
                                      {secondChild.name}
                                    </span>
                                  </Menu.Item>
                                );                                
                              }
                            })}
                          </Menu.Dropdown>
                        </Menu>
                      </Menu.Item>
                    );                    
                  }

                })}
              </Menu.Dropdown>
            </Menu>
          );
        })}


        <Menu
          trigger="hover"
          openDelay={100}
          closeDelay={400}
          style={{ cursor: "pointer" }}
        >
          <Menu.Target>
            <span className={`${compPath.includes(location.pathname) && css.active} ${css.item_arrow}`} >Comparism <span className={css.arrow_icon} > <MdOutlineKeyboardArrowDown /> </span></span>
          </Menu.Target>

          <Menu.Dropdown>
            {presidentialGuys.includes(auth?.role) && <Menu.Item
              onClick={() => {
                navigate("/comparism/presidential");
              }}
            >
              Presidential
            </Menu.Item>}

            {senateGuys.includes(auth?.role) && <Menu.Item
              onClick={() => {
                navigate("/comparism/senate");
              }}
            >
              Senate
            </Menu.Item>}

            {repGuys.includes(auth?.role) && <Menu.Item
              onClick={() => {
                navigate("/comparism/rep");
              }}
            >
              REP
            </Menu.Item>}
          </Menu.Dropdown>
        </Menu>


        <NavLink
          className={({ isActive }) => (isActive ? css.active : "inactive")}
          to="/aboutus"
        >
          About Us
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? css.active : "inactive")}
          to="/contactus"
        >
          Contact Us
        </NavLink>
        
        <Menu shadow="md" transition="rotate-right" transitionDuration={150} width={200} >
            <Menu.Target >
              <Avatar radius="xl" src={auth?.avatar} style={{cursor:"pointer"}} />
            </Menu.Target>

            <Menu.Dropdown >
              {/* <Menu.Item>Profile</Menu.Item> */}
              <Menu.Item onClick={profile} > Profile </Menu.Item>
              <Menu.Item onClick={userManagment}>User Managment</Menu.Item>
              <Menu.Item onClick={signOut}>Sign Out</Menu.Item>
            </Menu.Dropdown>
        </Menu>
      </ul>
    </div>
  );
};
export default Header;
