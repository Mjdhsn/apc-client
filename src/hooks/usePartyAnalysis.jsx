import { useMutation } from "react-query";
import { useEffect, useState } from "react";
import { randomId, useListState } from "@mantine/hooks";
//
import useToken from "../compononts/useToken";
import { getResults as getResultsApi } from "../utils/api";
import { PartiesNames } from "../pages/parties/partiesNames";
import { presidentialCountryLevel, presidentialLgaLevel, presidentialPollingLevel, presidentialStateLevel, presidentialWardLevel, senateNationalLevel, senateDistrictLevel, senateLgaLevel, senatePollingLevel, senateWardLevel, repPollingLevel, repWardLevel, repLgaLevel, repConstituencyLevel, repNationalLevel } from '../config/constant';


// --- PRESIDENTIAL ----
const usePartyAnalysis = (location) => {

  // state of page
  const {
    state: { parent, child, routeLevel },
  } = location;


  //hooks for handling search
  const [selectedLevel, setSelectedLevel] = useState(child);
  const [searchFields, setSearchFields] = useState({});
  const [searchLevel, setSearchLevel] = useState(0);
  const [apiLevel, setApiLevel] = useState('');
  const [parties, setParty] = useState('ZLP');

  const [data, setData] = useState(null)
  const { token } = useToken();

  //when page changes, level changes
  useEffect(() => {
    setSelectedLevel(() => child.split(" ").join("-").toLowerCase());
  }, [location]);

  const handleSearchParams = (levelState, levelSize) => {
    setSearchFields(levelState);
    setSearchLevel(levelSize);
  };


  //when level changes, search changes
  useEffect(() => {
    selectedLevel === "polling-unit"
      ? handleSearchParams( presidentialPollingLevel, 5)
      : selectedLevel === "ward"
      ? handleSearchParams(presidentialWardLevel, 4)
      : selectedLevel === "lga"
      ? handleSearchParams(presidentialLgaLevel, 3)
      : selectedLevel === "state"
      ? handleSearchParams(presidentialStateLevel, 2)
      : selectedLevel === "country" && handleSearchParams(presidentialCountryLevel, 1);
  }, [selectedLevel]);


  //define structure of result api
  const getPartyAnalysis = () => {
    // making decision for parent level
    const apiUrl_firstPart =
      child === "Polling Unit" ? "/presidentialanalysis_polling_tab2" : 
      child === "Ward" ? "/presidentialanalysis_ward_tab2" : 
      child === "LGA" ? "/presidentialanalysis_lga_tab2":
      child === "State" ? "/presidentialanalysis_state_tab2" :
      child === "National" && "/presidentialanalysis_country_tab2"
     

    //making decision for child level
    var apiUrl_secondPart;

    if (selectedLevel === "polling-unit") {
      apiUrl_secondPart = `/pu?country_name=1&state_name=${searchFields.state}&lga_name=${searchFields.lga}&ward_name=${searchFields.ward}&pu_name=${searchFields.pollingUnit}`;
    }
    if(selectedLevel === "ward")
    {
      apiUrl_secondPart = `/ward?country_name=1&state_name=${searchFields.state}&lga_name=${searchFields.lga}&ward_name=${searchFields.ward}`
    }
    if(selectedLevel === "lga")
    {
      apiUrl_secondPart = `/lga?country_name=1&state_name=${searchFields.state}&lga_name=${searchFields.lga}`
    }
    if(selectedLevel === "state")
    {
      apiUrl_secondPart = `/state?country_name=1&state_name=${searchFields.state}`
    }
    if(selectedLevel === "country")
    {
      apiUrl_secondPart = `/country?country_name=1`
    }

    
    //getting body for request
    var body = { party_name : parties };
    
    if(apiLevel.length > 0 && !body?.level){
       body.level = apiLevel
    }


    mutate({ token, apiUrl: apiUrl_firstPart + apiUrl_secondPart, body });
  };


  //sending request
  const { mutate, isLoading } = useMutation(
    (data) => getResultsApi(data.token, data.apiUrl, data.body),
    {
      onSuccess: (data) => setData(data),
      onError: () => alert("Something went wrong"),
    }
  );
  

  return {
    selectedLevel,
    setSelectedLevel,
    searchFields,
    setSearchFields,
    searchLevel,
    parties,
    setParty,
    getPartyAnalysis,
    data,
    isLoading,
    setApiLevel,
    apiLevel,
    routeLevel,
    menuSelected : child
  };
};



// --- SENATE ----
export const useSenatePartyAnalysis = (location) => {

  // state of page
  const {
    state: { parent, child, routeLevel },
  } = location;


  //hooks for handling search
  const [selectedLevel, setSelectedLevel] = useState(child);
  const [searchFields, setSearchFields] = useState({});
  const [searchLevel, setSearchLevel] = useState(0);
  const [apiLevel, setApiLevel] = useState('');
  const [parties, setParty] = useState('ZLP');

  const [data, setData] = useState(null)
  const { token } = useToken();

  //when page changes, level changes
  useEffect(() => {
    setSelectedLevel(() => child.split(" ").join("-").toLowerCase());
  }, [location]);

  const handleSearchParams = (levelState, levelSize) => {
    setSearchFields(levelState);
    setSearchLevel(levelSize);
  };


  //when level changes, search changes
  useEffect(() => {
    selectedLevel === "polling-unit"
      ? handleSearchParams(senatePollingLevel, 5)
      : selectedLevel === "ward"
      ? handleSearchParams(senateWardLevel, 4)
      : selectedLevel === "lga"
      ? handleSearchParams(senateLgaLevel, 3)
      : selectedLevel === "district"
      ? handleSearchParams(senateDistrictLevel, 2)
      : selectedLevel === "country" && handleSearchParams(senateNationalLevel, 1);
  }, [selectedLevel]);


  //define structure of result api
  const getPartyAnalysis = () => {
    // making decision for parent level
    const apiUrl_firstPart =
      child === "Polling Unit" ? "/senateanalysis_polling_tab2" : 
      child === "Ward" ? "/senateanalysis_ward_tab2" : 
      child === "LGA" ? "/senateanalysis_lga_tab2":
      child === "State" ? "/senateanalysis_state_tab2" :
      child === "District" ? "/senateanalysis_district_tab2" :
      child === "National" && "/senateanalysis_country_tab2"

    //making decision for child level
    var apiUrl_secondPart;

    if (selectedLevel === "polling-unit") {
      apiUrl_secondPart = `/pu?country_name=1&state_name=${searchFields.state}&district_name=${searchFields.district}&lga_name=${searchFields.lga}&ward_name=${searchFields.ward}&pu_name=${searchFields.pollingUnit}`;
    }
    if(selectedLevel === "ward")
    {
      apiUrl_secondPart = `/ward?country_name=1&state_name=${searchFields.state}&district_name=${searchFields.district}&lga_name=${searchFields.lga}&ward_name=${searchFields.ward}`
    }
    if(selectedLevel === "lga")
    {
      apiUrl_secondPart = `/lga?country_name=1&state_name=${searchFields.state}&district_name=${searchFields.district}&lga_name=${searchFields.lga}`
    }
    if(selectedLevel === "district")
    {
      apiUrl_secondPart = `/district?&state_name=${searchFields.state}&district_name=${searchFields.district}`
    }
    
    
    //getting body for request
    var body = { party_name : parties };
    
    if(apiLevel.length > 0 && !body?.level){
       body.level = apiLevel
    }


    mutate({ token, apiUrl: apiUrl_firstPart + apiUrl_secondPart, body });
  };


  //sending request
  const { mutate, isLoading } = useMutation(
    (data) => getResultsApi(data.token, data.apiUrl, data.body),
    {
      onSuccess: (data) => setData(data),
      onError: () => alert("Something went wrong"),
    }
  );
  

  return {
    selectedLevel,
    setSelectedLevel,
    searchFields,
    setSearchFields,
    searchLevel,
    parties,
    setParty,
    getPartyAnalysis,
    data,
    isLoading,
    setApiLevel,
    apiLevel,
    routeLevel,
    menuSelected : child
  };
};


// --- SENATE ----
export const useRepPartyAnalysis = (location) => {

  // state of page
  const {
    state: { parent, child, routeLevel },
  } = location;


  //hooks for handling search
  const [selectedLevel, setSelectedLevel] = useState(child);
  const [searchFields, setSearchFields] = useState({});
  const [searchLevel, setSearchLevel] = useState(0);
  const [apiLevel, setApiLevel] = useState('');
  const [parties, setParty] = useState('ZLP');

  const [data, setData] = useState(null)
  const { token } = useToken();

  //when page changes, level changes
  useEffect(() => {
    setSelectedLevel(() => child.split(" ").join("-").toLowerCase());
  }, [location]);

  const handleSearchParams = (levelState, levelSize) => {
    setSearchFields(levelState);
    setSearchLevel(levelSize);
  };


  //when level changes, search changes
  useEffect(() => {
    selectedLevel === "polling-unit"
      ? handleSearchParams(repPollingLevel, 5)
      : selectedLevel === "ward"
      ? handleSearchParams(repWardLevel, 4)
      : selectedLevel === "lga"
      ? handleSearchParams(repLgaLevel, 3)
      : selectedLevel === "constituency"
      ? handleSearchParams(repConstituencyLevel, 2)
      : selectedLevel === "country" && handleSearchParams(repNationalLevel, 1);
  }, [selectedLevel]);


  //define structure of result api
  const getPartyAnalysis = () => {
    // making decision for parent level
    const apiUrl_firstPart =
      child === "Polling Unit" ? "/repanalysis_polling_tab1" : 
      child === "Ward" ? "/repanalysis_ward_tab1" : 
      child === "LGA" ? "/repanalysis_lga_tab1":
      child === "State" ? "/repanalysis_state_tab1" :
      child === "Consitituency" ? "/repanalysis_constituency_tab1" :
      child === "National" && "/repanalysis_country_tab1"

    //making decision for child level
    var apiUrl_secondPart;

    if (selectedLevel === "polling-unit") {
      apiUrl_secondPart = `/pu?country_name=1&state_name=${searchFields.state}&constituency_name=${searchFields.constituency}&lga_name=${searchFields.lga}&ward_name=${searchFields.ward}&pu_name=${searchFields.pollingUnit}`;
    }
    if(selectedLevel === "ward")
    {
      apiUrl_secondPart = `/ward?country_name=1&state_name=${searchFields.state}&constituency_name=${searchFields.constituency}&lga_name=${searchFields.lga}&ward_name=${searchFields.ward}`
    }
    if(selectedLevel === "lga")
    {
      apiUrl_secondPart = `/lga?country_name=1&state_name=${searchFields.state}&constituency_name=${searchFields.constituency}&lga_name=${searchFields.lga}`
    }
    if(selectedLevel === "constituency")
    {
      apiUrl_secondPart = `/constituency?state_name=${searchFields.state}&constituency_name=${searchFields.constituency}`
    }
    
    
    //getting body for request
    var body = { party_name : parties };
    
    if(apiLevel.length > 0 && !body?.level){
       body.level = apiLevel
    }


    mutate({ token, apiUrl: apiUrl_firstPart + apiUrl_secondPart, body });
  };


  //sending request
  const { mutate, isLoading } = useMutation(
    (data) => getResultsApi(data.token, data.apiUrl, data.body),
    {
      onSuccess: (data) => setData(data),
      onError: () => alert("Something went wrong"),
    }
  );
  

  return {
    selectedLevel,
    setSelectedLevel,
    searchFields,
    setSearchFields,
    searchLevel,
    parties,
    setParty,
    getPartyAnalysis,
    data,
    isLoading,
    setApiLevel,
    apiLevel,
    routeLevel,
    menuSelected : child
  };
};



export default usePartyAnalysis;
