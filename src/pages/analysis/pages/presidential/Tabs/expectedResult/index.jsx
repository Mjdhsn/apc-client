import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
//
import css from "../../presidential.module.scss";
import resultCSS from './Result.module.scss'
//
import useExpectedResult from '../../../../../../hooks/useExpectedResult';
import Loader from "../../../../../../compononts/Loader/Loader";
import Message from "../../../../../../compononts/Message";
import RecordTable from './partials/RecordTable';
import PartyInfo from './partials/PartyInfo';
import GeneralRemark from './partials/GeneralRemark';


const Index = () => {
  // hook
  const location = useLocation();
  const { data, isLoading, menuSelected, isFetching } = useExpectedResult(location.state, "presidentialanalysis_polling_tab3")

  return (
    <div className={css.container}>

        {/* head */}
        <h3> Presidential Winner Prediction ({ location.state.child })</h3>

        {/* search Result */}
        <div className={resultCSS.container} >      
          {isLoading || isFetching ? (
            <div className="loaderContainer">
              <Loader />
            </div>
          ) : (
            <>
              {data && 
                <>
                  <RecordTable data={data} menuSelected={menuSelected} />

                  {data?.general_remarks && <GeneralRemark data={data.general_remarks[0].REMARKS} />}

                  <PartyInfo data={data?.party_table} />

                  <Message> {data?.messages[0].END} </Message>
                </>
              }
            </>
          )}
        </div>
        
    </div>
  )
}

export default Index