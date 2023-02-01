import React from "react";
import { useState } from "react";
import ReactPlayer from "react-player/lazy";
import { useLocation, useNavigate } from "react-router-dom";
import { FILE_PATH } from "../../config";
import css from "./viewer.module.scss";
import Map from "./map";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Header from "../../compononts/header";
import useToken from '../../compononts/useToken'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BluePrint } from "../../compononts/BluePrint/BluePrint";

const Viewer = () => {
  const location = useLocation();
  const { data, i, breadCrumbs } = location.state;
  const [index, setIndex] = useState(i);
  const navigate = useNavigate();
  const [fullView, setFullView] = useState(false);
  const { removeToken } = useToken();

  return (
    <>
      <Header token={removeToken}/>

      {/* start of results */}

      <div className={css.wrapper}>
        {/* breadeCrumbs */}
        <div
          className={`breadCrumbs ${css.viewerBread}`}
          onClick={() => navigate(-1)}
          aria-label="back"
        >
          <div className="back">
            <ArrowBackIcon />
          </div>
          {
            breadCrumbs.state ?
            <span>{`${breadCrumbs.state} > ${breadCrumbs.lga} > ${breadCrumbs.ward} > ${breadCrumbs.pu}`}</span>
          :
          <span>Back</span>
          }
        </div>


        {/* heading */}
        <span className="heading">
          Details
        </span>
        {index === 0 ? (
          <div
            className={`button ${css.nextNavigate}`}
            onClick={() => setIndex((prev) => prev + 1)}
          >
            <NavigateNextIcon />
          </div>
        ) : index === data.length - 1 ? (
          <div
            className={`button ${css.prevNavigate}`}
            onClick={() => setIndex((prev) => prev - 1)}
          >
            <NavigateBeforeIcon />
          </div>
        ) : (
          <>
            <div
              className={`button ${css.nextNavigate}`}
              onClick={() => setIndex((prev) => prev + 1)}
            >
              <NavigateNextIcon />
            </div>
            <div
              className={`button ${css.prevNavigate}`}
              onClick={() => setIndex((prev) => prev - 1)}
            >
              <NavigateBeforeIcon />
            </div>
          </>
        )}
        <div className={css.container}>
          <div className={css.imageWrapper}>
            {data[index].FILE_TYPE === 0 ? (
              <>
              <img src={FILE_PATH + data[index].FILE} alt="uploaded" className={fullView? `${css.fullView}` : `${css.smallView}`}/>
              <button className={`button ${css.toggleButton}`} onClick={()=> setFullView((prev)=>!prev)}
              style={{right: fullView? "-100%" : null}}
              >Toggle View</button>
              </>
            ) : (
              <ReactPlayer
                width={"100%"}
                height={"100%"}
                className="video-player"
                controls={true}
                url={FILE_PATH + data[index].FILE}
              />
            )}
          </div>
          <div className={css.detailsContainer}>
            <div className={css.mapContainer}>
              <Map center={{ lat: data[index].LAT, lng: data[index].LONG }} />
            </div>
            <div className={css.details}>
              <div className={css.block}>
                <span>Location</span>
                <span>
                  {data[i].LAT} | {data[i].LONG}
                </span>
              </div>
              <div className={css.block}>
                <span>AI Prediction</span>
                <span></span>
              </div>
              <div className={css.block}>
                <span>Date & Time</span>
                <span>
                  {data[i].DATE} | {data[i].TIME}
                </span>
              </div>
              <div className={css.block}>
                <span>Remarks</span>
                <span>{data[i].REMARK}</span>
              </div>
              <div className={css.block}>
                <span>Sender Phone Number</span>
                <span>{data[i].PHONE}</span>
              </div>
              <div className={css.block}>
                <span>Email</span>
                <span>{data[i].EMAIL}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BluePrint/>
    </>
  );
};

export default Viewer;
