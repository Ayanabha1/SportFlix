import {
  LocationCityRounded,
  LocationOn,
  PeopleAltRounded,
  SportsCricket,
  SportsCricketRounded,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import "./card.css";
import notFound from "./img.jpg";
import { useNavigate } from "react-router-dom";
import img1 from "../../Common resources/img1.jpeg";
import img2 from "../../Common resources/img2.png";
import { useDataLayerValue } from "../../Datalayer/DataLayer";

function Card({ event }) {
  const navigate = useNavigate();
  const [{ loggedIn, userData }, dispatch] = useDataLayerValue();
  const selectEvent = () => {
    dispatch({ type: "FLY_TO_LOCATION", id: event._id });
    navigate(`/event/${event._id}`);
    dispatch({ type: "SET_HOME_HIDDEN", homeHidden: false });
  };
  const placeholderImage =
    "https://ik.imagekit.io/Ayanabha1/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg?updatedAt=1707320959624";

  const changeDateFormat = (rawDate) => {
    const d = new Date(rawDate);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[d.getMonth()];
    const date = d.getDate();
    const year = d.getFullYear();
    return `${month} ${date}, ${year}`;
  };

  const isHost = () => {
    return userData?._id === event?.host_id;
  };
  const isParticipant = () => {
    return event?.participants?.includes(userData?._id);
  };
  const isOver = () => {
    return new Date() > new Date(event?.date);
  };

  return (
    <div className="Card" onClick={() => selectEvent()}>
      <div className="card-container">
        <div className="card-container-main">
          <div className="card-top">
            <div className="card-img">
              <div className="card-sticker-container">
                {loggedIn && isHost() && (
                  <div className="card-sticker host-sticker">Hosted by you</div>
                )}
                {loggedIn && isParticipant() && (
                  <div className="card-sticker participant-sticker">
                    Participant
                  </div>
                )}
                {isOver() && (
                  <div className="card-sticker past-sticker">Closed</div>
                )}
              </div>
              {event?.pictures?.length ? (
                <img src={event?.pictures[0]} alt="uploaded-image" />
              ) : (
                <img src={placeholderImage} alt="placeholder-image" />
              )}
            </div>
            <div className="card-details">
              <div className="card-main-details">
                <div className="card-location">
                  <LocationOn sx={{ fontSize: "1rem" }} />
                  <h4>{event?.location}</h4>
                  <div className="card-location-more">
                    <span>{event?.city}</span>
                    <span>, {event?.state}</span>
                  </div>
                </div>
                <div className="card-type">
                  <SportsCricketRounded sx={{ fontSize: "1rem" }} />
                </div>
              </div>
            </div>
          </div>
          <div className="card-bottom">
            <span>{changeDateFormat(event?.date)}</span>
            <span>{event?.type}</span>
            <span>
              {
                <PeopleAltRounded
                  sx={{ marginRight: "3px", fontSize: "0.8rem" }}
                />
              }{" "}
              {event?.participants?.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
