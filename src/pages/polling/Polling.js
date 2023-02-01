import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../compononts/header";
import { API_URL, SECRET_KEY } from "../../config";
import { useStore } from "../../store/store";
import css from "./Polling.module.scss";
import PollingTable from "./PollingTable/PollingTable";
import removeToken from "../../compononts/useToken";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BluePrint } from "../../compononts/BluePrint/BluePrint";
import { authInit } from "../../config/state";
import { useAtom } from "jotai";

const Polling = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const storeWard = useStore((state) => state.storeWard);
  const [fileFilter, setFilter] = useState(null);
  const location = useLocation();
  const source = location.state?.props?.source || '';
  const [auth, setAuth] = useAtom(authInit)
  
  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, []);

  var options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + props.token,
    },
  };
  // getting data from API
  useEffect(() => {
    const getPolling = async () => {
      try {
        const { data } = await axios.get(
          API_URL +
            "getPol?key=" +
            SECRET_KEY +
            "&state_name=" +
            searchParams.get("state") +
            "&lga_name=" +
            searchParams.get("lga") +
            "&wardID=" +
            searchParams.get("ward"),
          options
        );
        setSearchResults(data[3]);
      } catch (e) {
        console.log(e);
      }
    };
    getPolling();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "PU Code",
        accessor: "pu_code",
      },
      {
        Header: "Name",
        accessor: "pu_name",
      },
      {
        Header: "Results",
        accessor: "pu_id",
      },
      {
        Header: "Images",
        accessor: "images",
      },
      {
        Header: "Videos",
        accessor: "videos",
      },
    ],
    []
  );
  const navigate = useNavigate();

  const handleSubmit = (puName) => {
    if (source === "dashboard") {
      navigate(
        `/unit?state=${searchParams.get("state")}&lga=${searchParams.get(
          "lga"
        )}&ward=${storeWard}&pu=${puName}`
      );
    } else {
      navigate("../parties", {
        state: {
          level: "pu",
          data: {
            pu: puName,
            ward : storeWard,
            lga: searchParams.get("lga"),
            state: searchParams.get("state"),
            country: "NIGERIA" //constant: have to make it dynamic when we will have more than one country
          },
          apiUrl: `get-pu-result?pu_name=${puName}&ward_name=${storeWard}&lga_name=${searchParams.get("lga")}&state_name=${searchParams.get("state")}`,
        },
      });
    }
  };

  return (
    <>
      <Header token={removeToken} />
      <div className={css.wrapper}>
        {/* breadcrumbs */}
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
          )} > ${storeWard}`}</span>
        </div>

        <span className={css.heading}>Pollings</span>
        <PollingTable
          columns={columns}
          data={searchResults}
          handleSubmitProp={handleSubmit}
          source={source}
        />
      </div>
      <BluePrint />;
    </>
  );
};

export default Polling;
