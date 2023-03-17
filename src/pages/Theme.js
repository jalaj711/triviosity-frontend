import React, { useEffect, useState } from "react";
import "./Theme.css";

import useContext from "../utils/Context";
import endpoints from "../utils/APIendpoints";
import { useNavigate } from "react-router-dom";

import { useGlitch } from "react-powerglitch";
import { ColorRing } from "react-loader-spinner";

  

const ThemePage = () => {
  const glitch = useGlitch();
  const [loaded, setLoaded] = useState(false);
  const [genres, setGenres] = useState([]);
  const context = useContext();
  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(false);
    fetch(endpoints.LIST_GENRES, {
      headers: {
        Authorization: `Token ${
          context.token || localStorage.getItem("fictionary_token")
        }`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.game_not_live) {
          navigate("/?redirected=true");
        } else if (res.gameOver) {
          navigate("/game-finished");
        } else {
          setLoaded(true);
          setGenres(res.genres);
        }
      });
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
            return (
              <div
                className="card-1"
                onClick={() => {
                  setUserGenre(elem.id);
                }}
              >
                <img className="image-1" src={elem.theme_pic} alt="" />

                <p className="p-theme">{elem.name}</p>
              </div>
            );
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
            colors={["#65beda", "#65beda", "#65beda", "#65beda", "#65beda"]}
          />
        </div>
      )}
    </div>
  );
};

export default ThemePage;
