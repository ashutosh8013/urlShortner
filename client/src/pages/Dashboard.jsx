import { useContext } from "react";
import { useState, useEffect } from "react";

import React from "react";
import axios from "axios";
import { UserContext } from "../../context/userContext";
export default function Dashboard() {
  const { user } = useContext(UserContext);
  const [origUrl, setOrigUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  // const [allLinks, setAllLinks] = useState(null);
  let allLinks;
  let cars = [
    {
      color: "purple",
      type: "minivan",
      registration: new Date("2017-01-03"),
      capacity: 7,
    },
    {
      color: "red",
      type: "station wagon",
      registration: new Date("2018-03-03"),
      capacity: 5,
    },
  ];
  const create = async (e) => {
    e.preventDefault();
    console.log("in create");
    try {
      // post request for creating url
      const email = user.email;
      console.log("in frontend");
      const url = await axios.post("/short", {
        origUrl,
        email,
      });

      console.log(url.data.shortUrl);
      setShortUrl(url.data.shortUrl);

      // show the shorturl
    } catch (error) {}
  };
  // get all the links for logged in user
  const getLinks = async () => {
    const email = user.email;
    console.log(email);
    try {
      const tempAllUrl = await axios.get("/getAllUrl", { email });
      console.log(tempAllUrl);

      allLinks = tempAllUrl.data;
      console.log(allLinks);
    } catch (e) {
      console.log(e);
    }
  };
  // if condition so that it will not call for user=null
  // because of usecontext it is null in start
  if (user) {
    getLinks();
  }
  return (
    <div>
      <h1>Dashboard</h1>

      {user && <h2>hi!!{user.name}</h2>}
      <form onSubmit={create}>
        <label>enter website Link</label>
        <input
          type="url"
          placeholder="enter website"
          value={origUrl}
          onChange={(e) => setOrigUrl(e.target.value)}
        ></input>
        <button type="submit">create</button>
      </form>
      {shortUrl && <h1>{shortUrl}</h1>}
      {allLinks && (
        <ul>
          {allLinks.map((link, index) => (
            <li key={index}>{link}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
