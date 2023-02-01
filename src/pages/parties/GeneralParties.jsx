import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../compononts/header";
import useToken from "../../compononts/useToken";
import css from "./parties.module.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BluePrint } from "../../compononts/BluePrint/BluePrint";
import useCoalition from "../../hooks/useCoalition";
import Loader from "../../compononts/Loader/Loader";
import { useState } from "react";
import { PartiesNames } from "./partiesNames";
import { useMutation } from "react-query";
import { useAtom } from "jotai";
import { authInit } from "../../config/state";

const GeneralParties = () => {
  const navigate = useNavigate();
  const { removeToken } = useToken();
  const location = useLocation();
  const {
    name,
    data: response,
    updateCoalition,
  } = useCoalition(location.state);

  const [auth, setAuth] = useAtom(authInit)
  const [partyResults, setPartyResults] = useState({});
  const [totalResults, setTotalResults] = useState({});
  const [submitStatus, setSubmitStatus] = useState({
    status: true,
    person_collated: null,
    time: null,
  });
  
  useEffect(() => {
    setPartyResults(response.data?.results);
    setTotalResults(response.data?.total);
  }, [response.data]);

  const { mutate, isLoading } = useMutation(
    (data) => updateCoalition(data.name, data.type, { ...partyResults, ...totalResults }),
    {
      onSuccess: (data) => handleSubmitComplete(data),
      onError: () => alert("Something went wrong"),
    }
  );

  const submitData = (type) => {
    if(type==="cancel")
    {
      //on cancel making all the party scores and total scores 0
      Object.keys(partyResults).forEach(function(party) {
        partyResults[party] = 0
      });
      Object.keys(totalResults).forEach(function(total) {
        totalResults[total] = 0
      });
    }
    mutate({name, type});
  };

  const handleSubmitComplete = (data) => {
    setSubmitStatus((prev)=>({
      status: !prev.status,
      person_collated: data.person_collated,
      time: data.time,
    }));
  };

  return (
    <>
      <Header token={removeToken} />
      <div className={css.wrapper}>
        <div
          className="breadCrumbs breadCrumbTwo"
          onClick={() => navigate(-1)}
          aria-label="back"
        >
          <div className="back">
            <ArrowBackIcon />
          </div>
          <span>Back</span>
        </div>

        <span className="heading">{`Fill out the Results for ${name}`}</span>
        {response.isLoading ? (
          <Loader />
        ) : (
          <div className={css.container}>
            <>
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
                {partyResults !== undefined &&
                  PartiesNames.map((party, index) => (
                    <div>
                      <span>{party}</span>
                      <input
                        min={0}
                        type="number"
                        key={index}
                        value={partyResults[party]}
                        onChange={(e) =>
                          setPartyResults((prev) => {
                            return { ...prev, [party]: e.target.value };
                          })
                        }
                      />
                    </div>
                  ))}
              </div>
              <div className={css.totalContainer}>
                <span>Total</span>
                <div className={css.total}>
                  <span>Registered Votes</span>
                  <input
                    type="number"
                    name="TOTAL_REGISTERED_VOTERS"
                    value={totalResults?.TOTAL_REGISTERED_VOTERS}
                    onChange={(e) =>
                      setTotalResults((prev) => {
                        return {
                          ...prev,
                          [e.target.getAttribute("name")]: e.target.value,
                        };
                      })
                    }
                  />
                </div>
                <div className={css.total}>
                  <span>Accredited Votes</span>
                  <input
                    type="number"
                    name="TOTAL_ACCREDITED_VOTERS"
                    value={totalResults?.TOTAL_ACCREDITED_VOTERS}
                    onChange={(e) =>
                      setTotalResults((prev) => {
                        return {
                          ...prev,
                          [e.target.getAttribute("name")]: e.target.value,
                        };
                      })
                    }
                  />
                </div>
                <div className={css.total}>
                  <span>Rejected Votes</span>
                  <input
                    type="number"
                    name="TOTAL_REJECTED_VOTES"
                    value={totalResults?.TOTAL_REJECTED_VOTES}
                    onChange={(e) =>
                      setTotalResults((prev) => {
                        return {
                          ...prev,
                          [e.target.getAttribute("name")]: e.target.value,
                        };
                      })
                    }
                  />
                </div>
                <div className={css.buttons}>
                  {!submitStatus.status ? (
                    <button className={`button ${css.cancelButton}`} disabled={isLoading} onClick={()=>submitData("cancel")}>
                      {isLoading ? "Canelling..." : "Cancel"}</button>
                  ) : (
                    <button className={`button ${css.submitButton}`} disabled ={isLoading} onClick={() => submitData("update")}>
                      {isLoading ? "Submitting..." : "Submit"}
                    </button>
                  )}
                </div>
                <div style={{ marginTop:"-10px" }} >
                  {submitStatus.person_collated !== null && (
                    !submitStatus.status?
                    <span>
                      Submitted by <b>{auth?.name}</b> at{" "}
                      <b>{submitStatus.time}</b>
                    </span>
                    :
                    <span>
                      Cancelled by <b>{auth?.name}</b> at{" "}
                    <b>{submitStatus.time}</b>
                  </span>
                  )}
                </div>
              </div>
            </>
          </div>
        )}
      </div>
      <BluePrint />
    </>
  );
};

export default GeneralParties;
