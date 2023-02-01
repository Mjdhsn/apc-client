import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link as ReactLink } from "react-router-dom";
import axios from "axios";
import { API_URL, SECRET_KEY } from "../../config";
import css from "../analysis.module.scss"
import { useStore } from "../../store/store";
import ComboBox from "../../compononts/ComboBox/ComboBox";
import SearchIcon from "@mui/icons-material/Search";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Loader from "../../compononts/Loader/Loader";
import {
  Box,
  Button,
  Container,
  InputLabel,
  TextField,
  MenuItem,
  Select
} from "@mui/material";
//components
import Header from "../../compononts/header";
import useToken from '../../compononts/useToken'
import Checkbox from '../../compononts/Checkbox/Checkbox'
import { toast } from "react-toastify";
import AnalysisTable from '../AnalysisTable/AnalysisTable'

import CanvasJSReact from '../../canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


function Analysis(props) {
  const [totalAccreditedVoters, setTotalAccreditedVoters] = useState("");
  const [totalRegisteredVoters, setTotalRegisteredVoters] = useState("");
  const [totalRejectedVotes, setTotalRejectedVotes] = useState("");
  const [totalVoteCasted, setTotalVoteCasted] = useState("");
  const [percentageVotersTurnout, setPercentageVotersTurnout] = useState("");
  const [remarks, setRemarks] = useState("");
  const [totalValidVotes, setTotalValidVotes] = useState("");
  const [overVotesValue, setOverVotesValue] = useState("");
  const [total_uncoalated_pu, setTotalUncoalatedPU] = useState(0);
  const [total_coalated_pu, setTotalCoalatedPU] = useState(0);
  const [total_pu, setTotalPU] = useState(0);

  const getTotalCoalatedPU = async (stateIndex, lgaIndex, wardIndex) => {
    axios.get(API_URL + "analysis/coalated-pu" + `?state=${stateIDs[stateIndex]}&lga=${lgaIDs[lgaIndex]}&ward=${wardIDs[wardIndex]}`, options).then((response) => {
      var dt = response.data;
      setTotalCoalatedPU(dt.count)
    })
  }
  const getTotalUncoalatedPU = async (stateIndex, lgaIndex, wardIndex) => {
    axios.get(API_URL + "analysis/uncoalated-pu" + `?state=${stateIDs[stateIndex]}&lga=${lgaIDs[lgaIndex]}&ward=${wardIDs[wardIndex]}`, options).then((response) => {
      var dt = response.data;
      console.log(dt)
      setTotalUncoalatedPU(dt.count)
    })
  }
  const getTotalPU = async (stateIndex, lgaIndex, wardIndex) => {
    axios.get(API_URL + "analysis/total-pu" + `?state=${stateIDs[stateIndex]}&lga=${lgaIDs[lgaIndex]}&ward=${wardIDs[wardIndex]}`, options).then((response) => {
      var dt = response.data;
      console.log(dt)
      setTotalPU(dt.count)
    })
  }

  const [userLogged, setUserLogged] = useState();
  const [showTable, setshowTable] = useState(false);
  const [searchAnalysis, setSearchAnalysis] = useState([]);
  const { removeToken } = useToken();
  const user = localStorage.getItem("user");
  const [data, setData] = useState([]);
  const [filter1, setFilter1] = useState("country");
  const [filter2, setFilter2] = useState("A");
  const [totalAbove25PU, setTotalAbove25PU] = useState("");
  const [totalWONPU, setTotalWONPU] = useState("");
  const [totalLOSTPU, setTotalLOSTPU] = useState("");
  const [totalProblemsPU, setTotalProblemsPU] = useState("");
  const [totalAbove25Ward, setTotalAbove25Ward] = useState("");
  const [totalWONWard, setTotalWONWard] = useState("");
  const [totalLOSTWard, setTotalLOSTWard] = useState("");
  const [totalProblemsWard, setTotalProblemsWard] = useState("");
  const [totalAbove25lga, setTotalAbove25lga] = useState("");
  const [totalWONlga, setTotalWONlga] = useState("");
  const [totalLOSTlga, setTotalLOSTlga] = useState("");
  const [totalProblemslga, setTotalProblemslga] = useState("");
  const [totalAbove25State, setTotalAbove25State] = useState("");
  const [totalWONState, setTotalWONState] = useState("");
  const [totalLOSTState, setTotalLOSTState] = useState("");
  const [totalProblemsState, setTotalProblemsState] = useState("");
  const [pageTitle, setPageTitle] = useState("EXPECTED PRESENDENTIAL ANALYSIS");
  const [loading, setLoading] = useState(true);
  const [showSearchButton, setshowSearchButton] = useState(false);
  const navigate = useNavigate();
  const setStoreWard = useStore((state) => state.setStoreWard);

  // STATE CONSTS
  const [states, setStates] = useState([]);
  const [stateIDs, setStateIDs] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  // LGA CONSTS
  const [lga, setLga] = useState([]);
  const [lgaIDs, setlgaIDs] = useState([]);
  const [selectedLga, setSelectedLga] = useState("");
  const [showLGADropdown, setshowLGADropdown] = useState(false);
  // WARD CONSTS
  const [ward, setWard] = useState([]);
  const [wardIDs, setWardIDs] = useState([]);
  const [selectedWard, setSelectedWard] = useState("");
  const [showWardDropdown, setshowWardDropdown] = useState(false);
  // PU CONSTS
  const [polling, setPU] = useState([]);
  const [puIDs, setPUIDs] = useState([]);
  const [selectedPU, setSelectedPU] = useState("");
  const [showPUDropdown, setshowPUDropdown] = useState(false);
  const [chartData, setchartData] = useState([
  ]);

  const { source } = "analysis";
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + props.token
    }
  }

  const columns = React.useMemo(() => [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "A",
      accessor: "A",
    },
    {
      Header: "AA",
      accessor: "AA",
    },
    {
      Header: "AAC",
      accessor: "AAC",
    },
    {
      Header: "ADP",
      accessor: "ADP",
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
      Header: "APP",
      accessor: "APP",
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
      Header: "APC",
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
  ], []);
  const chart_options = {
    animationEnabled: true,
    theme: "light2",
    axisX: {
      title: "Parties",
      reversed: true,
    },
    axisY: {
      title: "Votes Casted",
      includeZero: true,
    },
    data: [{
      type: "bar",
      dataPoints: chartData
    }]
  }
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
      getData(filter1)
      getTotalCoalatedPU();
      getTotalUncoalatedPU();
      getTotalPU();
    } else if (filter1 == 'state') {
      getData(filter1, stateIndex)
      getTotalPU(stateIndex);
      getTotalCoalatedPU(stateIndex);
      getTotalUncoalatedPU(stateIndex);
    } else if (filter1 == 'lga') {
      getTotalPU(stateIndex, lgaIndex);
      getData(filter1, stateIndex, lgaIndex)
      getTotalCoalatedPU(stateIndex, lgaIndex);
      getTotalUncoalatedPU(stateIndex, lgaIndex);
    } else if (filter1 == 'ward') {
      getTotalPU(stateIndex, lgaIndex, wardIndex);
      getData(filter1, stateIndex, lgaIndex, wardIndex)
      getTotalCoalatedPU(stateIndex, lgaIndex, wardIndex);
      getTotalUncoalatedPU(stateIndex, lgaIndex, wardIndex);
    } else if (filter1 == 'pu') {
      getTotalPU(stateIndex, lgaIndex, wardIndex, puIndex);
      getData(filter1, stateIndex, lgaIndex, wardIndex, puIndex)
      getTotalCoalatedPU(stateIndex, lgaIndex, wardIndex, puIndex);
      getTotalUncoalatedPU(stateIndex, lgaIndex, wardIndex, puIndex);
    }

  };

  const getData = async (url, stateIndex = "", lgaIndex = "", wardIndex = "", puIndex = "") => {
    setshowTable(true)
    axios.get(API_URL + "analysis/" + url + `?state=${stateIDs[stateIndex]}&lga=${lgaIDs[lgaIndex]}&ward=${wardIDs[wardIndex]}&pu=${puIDs[puIndex]}`, options).then((response) => {
      var dt = response.data;
      console.log(dt)
      setchartData(dt.chart_data);
      setTotalAccreditedVoters(dt.data.Total_Accredited_voters);
      setTotalRegisteredVoters(dt.data.Total_Registered_voters);
      setTotalRejectedVotes(dt.data.Total_Rejected_votes);
      setTotalVoteCasted(dt.data.Total_vote_casted);
      setPercentageVotersTurnout(dt.data.percentage_voters_turnout);
      setTotalValidVotes(dt.data.total_valid_votes);
      // setSearchAnalysis(dt);
    });
  };

  const onChangeValueFilter1 = (event) => {
    let filter = event.target.value;
    setFilter1(filter)

    // getData(filter1)
    if (filter == 'country') {
      setShowStateDropdown(false)
      setshowLGADropdown(false)
      setshowWardDropdown(false)
      setshowPUDropdown(false)
      setshowSearchButton(false)
      setPageTitle('Expected President Analysis')
    } else if (filter == 'state') {
      setShowStateDropdown(true)
      setshowLGADropdown(false)
      setshowWardDropdown(false)
      setshowPUDropdown(false)
      setshowSearchButton(true)
      setPageTitle('Expected Goverment Analysis')
    } else if (filter == 'lga') {
      setShowStateDropdown(true)
      setshowLGADropdown(true)
      setshowWardDropdown(false)
      setshowPUDropdown(false)
      setshowSearchButton(true)
      setPageTitle('Expected L.G.A Analysis')
    } else if (filter == 'ward') {
      setShowStateDropdown(true)
      setshowLGADropdown(true)
      setshowWardDropdown(true)
      setshowPUDropdown(false)
      setshowSearchButton(true)
      setPageTitle('Expected Ward Analysis')
    } else if (filter === 'pu') {
      setShowStateDropdown(true)
      setshowLGADropdown(true)
      setshowWardDropdown(true)
      setshowPUDropdown(true)
      setshowSearchButton(true)
      setPageTitle('Expected Polling Unit Analysis')
    }
  }

  const onChangeValue = (event) => {
    let filter = event.target.value;
    setFilter1(filter)

    // getData(filter1)
    if (filter == 'country') {
      setShowStateDropdown(false)
      setshowLGADropdown(false)
      setshowWardDropdown(false)
      setshowPUDropdown(false)
      setshowSearchButton(false)
      setPageTitle('Expected President Analysis')
    } else if (filter == 'state') {
      setShowStateDropdown(true)
      setshowLGADropdown(false)
      setshowWardDropdown(false)
      setshowPUDropdown(false)
      setshowSearchButton(true)
      setPageTitle('Expected Goverment Analysis')
    } else if (filter == 'lga') {
      setShowStateDropdown(true)
      setshowLGADropdown(true)
      setshowWardDropdown(false)
      setshowPUDropdown(false)
      setshowSearchButton(true)
      setPageTitle('Expected L.G.A Analysis')
    } else if (filter == 'ward') {
      setShowStateDropdown(true)
      setshowLGADropdown(true)
      setshowWardDropdown(true)
      setshowPUDropdown(false)
      setshowSearchButton(true)
      setPageTitle('Expected Ward Analysis')
    } else if (filter === 'pu') {
      setShowStateDropdown(true)
      setshowLGADropdown(true)
      setshowWardDropdown(true)
      setshowPUDropdown(true)
      setshowSearchButton(true)
      setPageTitle('Expected Polling Unit Analysis')
    }
  }

  // getting intial data for states
  useEffect(() => {
    setSelectedLga('')
    setSelectedWard('')
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
    setSelectedWard('')
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
          API_URL + "getPol?key=" + SECRET_KEY + "&state_name=" + selectedState + "&lga_name=" + selectedLga + "&wardID=" + wardIDs[wardIndex], options
        );
        res = await res.json();
        console.log(res)
        setPUIDs(res[0]);
        setPU(res[1]);
      } catch (error) {
        console.log(error);
      }
    };
    getPU();
  }, [selectedWard, selectedLga, selectedState]);

  const handleCheckChangeFilter2 = (e) => {
    setLoading(true);
    var target_id = e.target.id
    if (e.target.checked) {
      Array.from(document.querySelectorAll("input[name='filter']"))
        .forEach((checkbox) => {
          document.getElementById(checkbox.id).checked = false;
        });
      e.target.checked = true
      setFilter2(target_id)
    } else {
      setFilter2("")
    }

    const updateData = (target_id) => {        
      axios.get(API_URL + "analysis/party" + `?party=${target_id}&level=pu`, options).then((response) => {
        console.log(response)
        setTotalAbove25PU(response.data.above25);
        setTotalWONPU(response.data.won);
        setTotalLOSTPU(response.data.lost);
        setTotalProblemsPU(response.data.problems);
      });
      if (filter1 != 'pu') {
        axios.get(API_URL + "analysis/party" + `?party=${target_id}&level=ward`, options).then((response) => {
          setTotalAbove25Ward(response.data.above25);
          setTotalWONWard(response.data.won);
          setTotalLOSTWard(response.data.lost);
          setTotalProblemsWard(response.data.problems);
        });
      }
      if (filter1 != 'pu' && filter1 != 'ward' ) {        
        axios.get(API_URL + "analysis/party" + `?party=${target_id}&level=lga`, options).then((response) => {
          setTotalAbove25lga(response.data.above25);
          setTotalWONlga(response.data.won);
          setTotalLOSTlga(response.data.lost);
          setTotalProblemslga(response.data.problems);
        });
      }
       if (filter1 != 'pu' && filter1 != 'ward' && filter1 != 'lga' ) {  
        axios.get(API_URL + "analysis/party" + `?party=${target_id}&level=state`, options).then((response) => {
          setTotalAbove25State(response.data.above25);
          setTotalWONState(response.data.won);
          setTotalLOSTState(response.data.lost);
          setTotalProblemsState(response.data.problems);
        });      
      }
      
    }
    updateData(target_id);
    setLoading(false);
  }

  const GetExpectedResultSubmit = () => {
    var stateIndex = null;
    for (let i = 0; i < states.length; i++) {
      if (states[i] === selectedState) {
        stateIndex = i;
        break;
      }
    }
    setStoreWard(selectedWard);

    const getStateResult = async (stateIndex = "") => {
      setshowTable(true)
      axios.get(API_URL + "analysis/state" + `?state=${stateIDs[stateIndex]}`, options).then((response) => {
        var dt = response.data;
        console.log(dt);
        setchartData(dt.chart_data);
        setTotalAccreditedVoters(dt.data.Total_Accredited_voters);
        setTotalRegisteredVoters(dt.data.Total_Registered_voters);
        setTotalRejectedVotes(dt.data.Total_Rejected_votes);
        setTotalVoteCasted(dt.data.Total_vote_casted);
        setPercentageVotersTurnout(dt.data.percentage_voters_turnout);
        setTotalValidVotes(dt.data.total_valid_votes);
        setRemarks(dt.data.remarks)
      });
    };

    getStateResult(stateIndex);
    getTotalCoalatedPU(stateIndex);
    getTotalUncoalatedPU(stateIndex);
    getTotalPU(stateIndex);
  };

  return (
    <>
      <Header token={removeToken} />
      <div className="Analysis">
        <Tabs>
          <TabList>
            <Tab>Analysis By Country, State, Ward and PU</Tab>
            <Tab>Party Analysis</Tab>
            <Tab>Expected Result</Tab>
          </TabList>

          <TabPanel>
            <div className={css.container}>
              <div className="left" style={{ width: "20%" }}>
                <h3>Select Here</h3>

                <div className={css.dropdown} onChange={onChangeValue} style={{ border: "solid" }}>
                  <div style={{ textAlign: "left" }} ><input style={{ blockSize: "auto", width: "20px" }} type="radio" value="country" name="filter1" /> COUNTRY</div>
                  <div style={{ textAlign: "left" }} ><input style={{ blockSize: "auto", width: "20px" }} type="radio" value="state" name="filter1" /> STATE</div>
                  <div style={{ textAlign: "left" }} ><input style={{ blockSize: "auto", width: "20px" }} type="radio" value="lga" name="filter1" /> L.G.A</div>
                  <div style={{ textAlign: "left" }} ><input style={{ blockSize: "auto", width: "20px" }} type="radio" value="ward" name="filter1" /> WARD</div>
                  <div style={{ textAlign: "left" }} ><input style={{ blockSize: "auto", width: "20px" }} type="radio" value="pu" name="filter1" /> PU</div>
                </div>
              </div>
              <div className="right" style={{ width: "80%" }}>
                <div className={css.counterRows}>
                  <div>
                    Total Registered Voters
                    <span>
                      {totalRegisteredVoters}
                    </span>
                  </div>
                  <div>
                    Total Accredited Voters
                    <span>
                      {totalAccreditedVoters}
                    </span>
                  </div>
                  <div>
                    Total Rejected Voters
                    <span>
                      {totalRejectedVotes}
                    </span>
                  </div>
                  <div>
                    Total Valid Voters
                    <span>
                      {totalValidVotes}
                    </span>
                  </div>
                  <div>
                    Total Voters Casted
                    <span>
                      {totalVoteCasted}
                    </span>
                  </div>
                  {/* <div>
                    Total Cancel Voters
                    <span>
                      {totalRejectedVotes}
                    </span>
                  </div> */}
                  <div>
                    Percentage Turn-out
                    <span>
                      {percentageVotersTurnout}
                    </span>
                  </div>
                </div>

              </div>

            </div>
            <div>
              <hr></hr>
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
                <button className={css.searchBtn} onClick={handleSubmit} style={{ display: "block" }}>
                  <SearchIcon /> Search
                </button>
              </div>
              <br></br>
              <div style={{ display: "inline-flex", textAlignLast: "center", width: "100%", justifyContent: "space-around" }}>
                <TextField
                  label="Total Polling Units"
                  margin="normal"
                  name="email"
                  type="text"
                  value={total_pu}
                // variant="outlined"
                />
                <TextField
                  label="Total Coalated PU"
                  margin="normal"
                  name="email"
                  type="text"
                  value={total_coalated_pu}
                // variant="outlined"
                />
                <TextField
                  label="Non Coalated PU"
                  margin="normal"
                  name="email"
                  type="text"
                  value={total_uncoalated_pu}
                // variant="outlined"
                />

              </div>
              <br></br>
              <CanvasJSChart options={chart_options}
              /* onRef={ref => this.chart = ref} */
              />
            </div>
          </TabPanel>
          <TabPanel>
            <div className={css.container}>
              <div className="left" style={{ width: "20%" }}>
                <h3>Select Here</h3>

                <div className={css.dropdown} onChange={onChangeValueFilter1} style={{ border: "solid" }}>
                  <div style={{ textAlign: "left" }} ><input style={{ blockSize: "auto", width: "20px" }} type="radio" value="country" name="filter1" /> COUNTRY</div>
                  <div style={{ textAlign: "left" }} ><input style={{ blockSize: "auto", width: "20px" }} type="radio" value="state" name="filter1" /> STATE</div>
                  <div style={{ textAlign: "left" }} ><input style={{ blockSize: "auto", width: "20px" }} type="radio" value="lga" name="filter1" /> L.G.A</div>
                  <div style={{ textAlign: "left" }} ><input style={{ blockSize: "auto", width: "20px" }} type="radio" value="ward" name="filter1" /> WARD</div>
                  <div style={{ textAlign: "left" }} ><input style={{ blockSize: "auto", width: "20px" }} type="radio" value="pu" name="filter1" /> PU</div>
                </div>

                <div className={css.container2} style={{ border: "solid" }}>
                  <div className="option" style={{ display: "flex" }}>

                    <div style={{ borderTop: "none" }}>
                      <Checkbox id="A" title="A" name="filter" handleChange={handleCheckChangeFilter2} />
                      <Checkbox id="AA" title="AA" name="filter" handleChange={handleCheckChangeFilter2} />
                      <Checkbox id="ADP" title="ADP" name="filter" handleChange={handleCheckChangeFilter2} />
                      <Checkbox id="APP" title="APP" name="filter" handleChange={handleCheckChangeFilter2} />
                      <Checkbox id="AAC" title="AAC" name="filter" handleChange={handleCheckChangeFilter2} />
                      <Checkbox id="ADC" title="ADC" name="filter" handleChange={handleCheckChangeFilter2} />
                      <Checkbox id="APC" title="APC" name="filter" handleChange={handleCheckChangeFilter2} />
                      <Checkbox id="APGA" title="APGA" name="filter" handleChange={handleCheckChangeFilter2} />
                      <Checkbox id="APM" title="APM" name="filter" handleChange={handleCheckChangeFilter2} />
                    </div>
                    <div style={{ borderLeft: "solid" }}>
                      <Checkbox id="BP" title="BP" name="filter" handleChange={handleCheckChangeFilter2} />
                      <Checkbox id="LP" title="LP" name="filter" handleChange={handleCheckChangeFilter2} />
                      <Checkbox id="NRM" title="NRM" name="filter" handleChange={handleCheckChangeFilter2} />
                      <Checkbox id="NNPP" title="NNPP" name="filter" handleChange={handleCheckChangeFilter2} />
                      <Checkbox id="PDP" title="PDP" name="filter" handleChange={handleCheckChangeFilter2} />
                      <Checkbox id="PRP" title="PRP" name="filter" handleChange={handleCheckChangeFilter2} />
                      <Checkbox id="SDP" title="SDP" name="filter" handleChange={handleCheckChangeFilter2} />
                      <Checkbox id="YPP" title="YPP" name="filter" handleChange={handleCheckChangeFilter2} />
                      <Checkbox id="ZLP" title="ZLP" name="filter" handleChange={handleCheckChangeFilter2} />
                    </div>
                  </div>

                </div>
              </div>
              <div className="right">
                <div className={css.heading}>
                  <h1 style={{ textTransform: "capitalize" }}>{filter2} {filter1} Result Analysis</h1>
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
                </div>
                <br></br>
                { loading ?
                  <Loader />
                 : ""}

                  <div >
                    <div>
                      <h3>Where {filter2} Won</h3>
                      {!showStateDropdown ?
                        <div>
                          Total State {totalWONState}
                          <ReactLink
                            to={"/analysis/state_won/" + filter2}
                            variant="subtitle2"
                            underline="hover"
                            sx={{
                              cursor: "pointer",
                            }}
                          >
                            Click Here
                          </ReactLink>
                        </div>
                        : ""}
                      {!showLGADropdown ?
                        <div>
                          Total L.G.A {totalWONlga}
                          <ReactLink
                            to={"/analysis/lga_won/" + filter2}
                            variant="subtitle2"
                            underline="hover"
                            sx={{
                              cursor: "pointer",
                            }}
                          >
                            Click Here
                          </ReactLink>
                        </div>
                        : ""}
                      {!showWardDropdown ?
                        <div>
                          Total Ward {totalWONWard}
                          <ReactLink
                            to={"/analysis/ward_won/" + filter2}
                            variant="subtitle2"
                            underline="hover"
                            sx={{
                              cursor: "pointer",
                            }}
                          >
                            Click Here
                          </ReactLink>
                        </div>
                        : ""}
                      <div>
                        Total Polling Units {totalWONPU}
                        <ReactLink
                          to={"/analysis/pu_won/" + filter2}
                          variant="subtitle2"
                          underline="hover"
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          Click Here
                        </ReactLink>
                      </div>
                    </div>
                    {/* where party lost */}
                    <div>
                      <h3>Where {filter2} Lost</h3>
                      {!showStateDropdown ?
                        <div>
                          Total State {totalLOSTState}
                          <ReactLink
                            to={"/analysis/state_lost/" + filter2}
                            variant="subtitle2"
                            underline="hover"
                            sx={{
                              cursor: "pointer",
                            }}
                          >
                            Click Here
                          </ReactLink>
                        </div> : ""
                      }
                      {!showLGADropdown ?
                        <div>
                          Total L.G.A {totalLOSTlga}
                          <ReactLink
                            to={"/analysis/lga_lost/" + filter2}
                            variant="subtitle2"
                            underline="hover"
                            sx={{
                              cursor: "pointer",
                            }}
                          >
                            Click Here
                          </ReactLink>
                        </div>
                        : ""}
                      {!showWardDropdown ?
                        <div>
                          Total Ward {totalLOSTWard}
                          <ReactLink
                            to={"/analysis/ward_lost/" + filter2}
                            variant="subtitle2"
                            underline="hover"
                            sx={{
                              cursor: "pointer",
                            }}
                          >
                            Click Here
                          </ReactLink>
                        </div>
                        : ""}
                      <div>
                        Total Polling Units {totalLOSTPU}
                        <ReactLink
                          to={"/analysis/pu_lost/" + filter2}
                          variant="subtitle2"
                          underline="hover"
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          Click Here
                        </ReactLink>
                      </div>
                    </div>
                    {/* where party got 25% and above of the total votes casted */}
                    <div>
                      <h3>Where {filter2} got 25% and Above of the Total Votes</h3>
                      {!showStateDropdown ?
                      <div>
                        Total State {totalAbove25State}
                        <ReactLink
                          to={"/analysis/state_above25/" + filter2}
                          variant="subtitle2"
                          underline="hover"
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          Click Here
                        </ReactLink>
                      </div>
                      : ""
                    }
                    {!showLGADropdown ?
                      <div>
                        Total L.G.A {totalAbove25lga}
                        <ReactLink
                          to={"/analysis/lga_above25/" + filter2}
                          variant="subtitle2"
                          underline="hover"
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          Click Here
                        </ReactLink>
                      </div>
                      : ""}
                      {!showWardDropdown ?
                      <div>
                        Total Ward {totalAbove25Ward}
                        <ReactLink
                          to={"/analysis/ward_above25/" + filter2}
                          variant="subtitle2"
                          underline="hover"
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          Click Here
                        </ReactLink>
                      </div>
                      : ""}
                      <div>
                        Total Polling Units {totalAbove25PU}
                        <ReactLink
                          to={"/analysis/pu_above25/" + filter2}
                          variant="subtitle2"
                          underline="hover"
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          Click Here
                        </ReactLink>
                      </div>
                    </div>
                    <div>
                      <h3>Where cancellation occured</h3>
                      {!showStateDropdown ?

                      <div>
                        Total State {totalProblemsState}
                        <ReactLink
                          to={"/analysis/state_problems/" + filter2}
                          variant="subtitle2"
                          underline="hover"
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          Click Here
                        </ReactLink>
                      </div>: ""
                      }
                      {!showLGADropdown ?
                      <div>
                        Total L.G.A {totalProblemslga}
                        <ReactLink
                          to={"/analysis/lga_problems/" + filter2}
                          variant="subtitle2"
                          underline="hover"
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          Click Here
                        </ReactLink>
                      </div>: ""}
                      {!showWardDropdown ?
                      <div>
                        Total Ward {totalProblemsWard}
                        <ReactLink
                          to={"/analysis/ward_problems/" + filter2}
                          variant="subtitle2"
                          underline="hover"
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          Click Here
                        </ReactLink>
                      </div>: ""}
                      <div>
                        Total Polling Units {totalProblemsPU}
                        <ReactLink
                          to={"/analysis/pu_problems/" + filter2}
                          variant="subtitle2"
                          underline="hover"
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          Click Here
                        </ReactLink>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className={css.container}>
              <div className="right">
                <div className={css.comboBoxesWrapper}>

                  <div className={css.comboBox}>
                    <span>State</span>
                    <ComboBox
                      data={states}
                      setValue={setSelectedState}
                      value={selectedState}
                    />
                  </div>
                  <button className={css.searchBtn} onClick={GetExpectedResultSubmit}>
                    <SearchIcon />
                    Search
                  </button>
                </div>
                <br></br>

                {/* result message */}

                <div style={{ display: "inline-flex", textAlignLast: "center", width: "100%", justifyContent: "space-around" }}>
                  <TextField
                    label="Total Polling Units"
                    margin="normal"
                    name="email"
                    type="text"
                    value={total_pu}
                  // variant="outlined"
                  />
                  <TextField
                    label="Total Coalated PU"
                    margin="normal"
                    name="email"
                    type="text"
                    value={total_coalated_pu}
                  // variant="outlined"
                  />
                  <TextField
                    label="Non Coalated PU"
                    margin="normal"
                    name="email"
                    type="text"
                    value={total_uncoalated_pu}
                  // variant="outlined"
                  />

                </div>

                <div className={css.heading}>
                  <h1>{remarks}</h1>
                </div>

                <br></br>
                <div style={{ display: showTable ? "block" : "none" }}>

                  <CanvasJSChart options={chart_options}
                  /* onRef={ref => this.chart = ref} */
                  />

                </div>
              </div>
            </div>
          </TabPanel>
        </Tabs>


      </div>
    </>
  );

}

export default Analysis;
