import { useContext } from "react";
import { useState, useEffect } from "react";
import "../style.css";
import React from "react";
import axios from "axios";
import { UserContext } from "../../context/userContext";
export default function Dashboard() {
  const { user } = useContext(UserContext);
  const [origUrl, setOrigUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [allLinks, setAllLinks] = useState(null);

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

  return (
    <div className="Dashboard">
      <h1 className="">Dashboard</h1>
      <h3>Welcome</h3>
      {user && <h2>Hi!! {user.name}</h2>}

      <div>
        <form onSubmit={create}>
          <label className="enter">Enter the link of website</label>
          <input
            type="url"
            placeholder="enter website"
            value={origUrl}
            onChange={(e) => setOrigUrl(e.target.value)}
          ></input>
          <button type="submit">create</button>
        </form>
      </div>

      {shortUrl && <h3 className="url">{shortUrl}</h3>}
      <br></br>
      <br></br>
      {allLinks && (
        <div className="tableDiv">
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
}
