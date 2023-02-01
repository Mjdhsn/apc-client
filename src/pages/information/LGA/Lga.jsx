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
import Constituency from "../../../compononts/SelectBoxes/Constituency";
import DistrictBox from "../../../compononts/SelectBoxes/DistrictBox";
import StateBox from "../../../compononts/SelectBoxes/StateBox";
import removeToken from "../../../compononts/useToken";
import { infoPath } from "../../../config/constant";
import { authInit } from "../../../config/state";
import useLga from "../../../hooks/useLga";
import { isEmpty } from "../../../utils/isEmpty";
import { isFill } from "../../../utils/isFill";
import css from "./Lga.module.scss";


const Lga = ({ type = "info" }) => {

  const [auth, setAuth] = useAtom(authInit)
  const location = useLocation()
  const { state } = location
  const [selected, setSelected] = useState({ state : auth?.level_childs?.state ? auth?.level_childs?.state : "" })

  const {
    data: lgaRecords,
    isLoading: lgaRecordsLoading,
    refetch : lgaRefecth,
    isRefetching : lgaRefecthing
  } = useLga(infoPath.includes(location.pathname) ? "getLGAbadge" : state?.parent == "Senate" && "getSenateLGA" || state?.parent == "REP" && "getRepLGA" || "getLGA", selected);

  const [records, setRecords] = useState([]);
  const [query, setQuery] = useState(auth?.level_childs?.lga ? auth?.level_childs?.lga.toString() : "");
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const navigate = useNavigate();

  useEffect(() => {
    if(isFill(selected)){
      lgaRefecth()
    }
  }, [location.pathname, selected])

  useEffect(() => {
    if(state?.parent == "Senate" && !selected.district){
      setSelected({ state : auth?.level_childs?.state ? auth?.level_childs?.state : "", district : auth?.level_childs?.district ? auth?.level_childs?.district : "" })
    }else if(state?.parent == "REP" && !selected.constituency){
      setSelected({ state : auth?.level_childs?.state ? auth?.level_childs?.state : "", constituency : auth?.level_childs?.constituency ? auth?.level_childs?.constituency : "" })
    }
  }, [state?.parent])


  useEffect(() => {
    if (lgaRecords) {
      setRecords(
        lgaRecords[2].filter(({ LGA_NAME, LGA_ID }) => {
          if (
            debouncedQuery !== "" &&
            !`${LGA_NAME} ${LGA_ID}`
              .toLowerCase()
              .includes(debouncedQuery.trim().toLowerCase())
          ) {
            return false;
          }
          return true;
        }).sort((a, b) => a.LGA_ID - b.LGA_ID)
      );
    }
  }, [debouncedQuery, lgaRecords]);

  let firstUrl = 
      `${state?.key === 'senate-lga' && "get-sen-lga-result" || state?.key === 'rep-lga' && "get-rep-lga-result" || "get-lga-result"}`

  const getColumns = () => {
    const columns = [
      { accessor: "LGA_ID", textAlignment: "left" },
      { accessor: "LGA_NAME", textAlignment: "left" },
    ];
    if (type === "coalition") {
      columns.push({
        accessor: "LGA_ID",
        title: "Results",
        textAlignment: "left",
        render: (record) => (
          <button
            className="button"
            onClick={() =>
              navigate("../parties", {
                state: {
                  level: state.key ? state.key : "lga",
                  data: {
                    lga: record.LGA_ID,
                    state: selected.state,
                    district : Number(selected?.district),
                    constituency : selected?.constituency,
                    country: 1
                  },
                  names : {
                    state : record.STATE_NAME,
                    lga : record.LGA_NAME,
                    district : record.DISTRICT_NAME,
                    constituency : record.CONSTITUENCY_NAME,
                    country: "NIGERIA"
                  },
                  apiUrl: `${firstUrl}?country_name=1&lga_name=${record.LGA_ID}&state_name=${selected.state}${selected?.district ? `&senate_district=${Number(selected.district)}`:''}${selected?.constituency ? `&constituency_name=${selected.constituency}`:""}`,
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
          accessor: "LGA_ID",
          textAlignment: "left",
          title: "",
          render: (record) => (
            <button
              className="button"
              onClick={() =>
                navigate("../general-polling", {
                  state: {
                    level: "lga",
                    name: record.LGA_ID,
                    apiUrl: `getData_lga?country_name=1&lga_name=${record.LGA_ID}&state_name=${selected.state}`,
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

  return (
    <>
      <Header token={removeToken} />
      <PageWrapper>
          <>
            <div className={css.select}>
              {auth?.level_childs?.lga?.toString()?.length === 0 && <StateBox 
                searchFields={selected}
                setSearchFields={setSelected}
              />}
            
              {state?.parent == "Senate" && isEmpty(selected.state) && <DistrictBox 
                searchFields={selected}
                setSearchFields={setSelected}
              />}

              {state?.parent == "REP" && isEmpty(selected.state) && <Constituency 
                searchFields={selected}
                setSearchFields={setSelected}
              />}
            </div>

            {isFill(selected) && lgaRecordsLoading || lgaRefecthing ? (
              <Loader />
            ) : (
              isFill(selected) && <div className={css.container}>
                  {auth?.level_childs?.lga?.length === 0 && <TextInput
                    sx={{ flexBasis: "60%" }}
                    placeholder={`Total ${records.length} LGAs for ${selected.state}`}
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
            )}
          </>
      </PageWrapper>
    </>
  );
};

export default Lga;
