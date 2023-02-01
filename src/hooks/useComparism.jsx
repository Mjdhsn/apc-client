import { useEffect } from "react";
import { useState } from "react";
import { useMutation } from "react-query";
import { randomId, useListState } from "@mantine/hooks";
//
import { PartiesNames } from "../pages/parties/partiesNames";
import { getComparism } from "../utils/api";
import useToken from "../compononts/useToken";
import { CPCountryLevel, CPLgaLevel, CPPolling, CPStateLevel, CPWardLevel, CRConstituencyLevel, CRLgaLevel, CRWardLevel, CSDistrictLevel, CSLgaLevel, CSWardLevel } from "../config/constant";


// ----- PRESIDENTIAL ----
const usePresidential = () => {

  //hooks for handling search
  const [selectedLevel, setSelectedLevel] = useState("ward");
  const [searchFields, setSearchFields] = useState({});
  const [searchLevel, setSearchLevel] = useState(0);
  const [parties, partyHandlers] = useListState(
    PartiesNames.map((party) => {
      return { label: party, checked: false, key: randomId() };
    })
  );
  const [data, setData] = useState(null)
  const { token } = useToken();

  const handleSearchParams = (levelState, levelSize) => {
    setSearchFields(levelState);
    setSearchLevel(levelSize);
  };

  //when level changes, search changes
  useEffect(() => {
      selectedLevel === "ward"
      ? handleSearchParams(CPWardLevel, 4)
      : selectedLevel === "lga"
      ? handleSearchParams(CPLgaLevel, 3)
      : selectedLevel === "state"
      ? handleSearchParams(CPStateLevel, 2)
      : selectedLevel === "country" && handleSearchParams(CPCountryLevel, 1);
  }, [selectedLevel]);


  //define structure of result api
  const getPresidential = () => {
    // making decision for parent level
    const apiUrl_firstPart =  "/presidentialanalysis_polling_comparism"
     
    //making decision for child level
    var apiUrl_secondPart;

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

    mutate({ token, apiUrl: apiUrl_firstPart + apiUrl_secondPart });
  };


  //sending request
  const { mutate, isLoading } = useMutation(
    (data) => getComparism(data.apiUrl),
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
    partyHandlers,
    getPresidential,
    data,
    isLoading
  };
};


// ----- SENATE ----
const useSenate = () => {

  //hooks for handling search
  const [selectedLevel, setSelectedLevel] = useState("ward");
  const [searchFields, setSearchFields] = useState({});
  const [searchLevel, setSearchLevel] = useState(0);

  const [data, setData] = useState(null)
  const { token } = useToken();


  const handleSearchParams = (levelState, levelSize) => {
    setSearchFields(levelState);
    setSearchLevel(levelSize);
  };

  //when level changes, search changes
  useEffect(() => {
      selectedLevel === "ward"
      ? handleSearchParams(CSWardLevel, 3)
      : selectedLevel === "lga"
      ? handleSearchParams(CSLgaLevel, 2)
      : selectedLevel === "district" && handleSearchParams(CSDistrictLevel, 1);
  }, [selectedLevel]);


  //define structure of result api
  const getSenate = () => {

    // making decision for parent level
    const apiUrl_firstPart = "/senateanalysis_polling_comparism"
     
    //making decision for child level
    var apiUrl_secondPart;

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
      apiUrl_secondPart = `/district?country_name=1&state_name=${searchFields.state}&district_name=${searchFields.district}`
    }

    mutate({ token, apiUrl: apiUrl_firstPart + apiUrl_secondPart });
  };


  //sending request
  const { mutate, isLoading } = useMutation(
    (data) => getComparism(data.apiUrl),
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
    getSenate,
    data,
    isLoading
  };
};


// ----- REP ----
const useRep = () => {

  //hooks for handling search
  const [selectedLevel, setSelectedLevel] = useState("ward");
  const [searchFields, setSearchFields] = useState({});
  const [searchLevel, setSearchLevel] = useState(0);

  const [data, setData] = useState(null)
  const { token } = useToken();


  const handleSearchParams = (levelState, levelSize) => {
    setSearchFields(levelState);
    setSearchLevel(levelSize);
  };


  //when level changes, search changes
  useEffect(() => {
      selectedLevel === "ward"
      ? handleSearchParams(CRWardLevel, 3)
      : selectedLevel === "lga"
      ? handleSearchParams(CRLgaLevel, 2)
      : selectedLevel === "constituency" && handleSearchParams(CRConstituencyLevel, 1);
  }, [selectedLevel]);


  //define structure of result api
  const getPresidential = () => {
    // making decision for parent level
    const apiUrl_firstPart = "/repanalysis_polling_comparism"
     
    //making decision for child level
    var apiUrl_secondPart;

    if(selectedLevel === "ward")
    {
      apiUrl_secondPart = `/ward?country_name=1&state_name=${searchFields.state}&lga_name=${searchFields.lga}&ward_name=${searchFields.ward}`
    }
    if(selectedLevel === "lga")
    {
      apiUrl_secondPart = `/lga?country_name=1&state_name=${searchFields.state}&lga_name=${searchFields.lga}`
    }
    if(selectedLevel === "constituency")
    {
      apiUrl_secondPart = `/constituency?country_name=1&state_name=${searchFields.state}&constituency_name=${searchFields.constituency}`
    }

    mutate({ token, apiUrl: apiUrl_firstPart + apiUrl_secondPart });
  };


  //sending request
  const { mutate, isLoading } = useMutation(
    (data) => getComparism(data.apiUrl),
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
    getPresidential,
    data,
    isLoading
  };
};



export { usePresidential, useSenate, useRep }