import { DataTable } from "mantine-datatable";
//
import css from "./Result.module.scss";
//
import Loader from "../../../../../compononts/Loader/Loader";
import Country from "./partials/Country";
import TotalField from "../../../../../compononts/TotalField/TotalField";
import Graph from "./partials/Graph";


const AnalysisByResult = ({ results, isLoading, menuSelected }) => {

  // table data records
  const records = [
    { label : "total registered voters", value :  results?.total_registered_voters[0]?.TOTAL_REGISTERED_VOTERS },
    { label : "total accredited voters", value : results?.total_accredited_voters[0]?.TOTAL_ACCREDITED_VOTERS },
    { label : "total rejected voters", value : results?.total_rejected_votes[0]?.TOTAL_REJECTED_VOTES },
    { label : "total votes casted", value : results?.total_vote_casted[0]?.TOTAL_VOTE_CASTED},
    { label : "total valid votes", value : results?.total_valid_votes[0]?.TOTAL_VALID_VOTES },
    { label : "percentage turnout", value : results?.percentage_voters_turnout[0]?.PERCENTAGE_VOTERS_TURNOUT },
  ]

  if (!isLoading && !results) {
    return null;
  }

  return (
    <>      
      {isLoading ? (
        <div className="loaderContainer">
          <Loader />
        </div>
      ) : (
        <>
          <div className={css.container}>
            {!results.total ?
               <Country results={results} />

               :

              <div className={css.container}>
                      <TotalField
                        label={`Total ${menuSelected}`}
                        total={results.total}
                        table={results.total_registered_votes_table}
                        registered={results.total_registered_votes}
                      />

                      <TotalField
                        label={`Canceled ${menuSelected}`}
                        total={results.canceled}
                        table={results.canceled_table}
                        registered={results.total_registered_canceled_voters}
                      />

                      <TotalField
                        label={`Collated ${menuSelected}`}
                        total={results.collated}
                        table={results.collated_table}
                        registered={results.total_registered_collated_voters}
                      />

                      <TotalField
                        label={`Non-Collated ${menuSelected}`}
                        total={results.un_collated}
                        table={results.un_collated_table}
                        registered={results.total_registered_uncollated_voters}
                      />

                      <div className={css.outheadContainer} >
                        <DataTable
                          className='without-head'
                          withBorder
                          withColumnBorders
                          columns={[
                            { accessor: "label", textAlignment: "left" },
                            { accessor: "value", textAlignment: "center" },
                          ]}
                          records={records.splice(0,3)}
                        /> 

                        <DataTable
                          className='without-head'
                          withBorder
                          withColumnBorders
                          columns={[
                            { accessor: "label", textAlignment: "left" },
                            { accessor: "value", textAlignment: "center" },
                          ]}
                          records={records.splice(0,3)}
                        /> 
                      </div>
                      
                      <div className={css.last_field} >
                        <TotalField
                          label={`Over-Voting ${menuSelected}`}
                          total={results.over_voting}
                          table={results.over_voting_table}
                          registered={results.total_over_voting}
                          secondLabel="Total Over-Voting Votes"
                        />
                      </div>

                      <Graph data={results?.party_graph} />
              </div>                   
            } 
          </div>
        </>
      )}
    </>
  );
};

export default AnalysisByResult;
