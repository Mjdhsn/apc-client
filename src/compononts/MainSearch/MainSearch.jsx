import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL, SECRET_KEY } from "../../config";
import css from "./MainSearch.module.scss";
import { useStore } from "../../store/store";
import ComboBox from "../ComboBox/ComboBox";
import SearchIcon from "@mui/icons-material/Search";
import Loader from "../Loader/Loader";

const MainSearch = (props) => {
  // STATE CONSTS
  const [states, setStates] = useState([]);
  const [stateIDs, setStateIDs] = useState([]);
  const [selectedState, setSelectedState] = useState();
  const [showStateDropdown, setShowStateDropdown] = useState(true);
  // LGA CONSTS
  const [lga, setLga] = useState([]);
  const [lgaIDs, setlgaIDs] = useState([]);
  const [selectedLga, setSelectedLga] = useState();
  const [showLGADropdown, setshowLGADropdown] = useState(true);
  // WARD CONSTS
  const [ward, setWard] = useState([]);
  const [wardIDs, setWardIDs] = useState([]);
  const [selectedWard, setSelectedWard] = useState();
  const [showWardDropdown, setshowWardDropdown] = useState(true);
  const user_type = 5 || Number(localStorage.getItem("user_type"));
  const user_place = localStorage.getItem("user_place");
  var placeArray = user_place.split(',');
  placeArray = Array.from(placeArray, Number);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const setStoreWard = useStore((state) => state.setStoreWard);
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + props.token
    }
  }

  // getting intial data for states
  useEffect(() => {

    if (user_type == 2) {
      var url = `/polling/?state=${placeArray[0]}&lga=${placeArray[1]}&ward=${placeArray[2]}`
      navigate(
        url,
        {
          state: {
            props,
          },
        }
      );
    }
    
    else if (user_type == 1) {
      var url = `/parties?state=${placeArray[0]}&lga=${placeArray[1]}&ward=${placeArray[2]}&pu=${placeArray[3]}`
      navigate(
        url,
        {
          state: {
            props,
          },
        }
      );
    }

    const getStates = async () => {
      try {
        let res = await fetch(API_URL + "getState", options);
        res = await res.json();
        setStateIDs(res[0]);
        setStates(res[1]);
        setLoading(false);
        res.access_token && props.setToken(res.access_token)
      } catch (e) {
        console.log(e);
      }
    };
    if (user_type === 5) {
      getStates();
    }
  }, []);


  // get data for LGA
  useEffect(() => {
    const getLGA = async () => {
      setWard([]);
      setWardIDs([]);
      setLga([]);
      setlgaIDs([]);
      setSelectedLga("");
      setLoading(false);

      if (user_type === 4) {
        var url = API_URL + `getLGA?state_name=${placeArray[0]}`;
      }
      else {
        var url = API_URL + "getLGA?state_name=" + selectedState;
      }

      try {
        let res = await fetch(
          url, options
        );
        res = await res.json();
        setlgaIDs(res[0]);
        setLga(res[1]);
      } catch (e) {
        console.log(e);
      }
    };
    if (user_type > 3) {
      getLGA();
    }
  }, [selectedState]);

  // get data for ward
  useEffect(() => {
    const getWard = async () => {
      setSelectedWard("");
      setWardIDs([]);
      setWard([]);
      if (user_type === 4) {
        var url = API_URL + "getWard?state_name=" + placeArray[0] + "&lga_name=" + selectedLga
      } else if (user_type === 3) {
        var url = API_URL + "getWard?state_name=" + placeArray[0] + "&lga_name=" + placeArray[1]
      } else {
        var url = API_URL + "getWard?state_name=" + selectedState + "&lga_name=" + selectedLga
      }
      try {
        let res = await fetch(url, options
        );
        res = await res.json();
        setWardIDs(res[0]);
        setWard(res[1]);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (user_type > 2) {
      getWard();
    }
  }, [selectedLga, selectedState]);

  const handleSubmit = () => {
    var wardIndex = null;
    for (let i = 0; i < ward.length; i++) {
      if (ward[i] === selectedWard) {
        wardIndex = i;
        break;
      }
    }

    if (user_type == 5) {
      var url = `/polling/?state=${selectedState}&lga=${selectedLga}&ward=${wardIDs[wardIndex]}`
      setStoreWard(selectedWard);
    }
    else if (user_type == 4) {
      var url = `/polling/?state=${placeArray[0]}&lga=${selectedLga}&ward=${wardIDs[wardIndex]}`
    }

    if (user_type === 3) {
      var url = `/polling/?state=${placeArray[0]}&lga=${placeArray[1]}&ward=${wardIDs[wardIndex]}`
    }


    navigate(
      url,
      {
        state: {
          props,
        },
      }
    );

  };

  
  useEffect(() => {
    if( selectedWard ){
      handleSubmit()
    }
  }, [selectedWard])


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={css.comboBoxesWrapper}>
          {user_type === 5 ? (
            <div className={css.comboBox}>
              <span>State</span>
              <ComboBox
                data={states}
                setValue={setSelectedState}
                value={selectedState}
              />
            </div>
          ) : (null
          )}


          {user_type > 3 && selectedState && (
            lga ?
              <div className={css.comboBox}>
                <span>LGA</span>
                <ComboBox
                  data={lga}
                  setValue={setSelectedLga}
                  disabled={user_type === 5 && (selectedState === "" || states.length === 0)}
                  value={selectedLga}
                />
              </div>
            :
              <span>loading...</span>
          )}


          {user_type > 2 && selectedLga && (
            ward ?
              <div className={css.comboBox}>
                <span>Ward</span>
                <ComboBox
                  data={ward}
                  setValue={setSelectedWard}
                  disabled={user_type >= 4 && (selectedLga === "" || lga.length === 0)}
                  value={selectedWard}
                />
              </div>
            :
              <span> Loading... </span>
          )}
        </div>
      )}
    </>
  );
};

export default MainSearch;


// import React from 'react'

// const MainSearch = () => {
//   return (
//     <div>MainSearch</div>
//   )
// }

// export default MainSearch