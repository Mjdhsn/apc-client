import React, { useState } from "react";
import Header from "../../../compononts/header";
import PageWrapper from "../../../compononts/PageWrapper/PageWrapper";
import css from "../LGA/Lga.module.scss";
import removeToken from "../../../compononts/useToken";
import { Badge, Loader, TextInput } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import useStatesName from "../../../hooks/useState";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect } from "react";
import { Search } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { authInit } from "../../../config/state";
import { useAtom } from "jotai";
import { infoPath } from "../../../config/constant";

const State = ({type="info"}) => {
  const [auth, setAuth] = useAtom(authInit)
  const [records, setRecords] = useState([]);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const navigate = useNavigate()
  const location = useLocation()  
  const { data, isLoading, error, refetch, isFetching } = useStatesName(infoPath.includes(location.pathname) ? "getStatebadge" : "getState");

  useEffect(() => {
    if (data) {
      const mrData = data[2].filter(({ STATE_NAME, STATE_ID }) => {
        if (
          debouncedQuery !== "" &&
          !`${STATE_NAME} ${STATE_ID}`
            .toLowerCase()
            .includes(debouncedQuery.trim().toLowerCase())
        ) {
          return false;
        }
        return true;
      }).sort((a, b) => a.STATE_ID - b.STATE_ID)
      
      if(auth?.role === 'admin' || auth?.role === 'pns'){
        setRecords(mrData)
      }else{
        let agentChilds = []

        if(auth?.level_childs.state){
          agentChilds.push(auth?.level_childs.state)
        }

        setRecords(mrData.filter((e) => agentChilds.includes(e.STATE_ID)))
      }

    }
  }, [debouncedQuery, data]);

  useEffect(() => {
    refetch()
  }, [location.pathname])

  if (error) {
    return "Error, while fetching list of LGAs";
  }

  // get the columns order accroding to type of page
  const getColumns = () =>{
    const columns = [
      { accessor: "STATE_ID", textAlignment: "left" },
      { accessor: "STATE_NAME", textAlignment: "left" }]
      
    if (type === "coalition") {
      columns.push({
        accessor: "STATE_ID",
        title: "Result",
        textAlignment: "left",
        render: (record) => (
          <button className="button"
          onClick={()=>
          navigate('../parties',{
            state : {
              level : "state",
              data : {
                state : record.STATE_ID,
                country: 1
              },
              names : {
                state : record.STATE_NAME,
                country: "NIGERIA"
              },
              apiUrl : `get-state-result?country_name=1&state_name=${record.STATE_ID}`
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
        accessor: "STATE_ID",
        textAlignment: "left",
        title: "",
        render: (record) => (
          <button className="button"
          onClick={()=>
          navigate('../general-polling',{
            state : {
              level : "state",
              name : record.STATE_NAME,
              apiUrl : `getData_state?country_name=1&state_name=${record.STATE_ID}`
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
        {/* selectBox */}
        {isLoading || isFetching ? (
          <Loader variant="dark" style={{ margin: "auto" }} />
        ) : (
          <div className={css.container}>
            <TextInput
              sx={{ flexBasis: "60%" }}
              placeholder={`Total ${data[2].length} States`}
              icon={<Search size={16} />}
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
            />

            <div className={css.table}>
              <DataTable
                withBorder
                columns={getColumns()}
                records={records}
              />
            </div>
          </div>
        )}
      </PageWrapper>
    </>
  );
};

export default State;
