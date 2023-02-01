import css from "./unit.module.scss";

import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { API_URL, FILE_PATH, SECRET_KEY } from "../../config";
import Header from "../../compononts/header";
import useToken from '../../compononts/useToken'
import { useState } from "react";
import UnitTable from "./UnitTable/UnitTable";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useStore } from "../../store/store";
import DefaultImage from "../../assets/defaultImage.png";
import { BluePrint } from "../../compononts/BluePrint/BluePrint";
import { authInit } from "../../config/state";
import { useAtom } from "jotai";

const Unit = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const storeWard = useStore((state) => state.storeWard);
  const [receivedData, setRecievedData] = useState([]);
  const [auth, setAuth] = useAtom(authInit)

  const { removeToken } = useToken();
  useEffect(()=> {
    if(!auth){
      navigate('/login');
    }
  },[])
  var options = {  
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + props.token
    }
  }
  // getting data from server
  useEffect(() => {
    const getUnitData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          API_URL +
            "getDataPu?key=" +
            SECRET_KEY +
            "&country_name=" +
            1 +
            "&state_name=" +
            searchParams.get("state") +
            "&lga_name=" +
            searchParams.get("lga") +
            "&ward_name=" +
            searchParams.get("ward") +
            "&pu_name=" +
            searchParams.get("pu"),
            options
        );
        setRecievedData(() => formatData(data));
        setSearchResults(() => formatData(data));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getUnitData();
  }, []);

  const formatData = (data) => {
    return data.map((row, index) => {
      const date = new Date(row.date)
        .toISOString()
        .replace(/T.*/, "")
        .split("-")
        .reverse()
        .join("/");
      const time = new Date(row.date)
        .toISOString()
        .split("T")[1]
        .substring(0, 8);
      return { ...row, date: date, time: time, serial: index + 1};
    });
  };

  // setting columnns with data

  const columns = React.useMemo(
    () => [
      {
        Header: "S/N",
        accessor: "serial",
      },
      {
        Header: "File",
        accessor: "file",
        Cell: ({ value }) =>
          value.slice(-3) === "jpg" ? (
            <img
              src={
                value !== "undefined" ? `${FILE_PATH}${value}` : DefaultImage
              }
              className="thumbnail"
              alt="cover"
              loading="lazy"
            />
          ) : (
            <img
              src={DefaultImage}
              className="thumbnail"
              alt="cover"
              loading="lazy"
            />
          ),
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Time",
        accessor: "time",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Remarks",
        accessor: "remark",
      },
      {
        Header: "AI Label",
        Cell: ()=> "AI Label Test",
      }
    ],
    []
  );
  const navigate = useNavigate();
  const handleSubmit = (index) => {
    navigate("/viewer", { state: { data: receivedData, i: index,  breadCrumbs: {state: searchParams.get("state"), lga: searchParams.get("lga"), ward: storeWard, pu: searchParams.get("pu") }  } });
  };
  // setting file type filters
  const filterFile = (type) => {
    if (type === "0") {
      const res = receivedData.filter((row) => row.file_type === 0);
      setSearchResults(res);
    } else if (type === "1") {
      const res = receivedData.filter((row) => row.file_type === 1);
      setSearchResults(res);
    } else {
      setSearchResults(receivedData);
    }
  };

  return (
    <>
      <Header token={removeToken}/>
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
          )} > ${storeWard} > ${searchParams.get("pu")}`}</span>
        </div>

        <span className="heading">Results</span>

        <UnitTable
          columns={columns}
          data={searchResults}
          handleSubmitProp={handleSubmit}
          loading={loading}
          filterFile={filterFile}
        />
      </div>
      <BluePrint/>
    </>
  );
};

export default Unit;
