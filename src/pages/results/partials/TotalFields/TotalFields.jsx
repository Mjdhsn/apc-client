import { Table } from "@mantine/core";
import React from "react";
import Loader from "../../../../compononts/Loader/Loader";
import TotalField from "../../../../compononts/TotalField/TotalField";
import css from "./TotalFields.module.scss";


const TotalFields = ({ results, isResultLoading, menuSelected, child }) => {

  if (!isResultLoading && !results) {
    return null;
  }

  return (
    <>
      <h4>Total Results</h4>
      {isResultLoading ? (
        <div className="loaderContainer">
          <Loader />
        </div>
      ) : (
        <>
          {child !== 'National' && <div className={css.container}>
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
              registered={results.total_registered_canceled_votes}
            />
            <TotalField
              label={`Collated ${menuSelected}`}
              total={results.collated}
              table={results.collated_table}
              registered={results.total_registered_collated_votes}
            />
            <TotalField
              label={`Non-Collated ${menuSelected}`}
              total={results.un_collated}
              table={results.un_collated_table}
              registered={results.total_registered_uncollated_votes}
            />
          </div>}
          
          <div className={css.puTableContainer}>
            <Table className="table">
              <thead>
                <tr>
                  {Object.keys(results?.result[0]).map((name, i) => {
                    return <th key={i}>{name.replace("_", " ")}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                <tr>
                    {
                      Object.values(results?.result[0]).map((value, j)=>{
                        return <td key={j}>{value}</td>
                      })
                    }
                </tr>;
              </tbody>
            </Table>
          </div>
        </>
      )}
    </>
  );
};

export default TotalFields;
