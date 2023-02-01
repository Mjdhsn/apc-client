import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, } from "react-router-dom";
import Header from "../../compononts/header";
import { API_URL, SECRET_KEY } from "../../config";
import css from "../analysis.module.scss";
import { BluePrint } from "../../compononts/BluePrint/BluePrint";
import useToken from '../../compononts/useToken'
import AnalysisTable from '../AnalysisTable/AnalysisTable'
import { useParams } from 'react-router-dom'

const AnalysisTablePageResult = (props) => {
    const [searchResults, setSearchResults] = useState([]);
    const { removeToken } = useToken();
    let { level_key, party } = useParams()
    var options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + props.token
        }
    }

    // getting data from API
    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(
                    API_URL + "analysis/party/data?party=" + party + "&level_key=" + level_key,
                    options
                );
                data.access_token && props.setToken(data.access_token)
                setSearchResults(data.data);
            } catch (e) {
                console.log(e);
            }
        };
        getData();
    }, []);

    const columns = React.useMemo(
        () => [
            {
                Header: "A",
                accessor: "A",
            },
            {
                Header: "AA",
                accessor: "AA",
            },
            {
                Header: "AAC",
                accessor: "AAC",
            },
            {
                Header: "ADP",
                accessor: "ADP",
            },
            {
                Header: "APC",
                accessor: "APC",
            },
            {
                Header: "APGA",
                accessor: "APGA",
            },
            {
                Header: "APM",
                accessor: "APM",
            },
            {
                Header: "APP",
                accessor: "APP",
            },
            {
                Header: "BP",
                accessor: "BP",
            },
            {
                Header: "LP",
                accessor: "LP",
            },
            {
                Header: "NNPP",
                accessor: "NNPP",
            },
            {
                Header: "NRM",
                accessor: "NRM",
            },
            {
                Header: "PDP",
                accessor: "PDP",
            },
            {
                Header: "PRP",
                accessor: "PRP",
            },
            {
                Header: "SDP",
                accessor: "SDP",
            },
            {
                Header: "YPP",
                accessor: "YPP",
            },
            {
                Header: "ZLP",
                accessor: "ZLP",
            },
            {
                Header: "Over_Votes_Value",
                accessor: "Over_Votes_Value",
            },
            {
                Header: "Total_Accredited_voters",
                accessor: "Total_Accredited_voters",
            },
            {
                Header: "Total_Registered_voters",
                accessor: "Total_Registered_voters",
            },
            {
                Header: "Total_Rejected_votes",
                accessor: "Total_Rejected_votes",
              },
              {
                Header: "Total_vote_casted",
                accessor: "Total_vote_casted",
              },
              {
                Header: "percentage_voters_turnout",
                accessor: "percentage_voters_turnout",
              },
              {
                Header: "total_valid_votes",
                accessor: "total_valid_votes",
              },
              {
                Header: "pu_name",
                accessor: "pu_name",
              },
              {
                Header: "ward_name",
                accessor: "ward_name",
              },
              {
                Header: "lga_name",
                accessor: "lga_name",
              },
              {
                Header: "state_name",
                accessor: "state_name",
              },
              {
                Header: "lga_id",
                accessor: "lga_id",
              },
              {
                Header: "ward_id",
                accessor: "ward_id",
              },
              {
                Header: "state_id",
                accessor: "state_id",
              },
            //   {
            //     Header: "remarks",
            //     accessor: "remarks",
            //   },
        ],
        []
    );

    return (
        <>
            <Header token={removeToken} />
            <div className={css.wrapper}>
                <span className={css.heading}>{party} {level_key}</span>
                <AnalysisTable
                    columns={columns}
                    data={searchResults}
                    source="analysis"
                    token={props.token}
                />
            </div>
            <BluePrint />
        </>
    );
};

export default AnalysisTablePageResult;
