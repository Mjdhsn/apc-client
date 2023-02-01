import { Badge, Button, Loader } from "@mantine/core";
import React, { useEffect } from "react";
import Header from "../../../compononts/header";
import useCountry from "../../../hooks/useCountry";
import removeToken from "../../../compononts/useToken";
import css from "../LGA/Lga.module.scss";

import PageWrapper from "../../../compononts/PageWrapper/PageWrapper";
import { DataTable } from "mantine-datatable";
import { useLocation, useNavigate } from "react-router-dom";
import { infoPath } from "../../../config/constant";

const Country = ({ type = "info" }) => {
  const location = useLocation()
  const { data, error, isLoading, refetch, isFetching } = useCountry(infoPath.includes(location.pathname) ? "getCountrybadge" : "getCountry");
  const navigate = useNavigate();

  useEffect(() => {
    refetch()
  }, [location.pathname])

  if (error) {
    return <span>Error</span>;
  }

  const getColumns = () => {
    const columns = [
      { accessor: "COUNTRY_ID", textAlignment: "left" },
      { accessor: "COUNTRY_NAME", textAlignment: "left" },
    ];
    if (type === "coalition") {
      columns.push({
        accessor: "COUNTRY_ID",
        title: "Result",
        textAlignment: "left",
        render: (record) => (
          <button
            className="button"
            onClick={() =>
              navigate("../parties", {
                state: {
                  level: "country",
                  data: {
                    country: 1,
                  },
                  names : {
                    country: "NIGERIA"
                  },
                  apiUrl: `get-country-result?country_name=1`,
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
          accessor: "COUNTRY_ID",
          title: "",
          render : (record)=> (
            <Button
            onClick={()=>{
              navigate('../general-polling', {
                state : {
                  level : "country",
                  name : record.COUNTRY_NAME,
                  apiUrl : `getData_country?country_name=1`
                }
              })
            }}
            color="dark" compact>Results</Button>
          ),
          textAlignment: 'left'
        }
      );
    }
    return columns;
  };

  return (
    <>
      <Header token={removeToken} />
      <PageWrapper>
        {isLoading || isFetching ? (
          <Loader style={{ margin: "auto" }} color="#30a652" />
        ) : (
          <div className={css.container}>
            <DataTable
              className={css.table}
              withBorder
              columns={getColumns()}
              records={data[2]}
            />
          </div>
        )}
      </PageWrapper>
    </>
  );
};

export default Country;
