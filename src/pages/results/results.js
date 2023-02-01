import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL, SECRET_KEY } from "../../config";
import css from "./results.module.scss"
import { useStore } from "../../store/store";
import ComboBox from "../../compononts/ComboBox/ComboBox";
import SearchIcon from "@mui/icons-material/Search";
//components
import Header from "../../compononts/header";
import useToken from '../../compononts/useToken'
import Checkbox from '../../compononts/Checkbox/Checkbox'
import { toast } from "react-toastify";
import ResultTable from './ResultTable/ResultTable'


function Results(props) {
  const [userLogged, setUserLogged] = useState();
  const [showTable, setshowTable] = useState(false);
  const [cancelledPU, setcancelledPU] = useState(0);
  const [overVotesValue, setOverVotesValue] = useState(0);
  const [total_uncoalated_pu, setTotalUncoalatedPU] = useState(0);
  const [total_coalated_pu, setTotalCoalatedPU] = useState(0);
  const [total_pu, setTotalPU] = useState(0);

  const getTotalCoalatedPU = async (stateIndex, lgaIndex, wardIndex) => {
    axios.get(API_URL + "results/coalated-pu" + `?state=${stateIDs[stateIndex]}&lga=${lgaIDs[lgaIndex]}&ward=${wardIDs[wardIndex]}`, options).then((response) => {
      var dt = response.data;
      setTotalCoalatedPU(dt.count)
    })
  }
  const getTotalUncoalatedPU = async (stateIndex, lgaIndex, wardIndex) => {
    axios.get(API_URL + "results/uncoalated-pu" + `?state=${stateIDs[stateIndex]}&lga=${lgaIDs[lgaIndex]}&ward=${wardIDs[wardIndex]}`, options).then((response) => {
      var dt = response.data;
      setTotalUncoalatedPU(dt.count)
    })
  }
  const getTotalPU = async (stateIndex, lgaIndex, wardIndex) => {
    axios.get(API_URL + "results/total-pu" + `?state=${stateIDs[stateIndex]}&lga=${lgaIDs[lgaIndex]}&ward=${wardIDs[wardIndex]}`, options).then((response) => {
      var dt = response.data;
      setTotalPU(dt.count)
    })
  }

  const getCancelledPU = async (stateIndex, lgaIndex, wardIndex) => {
    axios.get(API_URL + "results/cancelled-pu" + `?state=${stateIDs[stateIndex]}&lga=${lgaIDs[lgaIndex]}&ward=${wardIDs[wardIndex]}`, options).then((response) => {
      var dt = response.data;
      console.log("cancelled",dt)
      setcancelledPU(dt.count)
    })
  }

  const getOverVottedPU = async (stateIndex, lgaIndex, wardIndex) => {
    axios.get(API_URL + "results/overvotted-pu" + `?state=${stateIDs[stateIndex]}&lga=${lgaIDs[lgaIndex]}&ward=${wardIDs[wardIndex]}`, options).then((response) => {
      var dt = response.data;
      console.log("overvotted",dt)
      setOverVotesValue(dt.count)
    })
  }

  const [searchResults, setSearchResults] = useState([]);
  const { removeToken } = useToken();
  const user = localStorage.getItem("user")
  const [states, setStates] = useState([]);
  const [filter1, setFilter1] = useState("country");
  const [lga, setLga] = useState([]);
  const [ward, setWard] = useState([]);
  const [data, setData] = useState([]);
  const [wardIDs, setWardIDs] = useState([]);
  const [lgaIDs, setlgaIDs] = useState([]);
  const [stateIDs, setStateIDs] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [pageTitle, setPageTitle] = useState("EXPECTED PRESENDENTIAL RESULT");
  const [selectedLga, setSelectedLga] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  // PU CONSTS
  const [polling, setPU] = useState([]);
  const [puIDs, setPUIDs] = useState([]);
  const [selectedPU, setSelectedPU] = useState("");
  const [showPUDropdown, setshowPUDropdown] = useState(false);
  const [chartData, setchartData] = useState([]);
  const [showSearchButton, setshowSearchButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showLGADropdown, setshowLGADropdown] = useState(false);
  const [showWardDropdown, setshowWardDropdown] = useState(false);
  const navigate = useNavigate();
  const setStoreWard = useStore((state) => state.setStoreWard);
  const { source } = "result";
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + props.token
    }
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "A",
        accessor: "A",
      },
      {
        Header: "AA",
        accessor: "AA",
      },
      {
        Header: "ADP",
        accessor: "ADP",
      },
      {
        Header: "APP",
        accessor: "APP",
      },
      {
        Header: "AAC",
        accessor: "AAC",
      },
      {
        Header: "ADC",
        accessor: "ADC",
      },
      {
        Header: "APC",
        accessor: "APC",
      },
      {
        Header: "APGA",
        accessor: "APGA",
      },
      {
        Header: "APM",
        accessor: "APM",
      },
      {
        Header: "BP",
        accessor: "BP",
      },
      {
        Header: "LP",
        accessor: "LP",
      },
      {
        Header: "NNPP",
        accessor: "NNPP",
      },
      {
        Header: "NRM",
        accessor: "NRM",
      },
      {
        Header: "PDP",
        accessor: "PDP",
      },
      {
        Header: "PRP",
        accessor: "PRP",
      },
      {
        Header: "SDP",
        accessor: "SDP",
      },
      {
        Header: "YPP",
        accessor: "YPP",
      },
      {
        Header: "ZLP",
        accessor: "ZLP",
      },
      {
        Header: "Over Votes Value",
        accessor: "Over_Votes_Value",
      },
      {
        Header: "Total Accredited voters",
        accessor: "Total_Accredited_voters",
      },
      {
        Header: "Total Registered voters",
        accessor: "Total_Registered_voters",
      },
      {
        Header: "Total Rejected votes",
        accessor: "Total_Rejected_votes",
      },
      {
        Header: "Total Vote Casted",
        accessor: "Total_vote_casted",
      },
      {
        Header: "Percentage Voters Turnout",
        accessor: "percentage_voters_turnout",
      },
      {
        Header: "Total Valid Votes",
        accessor: "total_valid_votes",
      },
      {
        Header: "Remarks",
        accessor: "remarks",
      },
    ],
    []
  );

  useMemo(() => {
    if (user) {
      setUserLogged(true);
    }
  }, []);

  const notify = () => {
    toast.info("Please select all inputs!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleSubmit = () => {
    var stateIndex = null;
    for (let i = 0; i < states.length; i++) {
      if (states[i] === selectedState) {
        stateIndex = i;
        break;
      }
    }
    var lgaIndex = null;
    for (let i = 0; i < lga.length; i++) {
      if (lga[i] === selectedLga) {
        lgaIndex = i;
        break;
      }
    }
    var wardIndex = null;
    for (let i = 0; i < ward.length; i++) {
      if (ward[i] === selectedWard) {
        wardIndex = i;
        break;
      }
    }
    setStoreWard(selectedWard);
    var puIndex = null;
    for (let i = 0; i < polling.length; i++) {
      if (polling[i] === selectedPU) {
        puIndex = i;
        break;
      }
    }

    if (filter1 == 'country') {
      getData(filter1, stateIndex, lgaIndex, wardIndex)
    } else if (filter1 == 'state') {
      getData(filter1, stateIndex, lgaIndex, wardIndex)
    } else if (filter1 == 'lga') {
      getData(filter1, stateIndex, lgaIndex, wardIndex)
    } else if (filter1 == 'ward') {
      getData(filter1, stateIndex, lgaIndex, wardIndex)
    } else if (filter1 == 'pu') {
      getData(filter1, stateIndex, lgaIndex, wardIndex, puIndex)
    }

    setTimeout(function () {
      getTotalCoalatedPU(stateIndex, lgaIndex, wardIndex);
      getTotalUncoalatedPU(stateIndex, lgaIndex, wardIndex);
      getTotalPU(stateIndex, lgaIndex, wardIndex);
      getCancelledPU(stateIndex, lgaIndex, wardIndex);
      getOverVottedPU(stateIndex, lgaIndex, wardIndex);

    }, 800)
  };

  const getData = async (url, stateIndex = "", lgaIndex = "", wardIndex = "", puIndex = "") => {
    setshowTable(true)
    axios.get(API_URL + "results/" + url + `?state=${stateIDs[stateIndex]}&lga=${lgaIDs[lgaIndex]}&ward=${wardIDs[wardIndex]}&pu=${puIDs[puIndex]}`, options).then((response) => {
      var dt = response.data;
      setData(dt);
      setSearchResults(dt);

      setTimeout(function () {
        Array.from(document.querySelectorAll("input[name='filter']"))
          .forEach((checkbox) => {
            var check = document.getElementById(checkbox.id);
            var value = check.checked;
            var target_index = check.attributes.index.value;
            var rows = document.getElementsByTagName('tr')
            var display = "none";
            if (value) {
              display = "table-cell"
            }
            var i = 0;
            while (i < rows.length) {
              rows[i].childNodes[target_index].style.display = display;
              i++;
            }
          })
      }, 500);
    });
  };

  const onChangeValue = (event) => {
    let filter = event.target.value;
    setFilter1(filter)

    if (filter == 'country') {
      setShowStateDropdown(false)
      setshowLGADropdown(false)
      setshowWardDropdown(false)
      setshowPUDropdown(false)
      setshowSearchButton(false)
      setPageTitle('Expected President Results')
    } else if (filter == 'state') {
      setShowStateDropdown(true)
      setshowLGADropdown(false)
      setshowWardDropdown(false)
      setshowPUDropdown(false)
      setshowSearchButton(true)
      setPageTitle('Expected Goverment Results')
    } else if (filter == 'lga') {
      setShowStateDropdown(true)
      setshowLGADropdown(true)
      setshowWardDropdown(false)
      setshowPUDropdown(false)
      setshowSearchButton(true)
      setPageTitle('Expected L.G.A Results')
    } else if (filter == 'ward') {
      setShowStateDropdown(true)
      setshowLGADropdown(true)
      setshowWardDropdown(true)
      setshowPUDropdown(false)
      setshowSearchButton(true)
      setPageTitle('Expected Ward Results')
    } else if (filter === 'pu') {
      setShowStateDropdown(true)
      setshowLGADropdown(true)
      setshowWardDropdown(true)
      setshowPUDropdown(true)
      setshowSearchButton(true)
      setPageTitle('Expected Polling Unit Results')
    }
  }

  // getting intial data for states
  useEffect(() => {
    const getStates = async () => {
      try {
        let res = await fetch(API_URL + "getState?key=" + SECRET_KEY, options);
        res = await res.json();
        setStateIDs(res[0]);
        setStates(res[1]);
        setLoading(false);
        res.access_token && source.setToken(res.access_token)
      } catch (e) {
        console.log(e);
      }
    };
    getStates();
  }, []);


  // get data for LGA
  useEffect(() => {
    const getLGA = async () => {
      try {
        let res = await fetch(
          API_URL + "getLGA?key=" + SECRET_KEY + "&state_name=" + selectedState, options
        );
        res = await res.json();
        setlgaIDs(res[0]);
        setLga(res[1]);
      } catch (e) {
        console.log(e);
      }
    };
    getLGA();
  }, [selectedState]);

  // get data for ward
  useEffect(() => {
    const getWard = async () => {
      setSelectedWard("");
      try {
        let res = await fetch(
          API_URL + "getWard?key=" + SECRET_KEY + "&state_name=" + selectedState + "&lga_name=" + selectedLga, options
        );
        res = await res.json();
        setWardIDs(res[0]);
        setWard(res[1]);
      } catch (error) {
        console.log(error);
      }
    };
    getWard();
  }, [selectedLga, selectedState]);

  // get data for pu
  useEffect(() => {

    var wardIndex = null;
    for (let i = 0; i < ward.length; i++) {
      if (ward[i] === selectedWard) {
        wardIndex = i;
        break;
      }
    }

    const getPU = async () => {
      try {
        let res = await fetch(
          API_URL + "getPol?key=" + SECRET_KEY  +"&state_name=" + selectedState + "&lga_name=" + selectedLga + "&wardID=" + wardIDs[wardIndex], options
        );
        res = await res.json();
        console.log(res)
        setPUIDs(res[2]);
        setPU(res[1]);
      } catch (error) {
        console.log(error);
      }
    };
    getPU();
  }, [selectedWard, selectedLga, selectedState]);

  const handleSelectAll = (e) => {
    var value = false
      ;
    if (e.target.checked) {
      value = true;
      Array.from(document.querySelectorAll("input[name='filter']"))
        .forEach((checkbox) => {
          document.getElementById(checkbox.id).checked = value;
        });
      var target_index = 0
      var display = "none";
      if (value) {
        display = "table-cell"
      }
      while (target_index < 18) {
        var rows = document.getElementsByTagName('tr')
        var i = 0;
        while (i < rows.length) {
          rows[i].childNodes[target_index].style.display = display;
          i++;
        }
        target_index++;
      }


    }

  };

  const handleCheckChange = (e) => {
    var target_index = e.target.attributes.index.value
    var rows = document.getElementsByTagName('tr')
    var display = "none";
    if (e.target.checked) {
      display = "table-cell"
    }
    for (var i in rows) {
      rows[i].childNodes[target_index].style.display = display;
    }
  };

  return (
    <>
      <Header token={removeToken} />
      <div className="results">

        <div className={css.container}>
          <div className="left">

            <div className={css.dropdown} onChange={onChangeValue} style={{ border: "solid" }}>
              <div style={{ textAlign: "left" }} ><input style={{ blockSize: "auto", width: "20px" }} type="radio" value="country" name="filter1" /> COUNTRY</div>
              <div style={{ textAlign: "left" }} ><input style={{ blockSize: "auto", width: "20px" }} type="radio" value="state" name="filter1" /> STATE</div>
              <div style={{ textAlign: "left" }} ><input style={{ blockSize: "auto", width: "20px" }} type="radio" value="lga" name="filter1" /> L.G.A</div>
              <div style={{ textAlign: "left" }} ><input style={{ blockSize: "auto", width: "20px" }} type="radio" value="ward" name="filter1" /> WARD</div>
              <div style={{ textAlign: "left" }} ><input style={{ blockSize: "auto", width: "20px" }} type="radio" value="pu" name="filter1" /> PU</div>
            </div>

            <div className={css.container2} style={{ border: "solid" }}>
              <Checkbox id="ALL" title="Show ALL" handleChange={handleSelectAll} />
              <div className="option" style={{ display: "flex" }}>

                <div style={{ borderTop: "solid" }}>
                  <Checkbox index="0" id="A" title="A" name="filter" handleChange={handleCheckChange} />
                  <Checkbox index="1" id="AA" title="AA" name="filter" handleChange={handleCheckChange} />
                  <Checkbox index="2" id="ADP" title="ADP" name="filter" handleChange={handleCheckChange} />
                  <Checkbox index="3" id="APP" title="APP" name="filter" handleChange={handleCheckChange} />
                  <Checkbox index="4" id="AAC" title="AAC" name="filter" handleChange={handleCheckChange} />
                  <Checkbox index="5" id="ADC" title="ADC" name="filter" handleChange={handleCheckChange} />
                  <Checkbox index="6" id="APC" title="APC" name="filter" handleChange={handleCheckChange} />
                  <Checkbox index="7" id="APGA" title="APGA" name="filter" handleChange={handleCheckChange} />
                  <Checkbox index="8" id="APM" title="APM" name="filter" handleChange={handleCheckChange} />
                </div>
                <div style={{ border: "solid", borderRight: "none", borderBottom: "none" }}>
                  <Checkbox index="9" id="BP" title="BP" name="filter" handleChange={handleCheckChange} />
                  <Checkbox index="10" id="LP" title="LP" name="filter" handleChange={handleCheckChange} />
                  <Checkbox index="11" id="NNPP" title="NNPP" name="filter" handleChange={handleCheckChange} />
                  <Checkbox index="12" id="NRM" title="NRM" name="filter" handleChange={handleCheckChange} />
                  <Checkbox index="13" id="PDP" title="PDP" name="filter" handleChange={handleCheckChange} />
                  <Checkbox index="14" id="PRP" title="PRP" name="filter" handleChange={handleCheckChange} />
                  <Checkbox index="15" id="SDP" title="SDP" name="filter" handleChange={handleCheckChange} />
                  <Checkbox index="16" id="YPP" title="YPP" name="filter" handleChange={handleCheckChange} />
                  <Checkbox index="17" id="ZLP" title="ZLP" name="filter" handleChange={handleCheckChange} />
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div style={{ display: "flex" }}>
              <div className={css.heading}>
                <h1>{pageTitle}</h1>
              </div>
              <div style={{ marginTop:"50px",display: "grid", textAlignLast: "right", minWidth: "max-content"}}>
                <div><label>Total Polling Units: </label>
                  {total_pu}
                </div>
                <div><label>Total Coalated PU: </label>
                  {total_coalated_pu}
                </div>
                <div><label>Total Non Coalated PU: </label>
                  {total_uncoalated_pu}
                </div>
                <div><label>Cancelled PU: </label>
                  {cancelledPU}
                </div>
                <div><label>Total Over Votted PU: </label>
                  {overVotesValue}
                </div>
              </div>
            </div>

            <div className={css.comboBoxesWrapper}>
              {showStateDropdown ? (
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
              {showLGADropdown ? (

                <div className={css.comboBox}>
                  <span>LGA</span>
                  <ComboBox
                    data={lga}
                    setValue={setSelectedLga}
                    disabled={selectedState === "" || states.length === 0}
                    value={selectedLga}
                  />
                </div>
              ) : (null
              )}
              {showWardDropdown ? (

                <div className={css.comboBox}>
                  <span>Ward</span>
                  <ComboBox
                    data={ward}
                    setValue={setSelectedWard}
                    disabled={selectedLga === "" || lga.length === 0}
                    value={selectedWard}
                  />
                </div>
              ) : (null
              )}
              {showPUDropdown ? (
                <div className={css.comboBox}>
                  <span>Polling Unit</span>
                  <ComboBox
                    data={polling}
                    setValue={setSelectedPU}
                    disabled={selectedWard === "" || ward.length === 0}
                    value={selectedPU}
                  />
                </div>
              ) : (null
              )}
              <button className={css.searchBtn} onClick={handleSubmit}>
                <SearchIcon />
                Fetch
              </button>
            </div>
            <br></br>
            <div style={{ display: showTable ? "block" : "none" }}>

              <ResultTable
                columns={columns}
                data={searchResults}
                source={source}
                token={props.token}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Results;
