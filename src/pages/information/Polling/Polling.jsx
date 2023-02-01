import { Badge, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { Search } from "@mui/icons-material";
import { useAtom } from "jotai";
import { DataTable } from "mantine-datatable";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../../compononts/header";
import Loader from "../../../compononts/Loader/Loader";
import PageWrapper from "../../../compononts/PageWrapper/PageWrapper";
import LgaBox from "../../../compononts/SelectBoxes/LgaBox";
import Constituency from "../../../compononts/SelectBoxes/Constituency";
import DistrictBox from "../../../compononts/SelectBoxes/DistrictBox";
import StateBox from "../../../compononts/SelectBoxes/StateBox";
import WardBox from "../../../compononts/SelectBoxes/WardBox";
import removeToken from "../../../compononts/useToken";
import { infoPath } from "../../../config/constant";
import { authInit } from "../../../config/state";
import usePollingDropDown from "../../../hooks/usePollingDropDown";
import { isFill } from "../../../utils/isFill";
import css from "../LGA/Lga.module.scss";
import { isEmpty } from "../../../utils/isEmpty";

const PollingInfo = ({ type = "info" }) => {

  const [auth, setAuth] = useAtom(authInit)
  const [selected, setSelected] = useState({ state : auth?.level_childs?.state ? auth?.level_childs?.state : "", lga : auth?.level_childs?.lga ? auth?.level_childs?.lga : "", ward : auth?.level_childs?.ward ? auth?.level_childs?.ward : "" })
  const navigate = useNavigate();
  const loacation = useLocation();
  const { state } = loacation

  const {
    data: polData,
    isLoading: polLoading,
    refetch: refetchPol,
    isFetching : polRefecthing,
    error: polError,
  } = usePollingDropDown( infoPath.includes(loacation.pathname) ? "getPolbadge" : state?.parent == "Senate" && "getSenatePol" || state?.parent == "REP" && "getRepPol" || "getPol" , selected );


  //--------------------------------------------------------
  let firstUrl = 
      `${state?.key === 'senate-pu' && "get-sen-pu-result" || state?.key === 'rep-pu' && "get-rep-pu-result" || "get-pu-result"}`

  const getColumns = () => {
    const columns = [
      { accessor: "PU_ID", textAlignment: "left" },
      { accessor: "PU_NAME", textAlignment: "left" },
    ];

    if (type === "coalition") {
      columns.push({
        accessor: "PU_ID",
        title: "Result",
        textAlignment: "left",
        render: (record) => (
          <button
            className="button"
            onClick={() =>
              navigate("../parties", {
                state: {
                  level: state.key ? state.key : "pu",
                  data: {
                    ward: selected.ward,
                    lga: selected.lga,
                    state: selected.state,
                    district : Number(selected?.district),
                    constituency : selected?.constituency,
                    pu : record.PU_ID,
                    country: 1
                  },
                  names : {
                    ward : record.WARD_NAME,
                    state : record.STATE_NAME,
                    lga : record.LGA_NAME,
                    district : record.DISTRICT_NAME,
                    constituency : record.CONSTITUENCY_NAME,
                    pu : record.PU_NAME,
                    country: "NIGERIA"
                  },
                  apiUrl: `${firstUrl}?country_name=1&ward_name=${selected.ward}&lga_name=${selected.lga}&state_name=${selected.state}&pu_name=${record.PU_ID}${selected?.district ? `&senate_district=${Number(selected?.district)}`:''}${selected?.constituency ? `&constituency_name=${selected?.constituency}`:""}`,
                },
              })
            }
          >
            Collate
          </button>
        ),
      });
    } else {
      columns.push(
        {
          accessor: "images",
          textAlignment: "left",
          render: (record) => (
            <Badge variant="filled" color="red">
              {record.images[0]}
            </Badge>
          ),
        },
        {
          accessor: "videos",
          textAlignment: "left",
          render: (record) => (
            <Badge variant="filled" color="red">
              {record.videos[0]}
            </Badge>
          ),
        },
        {
          accessor: "PU_ID",
          title: "",
          textAlignment: "left",
          render: (record) => (
            <button
              className="button"
              onClick={() =>
                navigate("../general-polling", {
                  state: {
                    level: "ward",
                    name: record.PU_NAME,
                    state: record.STATE_NAME,
                    apiUrl: `getDataPu?country_name=1&ward_name=${selected.ward}&lga_name=${selected.lga}&state_name=${selected.state}&pu_name=${record.PU_ID}`,
                  },
                })
              }
            >
              Result
            </button>
          ),
        }
      );
    }

    return columns;
  };

  //-------------------------------------------------------

  const [records, setRecords] = useState([]);
  const [query, setQuery] = useState(auth?.level_childs?.ward ? auth?.level_childs?.ward.toString() : "");
  const [debouncedQuery] = useDebouncedValue(query, 200);

  useEffect(() => {
    if (polData) {
      setRecords(
        polData[3].filter(({ PU_NAME, PU_ID }) => {
          if (
            debouncedQuery !== "" &&
            !`${PU_NAME} ${PU_ID}`
              .toLowerCase()
              .includes(debouncedQuery.trim().toLowerCase())
          ) {
            return false;
          }
          return true;
        }).sort((a, b) => a.PU_ID - b.PU_ID)
      );
    }
  }, [debouncedQuery, polData]);

  useEffect(() => {
    if(isFill(selected)){
      refetchPol()
    }
  }, [loacation.pathname, selected])

  useEffect(() => {
    if(state?.parent == "Senate" && !selected.district){
      setSelected({ state : auth?.level_childs?.state ? auth?.level_childs?.state : "", lga : auth?.level_childs?.lga ? auth?.level_childs?.lga : "", ward : auth?.level_childs?.ward ? auth?.level_childs?.ward : "", district : auth?.level_childs?.district ? auth?.level_childs?.district : "" })
    }else if(state?.parent == "REP" && !selected.constituency){
      setSelected({ state : auth?.level_childs?.state ? auth?.level_childs?.state : "", lga : auth?.level_childs?.lga ? auth?.level_childs?.lga : "", ward : auth?.level_childs?.ward ? auth?.level_childs?.ward : "", constituency : auth?.level_childs?.constituency ? auth?.level_childs?.constituency : "" })
    }
  }, [state?.parent])

  if (polError) {
    return "Error, while fetching list of Wards";
  }

  return (
    <>
      <Header token={removeToken} />
      <PageWrapper>
          <>
            {auth?.level_childs?.pollingUnit?.toString()?.length === 0 && <div className={css.select}>
              <StateBox 
                searchFields={selected}
                setSearchFields={setSelected}
              />

              {state?.parent == "Senate" && isEmpty(selected.state) && <DistrictBox 
                searchFields={selected}
                setSearchFields={setSelected}
              />}

              {state?.parent == "REP" && isEmpty(selected.state) && <Constituency 
                searchFields={selected}
                setSearchFields={setSelected}
              />}

              {state?.parent !== "Senate" && state?.parent !== "REP" && isEmpty(selected.state) && (
                <>
                  <LgaBox
                    setSearchFields={setSelected}
                    searchFields={selected}
                    path={`${state?.parent == "REP" && "getRepLGA" || state?.parent == "Senate" && "getSenateLGA" || 'getLGA'}`}
                  />
                </>
              )}

              {state?.parent == "Senate" && isEmpty(selected.district || '') && (
                <>
                  <LgaBox
                    setSearchFields={setSelected}
                    searchFields={selected}
                    path={`${state?.parent == "REP" && "getRepLGA" || state?.parent == "Senate" && "getSenateLGA" || 'getLGA'}`}
                  />
                </>
              )}

              {state?.parent == "REP" && isEmpty(selected.constituency || '') && (
                <>
                  <LgaBox
                    setSearchFields={setSelected}
                    searchFields={selected}
                    path={`${state?.parent == "REP" && "getRepLGA" || state?.parent == "Senate" && "getSenateLGA" || 'getLGA'}`}
                  />
                </>
              )}

              {isEmpty(selected.lga) && (
                <>
                  <WardBox
                    setSearchFields={setSelected}
                    searchFields={selected}
                    path={`${state?.parent == "REP" && "getRepWard" || state?.parent == "Senate" && "getSenateWard" || 'getWard'}`}
                  />
                </>
              )}
            </div>}

            {isFill(selected) && polLoading || polRefecthing ? (
              <Loader />
            ) : (
              isFill(selected) && (
                <div className={css.container}>
                  {auth?.level_childs?.ward?.toString().length === 0 && <TextInput
                    sx={{ flexBasis: "60%" }}
                    placeholder={`Total ${polData[3]?.length} Wards`}
                    icon={<Search size={16} />}
                    value={query}
                    onChange={(e) => setQuery(e.currentTarget.value)}
                  />}

                  <div className={css.table}>
                    <DataTable
                      withBorder
                      columns={getColumns()}
                      records={records}
                    />
                  </div>
                </div>
              )
            )}
          </>
      </PageWrapper>
    </>
  );
};

export default PollingInfo;
