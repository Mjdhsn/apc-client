import { withAuthenticator } from "@aws-amplify/ui-react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../../compononts/header";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./data.css";
import { API_URL, SECRET_KEY, FILE_PATH } from "../../config";

//colors
import colors from "../../Colors/Colors";

//material ui
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import LoadingScreen from "../LoadingScreen";
import removeToken from '../../compononts/useToken'
import DataNotFound from "../../DataNotFound";

function DataList(props) {
  const classes = useStyles();
  const [data, setData] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { sta, lga, ward, pu } = location.state;
  

  const [ai, setAi] = React.useState('');

  const handleChange = (event) => {
    setAi(event.target.value);
  };
  var options = {  
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + props.token
    }
  }

  const getData = () => {
    axios.get(API_URL + "getDataPu?key=" + SECRET_KEY +   "&country_name=" +
    1 + "&state=" + sta + "&lga=" + lga + "&ward=" + ward + "&pu=" + pu, options).then((response) => {
      var dt = response.data;

      setData(dt);
    });
  };

  if (data == null) {
    getData();
    return (
      <div className="data">
        <Header token={removeToken}/>
        <LoadingScreen />
      </div>
    );
  } else if (data.length === 0) {
    return (
      <div className="data">
        <Header token={removeToken}/>
        <DataNotFound />
      </div>
    );
  }
  const dataCard = (data, index) => {
    return (
      <Box className={`div-card ${classes.item}`} display="flex" alignItems="center" justifyContent={"space-around"} onClick={() => loadViewer(index)}>
        <div className={`cell ${classes.itemContent} ${classes.image}`}>{data.file_type === 0 ? <img src={FILE_PATH + data.file} width="40px" height="40px" alt="cover" /> : <img src={require("../../assets/video.png")} width="40px" height="40px" alt="videoCover" />}</div>
        <div className={`cell ${classes.itemContent}`}>{data.lat + "  |  " + data.long}</div>
        <div className={`cell ${classes.itemContent}`}>{data.remark}</div>
      </Box>
    );
  };
  const loadViewer = (index) => {
    navigate("/viewer", { state: { data: data, i: index } });
  };

  return (
    <Box className={`data ${classes.pageWrapper}`}>
      {/* <Box sx={{ zIndex: 1, position: "absolute", bottom: 0, left: 0, width: "100%", height: 300, backgroundImage: `url(${Image})`, backgroundSize: "contain", backgroundPosition: "center", opacity: 0.3 }}></Box> */}

      <Header token={removeToken}/>

      <Box className="div-topic" display="flex" alignItems="center" justifyContent={"flex-start"} columnGap={5}>
        <IconButton sx={{ marginRight: "8px" }} onClick={() => navigate(-1)} aria-label="back">
          <ArrowBackIcon />
        </IconButton>
        {sta} {" > "} {lga} {" > "} {ward} {" > "} {pu}
      </Box>

      <Box className="option-box">

        <FormControl >
          <InputLabel >AI Remark</InputLabel>
          <Select
            labelId="label"
            id="select"
            value={ai}
            label="AI Remark"
            onChange={handleChange}
          >

            <MenuItem value={'People walking on a street'}>People walking on a street</MenuItem>
            <MenuItem value={'Fight on a street'}>Fight on a street</MenuItem>
            <MenuItem value={'Fire on a street'}>Fire on a street</MenuItem>
            <MenuItem value={'Fire on a street'}>Street violence</MenuItem>
            <MenuItem value={'Car crash'}>Car crash</MenuItem>
            <MenuItem value={'Cars on a road'}>Cars on a road</MenuItem>
            <MenuItem value={'Violence in office'}>Violence in office</MenuItem>
            <MenuItem value={'Person walking in office'}>Person walking in office</MenuItem>
            <MenuItem value={'Gun in the street'}>Gun in the street</MenuItem>
            <MenuItem value={'People fighting with Guns'}>People fighting with Guns</MenuItem>
            <MenuItem value={'Bnadits on bike with Weapon'}>Bnadits on bike with Weapon</MenuItem>
            <MenuItem value={'Exlplosive device'}>Exlplosive device</MenuItem>

            <MenuItem value={30}>Knife in a hand</MenuItem>

          </Select>
        </FormControl>

      </Box>
      <Box className={`div-label ${classes.topicsContainer}`} mb={2} display="flex" justifyContent={"space-around"}>
        <Box className={`cell-label ${classes.topics}`}>File</Box>
        <Box className={`cell-label ${classes.topics}`}>Location</Box>
        <Box className={`cell-label ${classes.topics}`}>Remark</Box>
      </Box>
      <Box className={classes.itemsContainer}>{data.map((data, index) => dataCard(data, index))}</Box>
    </Box>
  );
}

export default DataList;

const useStyles = makeStyles({
  pageWrapper: {
    zIndex: 1,
    marginBottom: "500px"
  },

  itemsContainer: {
    width: "81%",
    marginLeft: "auto",
    marginRight: "auto",
    height: "calc(100vh - 220px)",
    overflowY: "auto",
    paddingRight: 10,
    zIndex: 10,
    position: "relative",

    "&::-webkit-scrollbar": {
      width: 5,
    },
    "&::-webkit-scrollbar-thumb": {
      width: 5,
      backgroundColor: colors.borderColor,
    },
  },

  topicsContainer: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "160px",
    zIndex: 10,
  },

  topics: {},

  item: {
    borderRadius: 0,
    borderBottom: `1px solid ${colors.borderColor}`,
    cursor: "pointer",
    transition: "all 0.3s ease",
    height: 60,

    "&:hover": {
      backgroundColor: colors.backgroundColor,
      opacity: 0.8,
    },
  },

  itemContent: {
    fontSize: 14,
  },

  image: {},
});
