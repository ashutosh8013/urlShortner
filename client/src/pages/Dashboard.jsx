import { useContext } from "react";
import { useState, useEffect } from "react";
import "../style.css";
import toast from "react-hot-toast";
import React from "react";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import Error from "./error";

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const [origUrl, setOrigUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [allLinks, setAllLinks] = useState();
  const [custom, setCustom] = useState("");
  const [error, setError] = useState(false);

  // delete the record
  const deleteRecord = async (e) => {
    // console.log(e);
    const urlId = e.urlId;
    console.log(urlId);
    const res = await axios
      .delete("/delete", {
        data: { urlId },
      })
      .then(() => {
        toast.success("link deleted successfuly");
        setAllLinks(() => allLinks.filter((links) => links.urlId != e.urlId));
      })
      .catch(() => {
        toast.error("error in deleting");
      });
  };
  const create = async (e) => {
    setError(false);
    setShortUrl("");
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
      });

      setShortUrl(url.data.shortUrl);

      // console.log(allLinks);

      // show the shorturl
    } catch (error) {
      setError(true);
    }
  };

  // create custom url

  useEffect(() => {
    const getLinks = async () => {
      const tempAllUrl = await axios.get("/getAllUrl");
      // console.log(typeof tempAllUrl.data);
      try {
        // console.log(tempAllUrl.data);
        setAllLinks(tempAllUrl.data);
        // console.log(allLinks);
      } catch (e) {
        console.log(e);
      }
    };
    // console.log(allLinks);
    if (user) getLinks();
  }, [user]);

  if (user)
    return (
      <>
        <div class="flex  items-center flex-col sm:flex-row justify-center min-h-screen from-purple-200 via-purple-300 to-purple-500 bg-gradient-to-br">
          <div>
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div class="relative isolate overflow-hidden  px-6 py-20 text-center sm:px-16 sm:shadow-sm">
                <p class="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Enter your URL
                </p>

                <form onSubmit={create}>
                  <label
                    class="mx-auto mt-8 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
                    for="search-bar"
                  >
                    <input
                      id="search-bar"
                      class="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
                      type="url"
                      placeholder="enter website"
                      value={origUrl}
                      required
                      onChange={(e) => setOrigUrl(e.target.value)}
                    />
                    <button
                      type="submit"
                      class="w-full md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all"
                    >
                      <div class="flex items-center transition-all opacity-1">
                        <span class="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                          Search
                        </span>
                      </div>
                    </button>
                  </label>

                  <label
                    class="mx-auto mt-8 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
                    for="search-bar"
                  >
                    <input
                      type="text"
                      class="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
                      value={custom}
                      placeholder="enter your custom url"
                      onChange={(e) => {
                        setCustom(e.target.value);
                      }}
                    />
                  </label>
                </form>
                {shortUrl && (
                  <p class="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {shortUrl}
                  </p>
                )}
                {error && (
                  <p class="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Already exist
                  </p>
                )}
                <br></br>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-center ">
            <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
              <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
                {allLinks && (
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="py-3 px-2 sm:px-6">
                          Short URL
                        </th>

                        <th scope="col" class="py-3 px-2 sm:px-6">
                          clicks
                        </th>
                        <th scope="col" class="py-3 px-2 sm:px-6">
                          delete
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allLinks.map((link) => {
                        return (
                          <tr
                            key={link.urlId}
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          >
                            <td class="py-4 px-2 sm:px-6">
                              <a target="_blank" href={link.shortUrl}>
                                {link.shortUrl}
                              </a>
                            </td>

                            <td class="py-4 px-2 sm:px-6">{link.clicks}</td>
                            <td
                              class="py-4 px-2 sm:px-6 "
                              key={link.urlId}
                              onClick={() => {
                                deleteRecord(link);
                              }}
                            >
                              <i class="fa-solid fa-trash hover:cursor-pointer pl-2"></i>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
                <link
                  rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  else return <>not found</>;
}
