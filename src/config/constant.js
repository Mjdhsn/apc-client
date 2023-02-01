//
import { useAtom } from "jotai";
import { authInit } from "./state";


const pollingLevel = {
    lga: "",
    ward: "",
    pollingUnit: "",
};

const wardLevel = {
    lga: "",
    ward: "",
};

const lgaLevel = { lga: "" };

// ---------------- analysis ---------------------

// ---- SENATE ------
export const senatePollingLevel = {
    ...pollingLevel,
    state : "",
    district: "",
}

export const senateWardLevel = {
    ...wardLevel,
    state : "",
    district: "",
}

export const senateLgaLevel = {
    ...lgaLevel,
    state : "",
    district: "",
}

export const senateDistrictLevel = { state: "", district : "" };
export const senateNationalLevel = { state: "" };


// ---- REP ------
export const repPollingLevel = {
    ...pollingLevel,
    state : "",
    constituency: "",
}

export const repWardLevel = {
    ...wardLevel,
    state : "",
    constituency: "",
}

export const repLgaLevel = {
    ...lgaLevel,
    state : "",
    constituency: "",
}

export const repConstituencyLevel = { state: "", constituency : "" };
export const repNationalLevel = { state: "" };


// ---------- PRESIDENTIAL ----------
export const presidentialPollingLevel = {
    ...pollingLevel,
    country: 1,
    state: "",
}

export const presidentialWardLevel = {
    ...wardLevel,
    country: 1,
    state: "",
}

export const presidentialLgaLevel = {
    ...lgaLevel,
    country: 1,
    state: ""
}

export const presidentialStateLevel = { country: 1, state: "" };
export const presidentialCountryLevel = { country: 1 };



// ----------------- COMPARISM ------------------

// --- PRESIDENTIAL ----
export const CPPolling = {
    ...pollingLevel,
    country: 1,
    state: "",
}

export const CPWardLevel = {
    ...wardLevel,
    country: 1,
    state: "",
}

export const CPLgaLevel = {
    ...lgaLevel,
    country: 1,
    state: ""
}

export const CPStateLevel = { country: 1, state: "" };
export const CPCountryLevel = { country: 1 };



// ---- SENATE ------

export const CSWardLevel = {
    ...wardLevel,
    state: "", 
    district : ""
}

export const CSLgaLevel = {
    ...lgaLevel,
    state: "", 
    district : ""
}

export const CSDistrictLevel = { state: "", district : "" };



// ---- REP ------

export const CRWardLevel = {
    ...wardLevel,
    state: "", 
    constituency : ""
}

export const CRLgaLevel = {
    ...lgaLevel,
    state: "", 
    constituency : ""
}

export const CRConstituencyLevel = { state: "", constituency : "" };



// ----------- USER MANAGEMENT SIDE NAV DATA ------------
export const sideNav = [ "Users", "Add User" ]

export const bodytitle = [ "User list", "Add User" ]

export const levelData = [ "Presidential", "Senate", "REP" ]

export const roleData = {
    admin : [ 'admin', "pns", "sss", "rss" ],
    pns : [ "pss" ],
    pss : [ "pls" ],
    pls : [ "pws" ],
    pws : [ "ppa" ],
    sss : [ "sds" ],
    sds : [ "sls" ],
    sls : [ "sws" ],
    sws : [ "spa" ],
    rss : [ "rcs" ],
    rcs : [ "rls" ],
    rls : [ "rws" ],
    rws : [ "rpa" ],
}

export const levelNext = {
    presidential : [ "Polling Unit", "Ward", "Lga", "State", "National" ],
    senate : [ "Polling Unit", "Ward", "Lga", "Senate District" ],
    rep : [ "Polling Unit", "Ward", "Lga", "Constituency" ],
}

export const adminRoute = {
    presidential : [ "admin", "pns" ],
    senate : [ "admin", "sss" ],
    rep : [ "admin", "rss" ],
}

export const conditionalRoute = {
    pns : [ "presidential", "national" ],
    pss : [ "presidential", "state" ],
    pls : [ "presidential", "lga" ],
    pws : [ "presidential", "ward" ],
    ppa : [ "presidential", "polling unit" ],
    sss : [ "senate", "district" ],
    sds : [ "senate", "district" ],
    sls : [ "senate", "lga" ],
    sws : [ "senate", "ward" ],
    spa : [ "senate", "polling unit" ],
    rss : [ "rep", "consitituency" ],
    rcs : [ "rep", "consitituency", "lga" ],
    rls : [ "rep", "lga" ],
    rws : [ "rep", "ward" ],
    rpa : [ "rep", "polling unit" ],
}

export const conditionalRouteWOcollate = {
    pns : [ "national", "polling unit", "state", "lga", "ward" ],
    pss : [ "polling unit", "state", "lga", "ward" ],
    pls : [ "polling unit", "lga", "ward" ],
    pws : [ "polling unit", "ward" ],
    ppa : [ "polling unit" ],
    sss : [ "district", "polling unit", "lga", "ward" ],
    sds : [ "district", "polling unit", "lga", "ward" ],
    sls : [ "polling unit", "lga", "ward" ],
    sws : [ "polling unit", "ward" ],
    spa : [ "polling unit" ],
    rss : [ "consitituency", "polling unit", "lga", "ward" ],
    rcs : [ "consitituency", "polling unit", "lga", "ward" ],
    rls : [ "polling unit", "lga", "ward" ],
    rws : [ "polling unit", "ward" ],
    rpa : [ "polling unit" ],
}


export const conditionalLevel = {
    pss : [ "presidential", 2 ],
    pls : [ "presidential", 3 ],
    pws : [ "presidential", 4 ],
    ppa : [ "presidential", 5 ],
    sss : [ "senate", 1 ],
    sds : [ "senate", 2 ],
    sls : [ "senate", 3 ],
    sws : [ "senate", 4 ],
    spa : [ "senate", 5 ],
    rss : [ "rep", 1 ],
    rcs : [ "rep", 2 ],
    rls : [ "rep", 3 ],
    rws : [ "rep", 4 ],
    rpa : [ "rep", 5 ],
}



export const electionType = [ "presidential", "senate", "rep" ]


// conditional path
export const infoPath = [ "/polling-info", "/ward", "/lga", "/state", "/country", "/district", "/constituency" ]

export const coallationPath = [ "/polling-coalition", "/ward-coalition", "/lga-coalition", "/state-coalition", "/country-coalition",  "/collation-district", "/collation-constituency" ]
export const resultPath = [ "/results/presidential", "/results/senate", "/results/rep" ]
export const analysisPath = [ "/analysis/presidential", "/analysis/senate", "/analysis/rep" ]
export const compPath = [ "/comparism/presidential", "/comparism/senate", "/comparism/rep" ]


export const presidentialGuys = [ "admin", "pns", "pss", "pls", "pws", "ppa" ]
export const senateGuys = [  "admin","sss", "sds", "sws", "sls", "spa" ]
export const repGuys = [  "admin", "rss", "rcs", "rls", "rws", "rpa" ]



export const conditionalLevelData = {
    3 : [
        { label : "Polling Unit", value : "pu" },
        { label : "Ward", value : "ward" },
    ],
    2 : [
        { label : "Polling Unit", value : "pu" },
        { label : "Ward", value : "ward" },
        { label : "LGA", value : "lga" },
    ],
    1 : [
        { label : "Polling Unit", value : "pu" },
        { label : "Ward", value : "ward" },
        { label : "LGA", value : "lga" },
        { label : "State", value : "state" },
    ],
}


// role defination
export const roleDefination = {
    admin : "Admin",
    pns : "Presidential National Suvpervisor",
    pls : "Presidential LGA Supervisor",
    pss : "Presidential State Supervisor",
    pws : "Presidential Ward Supervisor",
    ppa : "Presidential Polling Agent",
    sss : "Senate State Supervisor",
    sls : "Senate LGA Supervisor",
    sds : "Senate District Supervisor",
    sws : "Senate Ward Supervisor",
    spa : "Senate Polling Agent",
    rss : "Rep State Supervisor",
    rls : "Rep LGA Supervisor",
    rcs : "Rep Constituency Supervisor",
    rws : "Rep Ward Supervisor",
    rpa : "Rep Polling Agent",
}