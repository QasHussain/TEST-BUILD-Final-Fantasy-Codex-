import React, { useEffect, useRef, useState } from "react";
import axios from "../store/axios";
import "./Row.scss";

function Row({ title, fetchUrl }) {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState([]);
  const [active, setActive] = useState("");
  const contentRef = useRef();

  useEffect(() => {
    let isCancelled = false;
    async function fetchData() {
      try {
        const request = await axios.get(fetchUrl);
        if (!isCancelled) {
          setCharacters(request.data);
        }
      } catch (e) {
        if (!isCancelled) {
          setCharacters(e.message);
        }
      }
    }

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [fetchUrl]);

  const getCharacterInfo = (character) => {
    setActive("true");

    const characterInfo = {
      name: character.name,
      age: character.age,
      height: character.height,
      job: character.job,
      race: character.race,
      origin: character.origin,
      description: character.description,
      portrait: character.pictures[0]?.url,
      gender: character.gender,
    };
    setInfo(characterInfo);
    setTimeout(() => {
      contentRef.current.scrollIntoView();
    }, 120);
  };
  console.log(info);

  const closeBtn = () => {
    setActive("");
  };

  function truncate(input) {
    if (input.length > 12) {
      return input.substring(0, 12) + "...";
    }
    return input;
  }

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>
      <div className="row__images">
        {characters.map((character) => (
          <span className="row__images2">
            <span className="row__text">
              <p className="row__textName">{`NAME: ${truncate(
                character.name.toUpperCase()
              )}`}</p>
              <p className="row__textJob">{`JOB: ${truncate(
                character.job.toUpperCase()
              )}`}</p>
              <p className="row__textRace">{`RACE: ${truncate(
                character.race.toUpperCase()
              )}`}</p>
            </span>
            <img
              key={character.id}
              onClick={() => getCharacterInfo(character)}
              className="row__image"
              src={character.pictures[0]?.url}
              alt={character.name}
            />
          </span>
        ))}
      </div>

      {active === "true" && (
        <div className="infoPage" ref={contentRef}>
          <h1 className="infoPage__title">{info.name.toUpperCase()}</h1>
          <section className="infoPage__stats">
            <h2 className="infoPage__stat">AGE : {info.age.toUpperCase()}</h2>

            <h2 className="infoPage__stat">
              HEIGHT : {info.height.toUpperCase()}
            </h2>

            <h2 className="infoPage__stat">JOB : {info.job.toUpperCase()}</h2>

            <h2 className="infoPage__stat">RACE : {info.race.toUpperCase()}</h2>

            <h2 className="infoPage__stat">
              ORIGIN : {info.origin.toUpperCase()}
            </h2>

            <h2 className="infoPage__stat">
              GENDER : {info.gender.toUpperCase()}
            </h2>
          </section>

          <div className="infoPage__content">
            <img
              className="infoPage__portrait"
              src={info.portrait}
              alt={info.name}
            />
            <p className="infoPage__description">{info.description}</p>
          </div>
          <p className="infoPage__collapseBtn" onClick={closeBtn}>
            COLLAPSE DESCRIPTION
          </p>
        </div>
      )}
    </div>
  );
}

export default Row;
