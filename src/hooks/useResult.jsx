import { useEffect } from "react";
import { useState } from "react";
import { randomId, useListState } from "@mantine/hooks";
import { PartiesNames } from "../pages/parties/partiesNames";
import { getResults as getResultsApi } from "../utils/api";
import useToken from "../compononts/useToken";
import { useMutation } from "react-query";
import { presidentialCountryLevel, presidentialLgaLevel, presidentialPollingLevel, presidentialStateLevel, presidentialWardLevel, repConstituencyLevel, repLgaLevel, repPollingLevel, repWardLevel, senateDistrictLevel, senateLgaLevel, senatePollingLevel, senateWardLevel } from "../config/constant";


// ------ PRESIDENTIAL ------
const usePresidentialResult = (location) => {
  // state of page
  const {
    state: { parent, child, routeLevel },
  } = location;

  //hooks for handling search
  const [selectedLevel, setSelectedLevel] = useState(child);
  const [searchFields, setSearchFields] = useState({});
  const [searchLevel, setSearchLevel] = useState(0);
  const [parties, partyHandlers] = useListState(
    PartiesNames.map((party) => {
      return { label: party, checked: true, key: randomId() };
    })
  );
  const [results, setResults] = useState(null)
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
      ? handleSearchParams(presidentialPollingLevel, 5)
      : selectedLevel === "ward"
      ? handleSearchParams(presidentialWardLevel, 4)
      : selectedLevel === "lga"
      ? handleSearchParams(presidentialLgaLevel, 3)
      : selectedLevel === "state"
      ? handleSearchParams(presidentialStateLevel, 2)
      : selectedLevel === "country" && handleSearchParams(presidentialCountryLevel, 1);
  }, [selectedLevel]);

  //define structure of result api
  const getResults = () => {
    // making decision for parent level
    const apiUrl_firstPart =
      child === "Polling Unit" ? "/presidentialresults_polling" : 
      child === "Ward" ? "/presidentialresults_ward" : 
      child === "LGA" ? "/presidentialresults_lga":
      child === "State" ? "/presidentialresults_state" :
      child === "National" && "/presidentialresults_country"
     

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
    var body = {};
    var i = 0;
    parties.map((party) => {
      if (party.checked) {
        i++;
        body[i] = party.label;
      }
    });

    mutate({ token, apiUrl: apiUrl_firstPart + apiUrl_secondPart, body });
  };

  //sending request
  const { mutate, isLoading } = useMutation(
    (data) => getResultsApi(data.token, data.apiUrl, data.body),
    {
      onSuccess: (data) => setResults(data),
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
    getResults,
    results,
    isResultLoading: isLoading,
    routeLevel,
    menuSelected : child
  };
};


// ------ SENATE ------
export const useSenateResult = (location) => {
  // state of page
  const {
    state: { parent, child, routeLevel },
  } = location;

  //hooks for handling search
  const [selectedLevel, setSelectedLevel] = useState(child);
  const [searchFields, setSearchFields] = useState({});
  const [searchLevel, setSearchLevel] = useState(0);
  const [parties, partyHandlers] = useListState(
    PartiesNames.map((party) => {
      return { label: party, checked: true, key: randomId() };
    })
  );
  const [results, setResults] = useState(null)
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
      ? handleSearchParams(senatePollingLevel, 4)
      : selectedLevel === "ward"
      ? handleSearchParams(senateWardLevel, 3)
      : selectedLevel === "lga"
      ? handleSearchParams(senateLgaLevel, 2)
      : selectedLevel === "district"
      && handleSearchParams(senateDistrictLevel, 1)
  }, [selectedLevel]);

  //define structure of result api
  const getResults = () => {
    // making decision for parent level
    const apiUrl_firstPart =
      child === "Polling Unit" ? "/senateresults_polling" : 
      child === "Ward" ? "/senateresults_ward" : 
      child === "LGA" ? "/senateresults_lga":
      child === "State" ? "/senateresults_state" :
      child === "National" && "/senateresults_country"

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
      apiUrl_secondPart = `/state?country_name=1`
    }


    
    //getting body for request
    var body = {};
    var i = 0;
    parties.map((party) => {
      if (party.checked) {
        i++;
        body[i] = party.label;
      }
    });

    mutate({ token, apiUrl: apiUrl_firstPart + apiUrl_secondPart, body });
  };

  //sending request
  const { mutate, isLoading } = useMutation(
    (data) => getResultsApi(data.token, data.apiUrl, data.body),
    {
      onSuccess: (data) => setResults(data),
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
    getResults,
    results,
    isResultLoading: isLoading,
    routeLevel,
    menuSelected : child
  };
};


// ------ SENATE ------
export const useRepResult = (location) => {
  // state of page
  const {
    state: { parent, child, routeLevel },
  } = location;

  //hooks for handling search
  const [selectedLevel, setSelectedLevel] = useState(child);
  const [searchFields, setSearchFields] = useState({});
  const [searchLevel, setSearchLevel] = useState(0);
  const [parties, partyHandlers] = useListState(
    PartiesNames.map((party) => {
      return { label: party, checked: true, key: randomId() };
    })
  );
  const [results, setResults] = useState(null)
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
      ? handleSearchParams(repPollingLevel, 4)
      : selectedLevel === "ward"
      ? handleSearchParams(repWardLevel, 3)
      : selectedLevel === "lga"
      ? handleSearchParams(repLgaLevel, 2)
      : selectedLevel === "constituency"
      && handleSearchParams(repConstituencyLevel, 1)
  }, [selectedLevel]);

  //define structure of result api
  const getResults = () => {
    // making decision for parent level
    const apiUrl_firstPart =
      child === "Polling Unit" ? "/represults_polling" : 
      child === "Ward" ? "/represults_ward" : 
      child === "LGA" ? "/represults_lga":
      child === "State" ? "/represults_state" :
      child === "National" && "/represults_country"

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
      apiUrl_secondPart = `/state?country_name=1`
    }


    
    //getting body for request
    var body = {};
    var i = 0;
    parties.map((party) => {
      if (party.checked) {
        i++;
        body[i] = party.label;
      }
    });

    mutate({ token, apiUrl: apiUrl_firstPart + apiUrl_secondPart, body });
  };

  //sending request
  const { mutate, isLoading } = useMutation(
    (data) => getResultsApi(data.token, data.apiUrl, data.body),
    {
      onSuccess: (data) => setResults(data),
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
    getResults,
    results,
    isResultLoading: isLoading,
    routeLevel,
    menuSelected : child
  };
};


export default usePresidentialResult;
