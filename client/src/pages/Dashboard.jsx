import { useContext } from "react";
import { useState, useEffect } from "react";
import "../style.css";
import React from "react";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import Error from "./error";
export default function Dashboard() {
  const { user } = useContext(UserContext);
  const [origUrl, setOrigUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [allLinks, setAllLinks] = useState(null);
  const [custom, setCustom] = useState("");
  const [error, setError] = useState(false);

  const create = async (e) => {
    setError(false);
    e.preventDefault();
    console.log("in create");
    try {
      // post request for creating url
      const email = user.email;
      console.log("in frontend");
      const url = await axios.post("/short", {
        origUrl,
        email,
        custom,
      })
      
      setShortUrl(url.data.shortUrl);

      // show the shorturl
    } catch (error) {
      setError(true);
    }
  };

  // create custom url

  useEffect(() => {
    const getLinks = async () => {
      try {
        const tempAllUrl = await axios.get("/getAllUrl");

        setAllLinks(tempAllUrl.data);
        console.log(allLinks);
      } catch (e) {
        console.log(e);
      }
    };
    console.log(allLinks);
    if (user) getLinks();
  }, [user]);

  if (user)
    return (
      <div>
        <h1>Dashboard</h1>
        <h3>Welcome</h3>
        {user && <h2>Hi!! {user.name}</h2>}

        <div>
          <h1>create url</h1>
          <form onSubmit={create}>
            <label>Enter the link of website</label>
            <input
              type="url"
              placeholder="enter website"
              value={origUrl}
              required
              onChange={(e) => setOrigUrl(e.target.value)}
            ></input>
            <h1>enter custom name of url</h1>
            <input
              type="text"
              className="bg-red-400"
              value={custom}
              onChange={(e) => {
                setCustom(e.target.value);
              }}
            ></input>
            <button type="submit">create</button>
          </form>
        </div>
        <div></div>
        {shortUrl && <h3>{shortUrl}</h3>}
        {error && <h2>already exist</h2>}
        <br></br>
        <br></br>
        {allLinks && (
          <div>
            <table id="customers">
              <thead>
                <tr>
                  <th>Short url</th>
                  <th>Clicks</th>
                </tr>
              </thead>
              <tbody>
                {allLinks.map((link) => {
                  return (
                    <tr key={link.urlId}>
                      <td>
                        <a target="_blank" href={link.shortUrl}>
                          {link.shortUrl}
                        </a>
                      </td>
                      <td>{link.clicks}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  else return <>not found</>;
}
