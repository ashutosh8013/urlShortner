import React from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import PieChart from "./PieChart";
import Error from "./error";
export default function Analysis({ url }) {
  // location to get the data which i am sending through navigate
  const location = useLocation();
  const data = location.state;
  // if there is no data the user can't access the analysis page
  if (!data) return <Error></Error>;

  let date = new Date(data.createdDate);
  let lastVisit = new Date(data.lastVisit);
  Date.prototype.toShortFormat = function () {
    const monthNames = [
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

    const day = this.getDate();

    const monthIndex = this.getMonth();
    const monthName = monthNames[monthIndex];

    const year = this.getFullYear();

    return `${day}-${monthName}-${year}`;
  };

  // Now any Date object can be declared
  let anyDate = new Date(date);

  let createdDate = anyDate.toShortFormat();
  let lastVisitDate = lastVisit.toShortFormat();
  // copy the  url to clipboard
  function copy(e) {
    var text = e;
    navigator.clipboard.writeText(text).then(
      function () {
        toast.success("copied!");
      },
      function (err) {
        toast.error("failed to copy");
      }
    );
  }

  return (
    <>
      <div class="flex items-center h-100 justify-center bg-gray-800 p-4 sm:h-lvh">
        <div class="flex flex-col mt-1 pt-18 sm:mt-0 sm:pt-0 max-w-7xl w-full md:w-[70%] relative ">
          <div class="bg-gray-700 shadow-lg rounded-xl flex items-start h-32 w-[90%] lg:w-1/2 justify-center py-4 px-8 mx-4 my-2 overflow-clip">
            <div class="flex items-center justify-start w-full">
              <div class="flex-col w-[85%]">
                <div class="text-xl  font-medium relative text-violet-600 my-0">
                  original link
                  <i
                    class="fa-solid fa-copy absolute top-0 right-0 hover:cursor-pointer"
                    onClick={() => {
                      copy(data.origUrl);
                    }}
                  ></i>
                </div>
                <div class="class pb-3 flex items-center overflow-hidden">
                  <div class="text-3xl  font-bold text-gray-200">
                    {data.origUrl}
                  </div>
                  <div class="flex items-center justify-between mx-2 px-0.5 py-0.5 rounded-xl text-green-500 font-medium "></div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gray-700 shadow-lg rounded-xl flex items-start h-32 w-[90%] lg:w-1/2 justify-center py-4 px-8 mx-4 my-2">
            <div class="flex items-center justify-start w-full">
              <div class="flex-col w-[85%]">
                <div class="text-xl  font-medium relative text-violet-600 my-0">
                  short link
                  <i
                    class="fa-solid fa-copy absolute top-0 right-0 hover:cursor-pointer"
                    onClick={() => {
                      copy(data.shortUrl);
                    }}
                  ></i>
                </div>
                <div class="class pb-3 flex items-center overflow-hidden">
                  <div class="text-3xl  font-bold text-gray-200">
                    <a
                      target="_blank"
                      className="hover:cursor-pointer"
                      href={data.shortUrl}
                    >
                      {data.shortUrl}
                    </a>
                  </div>
                  <div class="flex items-center justify-between mx-2 px-0.5 py-0.5 rounded-xl text-green-500 font-medium "></div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col lg:flex-row ">
            <div class="bg-gray-700 shadow-lg rounded-xl flex items-start h-32 w-[90%] lg:w-1/2 justify-center py-4 px-8 mx-4 my-2">
              <div class="flex items-center justify-start w-full">
                <div class="flex-col w-[85%]">
                  <div class="text-xl font-medium text-violet-600 my-2">
                    created Date
                  </div>
                  <div class="class flex items-center">
                    <div class="text-3xl font-bold text-gray-200">
                      {createdDate}
                    </div>
                    <div class="flex items-center justify-between mx-2 px-0.5 py-0.5 rounded-xl text-green-500 font-medium "></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-700 shadow-lg rounded-xl flex items-start h-32 w-[90%] lg:w-1/2 justify-center py-4 px-8 mx-4 my-2">
              <div class="flex items-center justify-start w-full">
                <div class="flex-col w-[85%]">
                  <div class="text-xl font-medium text-violet-600 my-2">
                    last visited
                  </div>
                  <div class="class flex items-center">
                    <div class="text-3xl font-bold text-gray-200">
                      {lastVisitDate}
                    </div>
                    <div class="flex items-center justify-between mx-2 px-0.5 py-0.5 rounded-xl text-green-500 font-medium "></div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" lg:absolute lg:bottom-40 lg:right-10  lg:pr-25 lg: mr-12">
              <p class="text-3xl pl-16 font-bold text-gray-200">
                clicks-{data.clicks}
              </p>
              <PieChart
                desktop={data.desktop}
                mobile={data.mobile}
                otherDevice={data.otherDevice}
              ></PieChart>
            </div>
          </div>
        </div>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </div>
    </>
  );
}
