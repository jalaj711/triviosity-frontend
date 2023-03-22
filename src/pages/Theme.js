import React, { useEffect, useState } from "react";
import "./Theme.css";

import useContext from "../utils/Context";
import endpoints from "../utils/APIendpoints";
import { useNavigate } from "react-router-dom";

import { useGlitch } from "react-powerglitch";
import { ColorRing } from "react-loader-spinner";

const Timer = ({ timer, refresh }) => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const countDownDate = timer;
    const interval = setInterval(() => {
      const now = new Date().getTime();

      var distance = countDownDate - now;

      if (distance < 0) {
        //Stop Timer

        clearInterval(interval);
        refresh();
      } else {
        distance /= 1000;

        const days = (distance - (distance % 86400)) / (24 * 60 * 60);
        distance -= days * (24 * 60 * 60);
        const hours = (distance - (distance % 3600)) / (60 * 60);
        distance -= hours * (60 * 60);

        const minutes = (distance - (distance % 60)) / 60;
        distance -= minutes * 60;

        const seconds = Math.round(distance);
        //update timer
        setTime({
          days: days < 10 ? "0" + days : days,
          hours: hours < 10 ? "0" + hours : hours,
          minutes: minutes < 10 ? "0" + minutes : minutes,
          seconds: seconds < 10 ? "0" + seconds : seconds,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="timer-clock">
        <div className="timer-element">
          <p>{time.days}</p>
          <span>Days</span>
        </div>
        <span>:</span>
        <div className="timer-element">
          <p>{time.hours}</p>
          <span>Hours</span>
        </div>
        <span>:</span>
        <div className="timer-element">
          <p>{time.minutes}</p>
          <span>Minutes</span>
        </div>
        <span>:</span>
        <div className="timer-element">
          <p>{time.seconds}</p>
          <span>Seconds</span>
        </div>
      </div>
    </>
  );
};

const ActiveThemeCard = (props) => {
  return (
    <div className="card-1" onClick={props.onClick}>
      <img className="image-1" src={props.theme_pic} alt="" />

      <p className="p-theme">{props.name}</p>
    </div>
  );
};

const InactiveThemeCard = (props) => {
  const [countDown, setCountDown] = useState(true);
  useEffect(() => {
    const today = new Date();
    if (props.start_time > today) {
      setCountDown(true);
    } else {
      setCountDown(false);
    }
  }, [props]);
  return (
    <div className="card-1 inactive-card">
      <img className="image-1" src={props.theme_pic} alt="" />
      <div className="inactive-card-overlay">
        <div>
          {countDown ? (
            <div>
              <div className="p-theme-2">Theme unlocks in</div>
              <Timer timer={props.start_time} refresh={props.refresh} />
            </div>
          ) : (
            <div className="p-theme-2">This theme has already ended</div>
          )}
        </div>
      </div>

      <p className="p-theme">{props.name}</p>
    </div>
  );
};

const ThemePage = () => {
  const glitch = useGlitch();
  const [loaded, setLoaded] = useState(false);
  const [genres, setGenres] = useState([]);
  const context = useContext();
  const navigate = useNavigate();

  const refresh = () => {
    fetch(endpoints.LIST_GENRES, {
      headers: {
        Authorization: `Token ${
          context.token || localStorage.getItem("fictionary_token")
        }`,
      },
    }).then((res) => {
      if (res.status === 401) {
        context.logout();
        navigate("/signin?redirected=true");
      }
      res.json().then((res) => {
        if (res.game_not_live) {
          navigate("/?redirected=true");
        } else if (res.gameOver) {
          navigate("/game-finished");
        } else {
          setLoaded(true);
          setGenres(res.genres);
        }
      });
    });
  };
  useEffect(() => {
    setLoaded(false);
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.token]);

  const setUserGenre = (genre_id) => {
    setLoaded(false);
    fetch(endpoints.SET_GENRES, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${
          context.token || localStorage.getItem("fictionary_token")
        }`,
      },
      method: "POST",
      body: JSON.stringify({ genre_id }),
    }).then((res) => {
      res.json().then((req) => {
        setLoaded(true);
        // setGenres([...res.genres, ...res.genres, ...res.genres]);
        navigate("/question?genre_id=" + genre_id);
      });
    });
  };
  return (
    <div className="Container">
      <h2 className="theme-head" ref={glitch.ref}>
        Themes
      </h2>

      {loaded ? (
        <div className="main-card">
          {genres.map((elem, index) => {
            const today = new Date();
            if (
              new Date(elem.start_time) < today &&
              today < new Date(elem.end_time)
            ) {
              return (
                <ActiveThemeCard
                  onClick={() => {
                    setUserGenre(elem.id);
                  }}
                  theme_pic={elem.theme_pic}
                  name={elem.name}
                />
              );
            } else {
              return (
                <InactiveThemeCard
                  onClick={() => {
                    setUserGenre(elem.id);
                  }}
                  theme_pic={elem.theme_pic}
                  name={elem.name}
                  start_time={new Date(elem.start_time)}
                  refresh={refresh}
                />
              );
            }
          })}
        </div>
      ) : (
        <div className="box">
          <ColorRing
            visible={true}
            height="135"
            width="135"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e8ce32", "#e8ce32", "#e8ce32", "#e8ce32", "#e8ce32"]}
          />
        </div>
      )}
    </div>
  );
};

export default ThemePage;
