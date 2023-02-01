import axios from "axios";

export const api = axios.create({
  baseURL: `https://api.logeecai.com`,
});

export const alt_api = axios.create({
  baseURL: `https://api.logeec.com`,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`
  }
});


export const getCountry = async (token, path) => {
  try {
    const response = await alt_api.get(`/${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getStates = async (token, path) => {
  try {
    const response = await alt_api.get(`/${path}`, {
      headers: {
        Authorization: `Bearer ${token, path}`,
      },
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};


export const getLga = async (token, path, fileds) => {

  // destructure fileds
  const { state, district, constituency } = fileds

  // API path query 
  const pathQuery = `state_name=${state}${district ? `&senate_district=${district}` : ''}${constituency ? `&constituency_name=${constituency}` : ''}`

  try {
    const response = await alt_api.get(`/${path}?${pathQuery}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getDistrict = async (path, token, fields) => {

  // destructer
  const { state } = fields

  try {
    const response = await alt_api.get(`/${path}?state_name=${state}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getConstituency = async (path ,token, fields) => {
  
  // destructer
  const { state } = fields

  try {
    const response = await alt_api.get(`/${path}?state_name=${state}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};


export const getWard = async (token, path, fields) => {

  // destructure items
  const { state, lga, district, constituency } = fields
  
  // API api query
  const pathQuery = 
      `state_name=${state}${district ? `&senate_district=${district}` : ''}${constituency ? `&constituency_name=${constituency}` : ''}&lga_name=${lga}`

  try {
    const response = await alt_api.get(
      `/${path}?${pathQuery}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};




export const getPollingDropDown = async (token, path, fields) => {
  try {

    // destructure field items
    const { state, lga, wardId, district, ward, constituency } = fields
    
    // path query
    const pathQuery = 
            `state_name=${state}${constituency ? `&constituency_name=${constituency}` : ""}${district ? `&senate_district=${district}` : ""}&lga_name=${lga}${wardId ? `&wardID=${wardId}` : ""}${ward ? `&ward_name=${ward}` : ""}`

    const response = await alt_api.get(
      `/${path}?${pathQuery}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getCoalition = async (token, apiUrl) => {
  try {
    const response = await alt_api.get(`${apiUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateCoalition = async (token, apiUrl, data) => {
  try {
    const response = await alt_api.post(`${apiUrl}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getPolling = async (token, apiUrl) => {
  try {
    const response = await alt_api.get(`${apiUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};


export const getResults = async (token, apiUrl, data) => {
  try {
    const response = await alt_api.post(`${apiUrl}`, data);

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};


export const getComparism = async ( apiUrl ) => {
  try {
    const response = await alt_api.get(`${apiUrl}`);

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};


export const getAnalysis = async ( apiUrl ) => {
  try {
    const response = await alt_api.get(`${apiUrl}`);

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};



export const getExpResult = async (token, apiUrl, apiFirst) => {
  try {
    const response = await alt_api.get(`${apiFirst}/${apiUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
