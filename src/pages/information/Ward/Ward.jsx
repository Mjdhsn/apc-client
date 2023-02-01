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
import StateBox from "../../../compononts/SelectBoxes/StateBox";
import removeToken from "../../../compononts/useToken";
import { infoPath } from "../../../config/constant";
import { authInit } from "../../../config/state";
import useWard from "../../../hooks/useWard";
import { isFill } from "../../../utils/isFill";
import css from "../LGA/Lga.module.scss";
import Constituency from "../../../compononts/SelectBoxes/Constituency";
import DistrictBox from "../../../compononts/SelectBoxes/DistrictBox";
import { isEmpty } from "../../../utils/isEmpty";

const Ward = ({ type = "info" }) => {

  const [auth, setAuth] = useAtom(authInit)
  const [selected, setSelected] = useState({ state : auth?.level_childs?.state ? auth?.level_childs?.state : "", lga : auth?.level_childs?.lga ? auth?.level_childs?.lga : "" })
  const navigate = useNavigate();
  const loacation = useLocation();
  const { state } = loacation

  const {
    data: wardData,
    isLoading: wardLoading,
    refetch: refetchWard,
    isFetching : wardRefecthing,
    error: wardError,
  } = useWard( infoPath.includes(loacation.pathname) ? "getWardbadge" : state?.parent == "Senate" && "getSenateWard" || state?.parent == "REP" && "getRepWard" || "getWard" , selected );


  //--------------------------------------------------------
  let firstUrl = 
      `${state?.key === 'senate-ward' && "get-sen-ward-result" || state?.key === 'rep-ward' && "get-rep-ward-result" || "get-ward-result"}`


  const getColumns = () => {
    const columns = [
      { accessor: "WARD_ID", textAlignment: "left" },
      { accessor: "WARD_NAME", textAlignment: "left" },
    ];

    if (type === "coalition") {
      columns.push({
        accessor: "WARD_ID",
        title: "Result",
        textAlignment: "left",
        render: (record) => (
          <button
            className="button"
            onClick={() =>
              navigate("../parties", {
                state: {
                  level: state.key ? state.key : "ward",
                  data: {
                    ward: record.WARD_ID,
                    lga: selected.lga,
                    state: selected.state,
                    district : Number(selected?.district),
                    constituency : selected?.constituency,
                    country: 1
                  },
                  names : {
                    ward : record.WARD_NAME,
                    state : record.STATE_NAME,
                    lga : record.LGA_NAME,
                    district : record.DISTRICT_NAME,
                    constituency : record.CONSTITUENCY_NAME,
                    country: "NIGERIA"
                  },
                  apiUrl: `${firstUrl}?country_name=1&ward_name=${record.WARD_ID}&lga_name=${selected.lga}&state_name=${selected.state}${selected?.district ? `&senate_district=${Number(selected?.district)}`:''}${selected?.constituency ? `&constituency_name=${selected?.constituency}`:""}`,
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
          accessor: "WARD_ID",
          title: "",
          textAlignment: "left",
          render: (record) => (
            <button
              className="button"
              onClick={() =>
                navigate("../general-polling", {
                  state: {
                    level: "ward",
                    name: record.WARD_NAME,
                    apiUrl: `getData_ward?country_name=1&state_name=${selected.state}&lga_name=${selected.lga}&ward_name=${record.WARD_ID}`,
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
    if (wardData) {
      setRecords(
        wardData[2].filter(({ WARD_NAME, WARD_ID }) => {
          if (
            debouncedQuery !== "" &&
            !`${WARD_NAME} ${WARD_ID}`
              .toLowerCase()
              .includes(debouncedQuery.trim().toLowerCase())
          ) {
            return false;
          }
          return true;
        }).sort((a, b) => a.WARD_ID - b.WARD_ID)
      )
    }
  }, [debouncedQuery, wardData]);

  useEffect(() => {
    if(isFill(selected)){
      refetchWard()
    }
  }, [loacation.pathname, selected])

  useEffect(() => {
    if(state?.parent == "Senate" && !selected.district){
      setSelected({ state : auth?.level_childs?.state ? auth?.level_childs?.state : "", lga : auth?.level_childs?.lga ? auth?.level_childs?.lga : "", district : auth?.level_childs?.district ? auth?.level_childs?.district : "" })
    }else if(state?.parent == "REP" && !selected.constituency){
      setSelected({ state : auth?.level_childs?.state ? auth?.level_childs?.state : "", lga : auth?.level_childs?.lga ? auth?.level_childs?.lga : "", constituency : auth?.level_childs?.constituency ? auth?.level_childs?.constituency : "" })
    }
  }, [state?.parent])


  if (wardError) {
    return "Error, while fetching list of Wards";
  }

  return (
    <>
      <Header token={removeToken} />
      <PageWrapper>
          <>
            {auth?.level_childs?.ward?.toString()?.length === 0 &&  <div className={css.select}>
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

            </div>}

            {isFill(selected) && wardLoading || wardRefecthing ? (
              <Loader />
            ) : (
              isFill(selected) && (
                <div className={css.container}>
                  {auth?.level_childs?.lga?.length === 0 && <TextInput
                    sx={{ flexBasis: "60%" }}
                    placeholder={`Total ${wardData[2].length} Wards`}
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

export default Ward;
