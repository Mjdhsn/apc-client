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
import useConstituency from "../../../hooks/useConstituency";
import StateBox from "../../../compononts/SelectBoxes/StateBox";
import { isFill } from "../../../utils/isFill";
import { infoPath } from "../../../config/constant";


const Constituency = ({type="info"}) => {
  const [auth, setAuth] = useAtom(authInit)
  const location = useLocation()
  const [selected, setSelected] = useState({ state : auth?.level_childs?.state ? auth?.level_childs?.state : "" })
  const { data, isLoading, error, refetch, isRefetching } = useConstituency(infoPath.includes(location.pathname) ?  "getRepbadge" : "getRepConstituency", { state : selected.state });
  const [records, setRecords] = useState([]);
  const [query, setQuery] = useState(auth?.level_childs?.constituency ? auth?.level_childs?.constituency.toString() : "");
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      const mrData = data[2].filter(({ CONSTITUENCY_NAME, CONST_ID }) => {
        if (
          debouncedQuery !== "" &&
          !`${CONSTITUENCY_NAME} ${CONST_ID}`
            .toLowerCase()
            .includes(debouncedQuery.trim().toLowerCase())
        ) {
          return false;
        }
        return true;
      })
      
      setRecords(mrData)
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
      { accessor: "CONST_ID", title: "Constituency Id", textAlignment: "left" },
      { accessor: "CONSTITUENCY_NAME", title: "Constituency Id", textAlignment: "left" }]

    if (type === "coalition") {
      columns.push({
        accessor: "CONST_ID",
        title: "Result",
        textAlignment: "left",
        render: (record) => (
          <button className="button"
            onClick={()=>
            navigate('../parties',{
              state : {
                level : "constituency",
                data : {
                  state : selected.state,
                  constituency : record.CONST_ID,
                  country: 1
                },
                names : {
                  state : record.STATE_NAME,
                  constituency : record.CONSTITUENCY_NAME,
                  country: "NIGERIA"
                },
                apiUrl : `get-rep-constituency-result?country_name=1&state_name=${selected.state}&constituency_name=${record.CONST_ID}`
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
            {record.images}
          </Badge>
        ),
      },
      {
        accessor: "videos",
        textAlignment: "left",
        render: (record) => (
          <Badge variant="filled" color="red">
            {record.videos}
          </Badge>
        ),
      },
      {
        accessor: "CONST_ID",
        textAlignment: "left",
        title: "",
        render: (record) => (
          <button className="button"
          onClick={()=>
          navigate('../general-polling',{
            state : {
              level : "state",
                name : record.STATE_NAME,
              apiUrl : `getData_constituency?country_name=1&state_name=${selected.state}&constituency_name=${record.CONST_ID}`
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
            {auth?.level_childs?.constituency?.toString()?.length === 0 && <div className={css.select}>
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
                  {auth?.level_childs?.constituency?.toString().length === 0 &&  <TextInput
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

export default Constituency;
