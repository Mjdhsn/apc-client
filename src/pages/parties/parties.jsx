import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../compononts/header";
import useToken from '../../compononts/useToken'
import { useStore } from "../../store/store";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import css from "./parties.module.scss";
import { PartiesNames } from "./partiesNames.js";
import { BluePrint } from "../../compononts/BluePrint/BluePrint";
import { API_URL } from "../../config";
import { toast } from "react-toastify";

const Parties = (props) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const storeWard = useStore((state) => state.storeWard);
  const [puName, setpuName] = useState(searchParams.get("pu"));
  const [puCode, setpuCode] = useState("");
  const { removeToken } = useToken();
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + props.token
    }
  }

  
  var pu_name = searchParams.get("pu")
  var ward_name = searchParams.get("ward")
  var lga_name = searchParams.get("lga")
  var state_name = searchParams.get("state")
  var country_name = 'Nigeria'
  
  const [pollingUnit, setPollingUnit] = useState({
    A: 0,
    AA: 0,
    AAC: 0,
    ADC: 0,
    ADP: 0,
    APC: 0,
    APGA: 0,
    APM: 0,
    APP: 0,
    BP: 0,
    LP: 0,
    NNPP: 0,
    NRM: 0,
    PDP: 0,
    PRP: 0,
    SDP: 0,
    YPP: 0,
    ZLP: 0,
    Total_Accredited_voters: 0,
    Total_Registered_voters: 0,
    Total_Rejected_votes: 0
  });

  useEffect(() => {

    const getParty = async () => {
    //  var party_id = searchParams.get("pu")
    //  let res = await fetch(API_URL + `check-pollingid?pu_id=${party_id}`, options);
    //  res = await res.json();
    //  setpuName(res.pu_name)
    //  setpuCode(res.pu_code)

      let result = await fetch(API_URL + `get-pu-result?pu_name=${pu_name}&ward_name=${ward_name}&lga_name=${lga_name}&state_name=${state_name}`, options);
      result = await result.json();
      setPollingUnit(result)
    }
    getParty()

  }, []);

  const onChange = (e) =>
    setPollingUnit({ ...pollingUnit, [e.target.name]: [e.target.value] });

  const onSubmit = async (e) => {
    
    const response = await fetch(API_URL + `update-pu?pu_name=${pu_name}&ward_name=${ward_name}&lga_name=${lga_name}&state_name=${state_name}`,
      {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + props.token
        },
        body: JSON.stringify(pollingUnit)
      }
    )
    if (response.status === 200) {
      toast.success(response.message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/')
    }
    else {
      toast.error(response.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <>
      <Header token={removeToken} />
      {/* breadcrumbs */}
      <div className={css.wrapper}>
        <div
          className="breadCrumbs"
          onClick={() => navigate(-1)}
          aria-label="back"
        >
          <div className="back">
            <ArrowBackIcon />
          </div>
          <span>{`${searchParams.get("state")} > ${searchParams.get(
            "lga"
          )} > ${storeWard} > ${searchParams.get("pu")}`}</span>
        </div>

        <span className="heading">
          {`Fill out the Results for ${puName}`}
        </span>

        <div className={css.container}>
          <div className={css.partiesContainer}>
            <div className={css.head}>
              <span>Party</span>
              <span>Score</span>
            </div>
            <div className={css.head}>
              <span>Party</span>
              <span>Score</span>
            </div>
            <div className={css.head}>
              <span>Party</span>
              <span>Score</span>
            </div>
            {PartiesNames.map((party, index) => (
              <div>
                <span>{party}</span>
                <input type="number" min="0" name={party} key={index} value={pollingUnit[party]} onChange={onChange} />
              </div>
            ))}
          </div>
          <div className={css.totalContainer}>
            <span>Total</span>
            <div className={css.total}>
              <span>Registered Votes</span>
              <input type="number" name="Total_Registered_voters" onChange={onChange} value={pollingUnit['Total_Registered_voters']} />
            </div>
            <div className={css.total}>
              <span>Accepted Votes</span>
              <input type="number" name="Total_Accredited_voters" onChange={onChange} value={pollingUnit['Total_Accredited_voters']} />
            </div>
            <div className={css.total}>
              <span>Rejected Votes</span>
              <input type="number" name="Total_Rejected_votes" onChange={onChange} value={pollingUnit['Total_Rejected_votes']} />
            </div>
            <div className={css.buttons}>
              <button className="button" onClick={onSubmit} >Submit</button>
              <button className="button">Exit</button>
            </div>
          </div>
        </div>
      </div>
      <BluePrint />
    </>
  );
};

export default Parties;
