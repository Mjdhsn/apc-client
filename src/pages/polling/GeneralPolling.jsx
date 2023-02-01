import React from "react";
import Header from "../../compononts/header";
import removeToken from "../../compononts/useToken";
import css from "./Polling.module.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import useGeneralPollings from "../../hooks/useGeneralPollings";
import { Loader } from "@mantine/core";
import UnitTable from "../unit/UnitTable/UnitTable";
import { FILE_PATH } from "../../config";
import DefaultImage from "../../assets/defaultImage.png";
import { useState } from "react";
import { useEffect } from "react";

const GeneralPolling = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data, isLoading } = useGeneralPollings(state);

  const [searchResults, setSearchResults] = useState([]);
  const [receivedData, setReceivedData] = useState([])

  const handleSubmit = (index) => {
    navigate("/viewer", { state: { data: data, i: index, breadCrumbs: {} } });
  };  

  const formatData = (data) => {
    return data?.map((row, index) => {
      const date = new Date(row.DATE)
        .toISOString()
        .replace(/T.*/, "")
        .split("-")
        .reverse()
        .join("/");
      const time = new Date(row.DATE)
        .toISOString()
        .split("T")[1]
        .substring(0, 8);
      return { ...row, date: date, time: time, serial: index + 1 };
    });
  };


  useEffect(() => {
    if(!isLoading){
    setSearchResults(() => formatData(data));
    setReceivedData(()=>formatData(data))}
  }, [data]);


  const columns = React.useMemo(
    () => [
      {
        Header: "S/N",
        accessor: "serial",
      },
      {
        Header: "File",
        accessor: "FILE",
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
        accessor: "DATE",
      },
      {
        Header: "Time",
        accessor: "time",
      },
      {
        Header: "Phone",
        accessor: "PHONE",
      },
      {
        Header: "Remarks",
        accessor: "REMARK",
      },
      {
        Header: "AI Label",
        Cell: () => "AI Label Test",
      },
    ],
    []
  );

    // setting file type filters
    const filterFile = (type) => {
        if (type === "0") {
          const res = receivedData.filter((row) => row.FILE_TYPE === 0);
          setSearchResults(res);
        } else if (type === "1") {
          const res = receivedData.filter((row) => row.FILE_TYPE === 1);
          setSearchResults(res);
        } else {
          setSearchResults(receivedData);
        }
      };

  return (
    <>
      <Header token={removeToken} />
      <div className={css.wrapper}>
        {/* breadcrumbs */}
        <div onClick={() => navigate(-1)} className="breadCrumbs">
          <div className="back">
            <ArrowBackIcon />
          </div>
          <span>Back</span>
        </div>

        <span className={css.heading}>Pollings</span>
        {isLoading ? (
          <Loader />
        ) : (
          <UnitTable
            columns={columns}
            data={searchResults}
            source="dashboard"
            loading={isLoading}
            handleSubmitProp={handleSubmit}
            filterFile={filterFile}
          />
        )}
      </div>
    </>
  );
};

export default GeneralPolling;
