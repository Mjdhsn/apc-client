import React, { useState } from "react";
import Header from "../../../compononts/header";
import PageWrapper from "../../../compononts/PageWrapper/PageWrapper";
import css from "../LGA/Lga.module.scss";
import removeToken from "../../../compononts/useToken";
import { Badge, Loader, TextInput } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect } from "react";
import { Search } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { authInit } from "../../../config/state";
import { useAtom } from "jotai";
import useDistrict from "../../../hooks/useDistrict";
import StateBox from "../../../compononts/SelectBoxes/StateBox";
import { infoPath } from "../../../config/constant";
import { isFill } from "../../../utils/isFill";


const District = ({type="info"}) => {
  const [auth, setAuth] = useAtom(authInit)
  const location = useLocation()
  const [selected, setSelected] = useState({ state : auth?.level_childs?.state ? auth?.level_childs?.state : "" })
  const { data, isLoading, error, refetch, isRefetching } = useDistrict(infoPath.includes(location.pathname) ?  "getSenatebadge" : "getSenateDistricts", { state : selected.state });
  const [records, setRecords] = useState([]);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      const mrData = data[2].filter(({ DISTRICT_NAME, DISTRICT_ID }) => {
        if (
          debouncedQuery !== "" &&
          !`${DISTRICT_NAME} ${DISTRICT_ID}`
            .toLowerCase()
            .includes(debouncedQuery.trim().toLowerCase())
        ) {
          return false;
        }
        return true;
      })
      
      if(auth?.role === 'admin' || auth?.role === 'sss'){
        setRecords(mrData)
      }else{
        setRecords(mrData.filter((e) => e.DISTRICT_NAME == auth?.level_childs?.district))
      }

    }
  }, [debouncedQuery, data]);

  useEffect(() => {
    if(isFill(selected)){
      refetch()
    }
  }, [selected])


  if (error) {
    return "Error, while fetching list of LGAs";
  }

  // get the columns order accroding to type of page
  const getColumns = () =>{
    const columns = [
      { accessor: "DISTRICT_ID",title: "District id", textAlignment: "left" },
      { accessor: "DISTRICT_NAME",title: "District name", textAlignment: "left" }
    ]

    if (type === "coalition") {
      columns.push({
        accessor: "DISTRICT_ID",
        title: "Result",
        textAlignment: "left",
        render: (record) => (
          <button className="button"
            onClick={()=>
            navigate('../parties',{
              state : {
                level : "district",
                data : {
                  state : selected.state,
                  district : Number(record.DISTRICT_ID),
                  country: 1
                },
                names : {
                  state : record.STATE_NAME,
                  district : record.DISTRICT_NAME,
                  country: "NIGERIA"
                },
                apiUrl : `get-sen-district-result?country_name=1&state_name=${selected.state}&senate_district=${Number(record.DISTRICT_ID)}`
              }
            })}
          >
            Collate
          </button>
        ),
      });
    }
    else{
      columns.push( {
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
        accessor: "district_id",
        textAlignment: "left",
        title: "",
        render: (record) => (
          <button className="button"
          onClick={()=>
          navigate('../general-polling',{
            state : {
              level : "state",
              name : record.STATE_NAME,
              apiUrl : `getData_senateDistricts?country_name=1&state_name=${selected.state}&senate_district=${record.DISTRICT_ID}`
            }
          })}
          >
            Result
          </button>
        ),
      })
    }

    return columns
  }


  return (
    <>
      <Header token={removeToken} />
      <PageWrapper>
        <>
            {auth?.level_childs?.district?.toString()?.length === 0 && <div className={css.select}>
              <StateBox
                searchFields={selected}
                setSearchFields={setSelected}
              />
            </div>}

            {/* selectBox */}
            {selected.state !== "" && isLoading || isRefetching ? (
              <Loader variant="dark" style={{ margin: "auto" }} />
            ) : (
              selected.state !== "" && (
                <div className={css.container}>
                  {records?.length > 1 &&  <TextInput
                    sx={{ flexBasis: "60%" }}
                    placeholder={`Total ${data[2].length} States`}
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

export default District;
