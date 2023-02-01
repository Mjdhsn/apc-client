import React from "react";
//
import css from "./Result.module.scss";
//
import Loader from "../../../../../compononts/Loader/Loader";
import FirstTable from "./partials/FirstTable";
import MainTable from "./partials/MainTable";


const PartyAnalysisResult = ({ results, isResultLoading, searchLevel, apiLevel }) => {

  if (!isResultLoading && !results) {
    return null;
  }

  return (
    <>
      {isResultLoading ? (
        <div className="loaderContainer">
          <Loader />
        </div>
      ) : (
        <>
          <div className={css.container}>
            <FirstTable response={results} />
            {searchLevel !== 5 && <MainTable results={results} name={apiLevel == 'pu' ? "Polling Unit" : searchLevel == 4 ? "Polling Unit" : apiLevel} />}
          </div>
        </>
      )}
    </>
  );
};

export default PartyAnalysisResult;
