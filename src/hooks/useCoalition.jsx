import useToken from "../compononts/useToken";
import useCoalitionApi from "./useCoalitionApi";
import { updateCoalition as updateCoalitionApi } from "../utils/api";


const useCoalition = (props) => {
  const { level, data: levelData, names, apiUrl } = props;
  const coalitionData = useCoalitionApi(apiUrl);
  const { token } = useToken();

  const getName = () => {
    if(level === "country") return names.country;
    if(level === "state") return names.state;
    if(level === "lga" || level === 'senate-lga' || level === 'rep-lga') return names.lga
    if(level === 'ward' || level === 'senate-ward' || level === 'rep-ward') return names.ward;
    if(level === 'pu' || level === 'senate-pu' || level === 'rep-pu') return names.pu;
    if(level === 'district') return names.district;
    if(level === 'constituency') return names.constituency;
  };

  const updateCoalition = (name,type, data) => {
    if (level === 'country')
    {
      return type === "update"? updateCoalitionApi(token,`update-country?country_name=1` , data) :
      updateCoalitionApi(token, `cancel-country?country_name=1`, data)
    }
    if(level === 'state')
    {
      return type === 'update'? updateCoalitionApi(token, `update-state?country_name=1&state_name=${levelData.state}`, data) :
      updateCoalitionApi(token, `cancel-state?country_name=1&state_name=${levelData.state}`, data)
    }
    if(level === 'lga')
    {
      return type === 'update'? updateCoalitionApi(token, `update-lga?country_name=1&state_name=${levelData.state}&lga_name=${levelData.lga}`, data) :
      updateCoalitionApi(token, `cancel-lga?country_name=1&state_name=${levelData.state}&lga_name=${levelData.lga}`, data)
    }
    if(level === 'senate-lga')
    {
      return type === 'update'? updateCoalitionApi(token, `update-sen-lga?country_name=1&state_name=${levelData.state}${levelData.district ? `&senate_district=${levelData.district}`:""}&lga_name=${levelData.lga}`, data) :
      updateCoalitionApi(token, `cancel-sen-lga?country_name=1&state_name=${levelData.state}${levelData.district ? `&senate_district=${levelData.district}`:""}&lga_name=${levelData.lga}`, data)
    }
    if(level === 'rep-lga')
    {
      return type === 'update'? updateCoalitionApi(token, `update-rep-lga?country_name=1&state_name=${levelData.state}${levelData.constituency ? `&constituency_name=${levelData.constituency}`:""}&lga_name=${levelData.lga}`, data) :
      updateCoalitionApi(token, `cancel-rep-lga?country_name=1&state_name=${levelData.state}${levelData.constituency ? `&constituency_name=${levelData.constituency}`:""}&lga_name=${levelData.lga}`, data)
    }
    if(level==="ward")
    {
      return type === 'update'? updateCoalitionApi(token, `update-ward?country_name=1&state_name=${levelData.state}&lga_name=${levelData.lga}&ward_name=${levelData.ward}`, data) :
      updateCoalitionApi(token, `cancel-ward?country_name=1&state_name=${levelData.state}&lga_name=${levelData.lga}&ward_name=${levelData.ward}`, data)
    }
    if(level==="senate-ward")
    {
      return type === 'update'? updateCoalitionApi(token, `update-sen-ward?country_name=1&state_name=${levelData.state}&lga_name=${levelData.lga}${levelData.district ? `&senate_district=${levelData.district}`:""}&ward_name=${levelData.ward}`, data) :
      updateCoalitionApi(token, `cancel-sen-ward?country_name=1&state_name=${levelData.state}&lga_name=${levelData.lga}${levelData.district ? `&senate_district=${levelData.district}`:""}&ward_name=${levelData.ward}`, data)
    }
    if(level==="rep-ward")
    {
      return type === 'update'? updateCoalitionApi(token, `update-rep-ward?country_name=1&state_name=${levelData.state}&lga_name=${levelData.lga}${levelData.constituency ? `&constituency_name=${levelData.constituency}`:""}&ward_name=${levelData.ward}`, data) :
      updateCoalitionApi(token, `cancel-rep-ward?country_name=1&state_name=${levelData.state}&lga_name=${levelData.lga}${levelData.constituency ? `&constituency_name=${levelData.constituency}`:""}&ward_name=${levelData.ward}`, data)
    }
    if(level==="pu")
    {
      return type === 'update'? updateCoalitionApi(token, `update-pu?country_name=1&state_name=${levelData.state}&lga_name=${levelData.lga}&ward_name=${levelData.ward}&pu_name=${levelData.pu}`, data) :
      updateCoalitionApi(token, `cancel-pu?country_name=1&state_name=${levelData.state}&lga_name=${levelData.lga}&ward_name=${levelData.ward}&pu_name=${levelData.pu}`, data)
    }
    if(level==="senate-pu")
    {
      return type === 'update'? updateCoalitionApi(token, `update-sen-pu?country_name=1&state_name=${levelData.state}&lga_name=${levelData.lga}&ward_name=${levelData.ward}${levelData.district ? `&senate_district=${levelData.district}`:""}&pu_name=${levelData.pu}`, data) :
      updateCoalitionApi(token, `cancel-sen-pu?country_name=1&state_name=${levelData.state}&lga_name=${levelData.lga}&ward_name=${levelData.ward}${levelData.district ? `&senate_district=${levelData.district}`:""}&pu_name=${levelData.pu}`, data)
    }
    if(level==="rep-pu")
    {
      return type === 'update'? updateCoalitionApi(token, `update-rep-pu?country_name=1&state_name=${levelData.state}&lga_name=${levelData.lga}&ward_name=${levelData.ward}${levelData.constituency ? `&constituency_name=${levelData.constituency}`:""}&pu_name=${levelData.pu}`, data) :
      updateCoalitionApi(token, `cancel-rep-pu?country_name=1&state_name=${levelData.state}&lga_name=${levelData.lga}${levelData.constituency ? `&constituency_name=${levelData.constituency}`:""}&ward_name=${levelData.ward}&pu_name=${levelData.pu}`, data)
    }
    if(level==="district")
    {
      return type === 'update'? updateCoalitionApi(token, `update-sen-district?country_name=1&state_name=${levelData.state}${levelData.district ? `&senate_district=${levelData.district}`:""}`, data) :
      updateCoalitionApi(token, `cancel-sen-district?country_name=1&state_name=${levelData.state}${levelData.district ? `&senate_district=${levelData.district}`:""}`, data)
    }
    if(level==="constituency")
    {
      return type === 'update'? updateCoalitionApi(token, `update-rep-constituency-district?country_name=1&state_name=${levelData.state}${levelData.constituency ? `&constituency_name=${levelData.constituency}`:""}`, data) :
      updateCoalitionApi(token, `cancel-rep-constituency?country_name=1&state_name=${levelData.state}${levelData.constituency ? `&constituency_name=${levelData.constituency}`:""}`, data)
    }
  }

  return { name: getName(), data: coalitionData, updateCoalition };
};

export default useCoalition;
