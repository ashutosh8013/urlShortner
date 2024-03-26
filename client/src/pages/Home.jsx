import React from "react";
import "../style.css";
import { useState } from "react";
export default function Home() {
  const [result, setResult] = React.useState("");
  // const [data, setData] = useState({ email: "", name: "",number:"",subject:"",message:"" });
  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key",import.meta.env.VITE_REACT_APP_ACCESS_KEY);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("message sended Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  
  return (
    <>
      <div>
        <div className="flex justify-center  bg-blue-900 p-5 md:p-16 lg:p-28">
          <div className="flex flex-col text-center justify-center items-center max-w-7xl  text-white">
            <h1 className="text-base font-medium tracking-wider ">
              Welcome to
            </h1>
            <span className="underline underline-offset-2 text-white -mt-3">
              {" "}
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
            </span>
            <div className="flex flex-col text-white mt-5">
              <h1 className="text-4xl md:text-[50px] font-semibold">
                URL Shortner
              </h1>
              <p className="text-xl mt-2 md:mt-4 tracking-wide">
                Create Analyse your short URL
              </p>
            </div>
            <p className="mt-4 text-sm md:w-[52%] tracking-wide leading-7">
              Effortlessly create your short URL with only few clicks & Analyze
              your short URL engagements with our analytics features
            </p>
            <div className="space-x-3 mt-6 md:mt-4">
              <a href="#">
                {" "}
                <i className="fa-brands fa-facebook-f bg-blue-600 hover:text-blue-500 hover:bg-white rounded-full px-3 py-[11px] w-9 h-9 text-center "></i>
              </a>
              <a href="#">
                {" "}
                <i className="fa-brands fa-twitter bg-blue-600 hover:text-red-500 hover:bg-white rounded-full px-[10px] py-[11px] w-9 h-9 text-center"></i>
              </a>
              <a href="#">
                {" "}
                <i className="fa-brands fa-linkedin bg-blue-600 hover:text-yellow-500 hover:bg-white rounded-full px-3 py-[11px] w-9 h-9 text-center"></i>
              </a>{" "}
              <a href="#">
                <i className="fa-brands fa-chrome bg-blue-600 hover:text-indigo-600 hover:bg-white rounded-full px-[10px] py-[11px] w-9 h-9 text-center"></i>
              </a>
            </div>
            <div className="flex mt-10 space-x-5">
              <a
                target="_blank"
                href="https://dzone.com/articles/how-a-url-shortening-application-works"
              >
                <button className="bg-white text-blue-600 px-6 py-2 hover:brightness-105 font-semibold">
                  Learn more
                </button>
              </a>
              <button className="bg-blue-900 text-white border-2 border-white px-6 py-2 hover:brightness-105 font-semibold">
                <a href="#contact">Contact Me</a>
              </button>
            </div>
          </div>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          />
        </div>
      </div>
      <section id="new-features" className="py-8 bg-white sm:py-10 lg:py-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-5xl">
              Features{" "}
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-8">
              Free and efortless URL creation
            </p>
          </div>
          <div className="grid grid-cols-1 mt-10 text-center sm:mt-16 sm:grid-cols-2 sm:gap-x-12 gap-y-12 md:grid-cols-3 md:gap-0 xl:mt-24">
            {/* <!-- Feature 1 --> */}
            <div className="md:p-8 lg:p-14 flex flex-col justify-center items-center">
              <div className="w-14 h-14 rounded-full bg-purple-200 flex justify-center items-center">
                <i className="fa-solid fa-chart-column text-3xl text-gray-900"></i>
              </div>
              <h3 className="mt-12 text-xl font-bold text-gray-900">
                Advanced Analytics
              </h3>
              <p className="mt-5 text-base text-gray-600">
                Track and analyze your data with powerful analytics tools. Gain
                valuable insights for better decision-making.
              </p>
            </div>

            {/* <!-- Feature 2 --> */}
            <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 flex flex-col justify-center items-center">
              <div className="w-14 h-14 rounded-full bg-teal-200 flex justify-center items-center">
                <i className="fa-solid fa-lock text-3xl text-gray-900"></i>
              </div>
              <h3 className="mt-12 text-xl font-bold text-gray-900">
                User Registration and Authentication
              </h3>
              <p className="mt-5 text-base text-gray-600">
                Users can register into the website and Authentiation will be
                done
              </p>
            </div>

            {/* <!-- Feature 3 --> */}
            <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 flex flex-col justify-center items-center">
              <div className="w-14 h-14 rounded-full bg-yellow-200 flex justify-center items-center">
                <i className="fa-solid fa-shield text-3xl text-gray-900"></i>
              </div>
              <h3 className="mt-12 text-xl font-bold text-gray-900">
                Security First
              </h3>
              <p className="mt-5 text-base text-gray-600">
                Implement security features such as link expiration, password
                protection, and anti-fraud mechanisms to ensure the safety and
                integrity of shortened links.
              </p>
            </div>

            {/* <!-- Feature 4 --> */}
            <div className="md:p-8 lg:p-14 md:border-t md:border-gray-200 flex flex-col justify-center items-center">
              <div className="w-14 h-14 rounded-full bg-red-200 flex justify-center items-center">
                <i className="fa-solid fa-gears text-3xl text-gray-900"></i>
              </div>
              <h3 className="mt-12 text-xl font-bold text-gray-900">
                custom URL
              </h3>
              <p className="mt-5 text-base text-gray-600">
                Allow users to personalize their shortened URLs with custom
                keywords or phrases for branding and recognition.
              </p>
            </div>

            {/* <!-- Feature 5 --> */}
            <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 md:border-t flex flex-col justify-center items-center">
              <div className="w-14 h-14 rounded-full bg-green-200 flex justify-center items-center">
                <i className="fa-solid fa-pen-nib text-3xl text-gray-900"></i>
              </div>
              <h3 className="mt-12 text-xl font-bold text-gray-900">
                Link Management
              </h3>
              <p className="mt-5 text-base text-gray-600">
                Enable users to organize and manage their shortened URLs
                efficiently with features like folder organization, expiration
                dates, and editing capabilities.
              </p>
            </div>

            {/* <!-- Feature 6 --> */}
            <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 md:border-t flex flex-col justify-center items-center">
              <div className="w-14 h-14 rounded-full bg-orange-200 flex justify-center items-center">
                <i className="fa-solid fa-bolt text-3xl text-gray-900"></i>
              </div>
              <h3 className="mt-12 text-xl font-bold text-gray-900">
                Performance Metrics
              </h3>
              <p className="mt-5 text-base text-gray-600">
                Monitor and measure your performance with comprehensive metrics.
                Optimize your processes for maximum efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="grid md:block mb-10" id="contact">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-72 flex justify-center w-full">
          <div className="mt-10 text-white text-4xl font-bold">
            GET IN TOUCH
          </div>
        </div>
        <div className="bg-white h-auto flex justify-center">
          <div className="bg-white shadow-lg -mt-40 md:w-1/2 grid lg:flex justify-center">
            <form onSubmit={onSubmit}>
              <div className="w-3/4 lg:w-2/3 ">
                <div className="text-lg font-medium text-blue-600 m-6 ">
                  Drop a Message
                </div>
                <div className=" flex lg:flex-row flex-col">
                  <div className="m-6">
                    <p className="text-sm text-stone-400">Full Name</p>{" "}
                    <input
                      type="text"
                      name="name"
                      className="border-b-2 border-stone-400 text-stone-400 w-36"
                    />
                    <p className="text-sm text-stone-400 mt-6">E-mail</p>{" "}
                    <input
                      type="email"
                      name="email"
                      className="border-b-2 border-stone-400 text-stone-400 w-36"
                    />
                  </div>
                  <div className="m-6 ">
                    <p className="text-sm text-stone-400">Phone</p>{" "}
                    <input
                      type="text"
                      name="number"
                      className="border-b-2 border-stone-400 text-stone-400 w-36"
                    />
                    <p className="text-sm text-stone-400 mt-6">Subject</p>{" "}
                    <input
                      type="text"
                      name="subject"
                      className="border-b-2 border-stone-400 text-stone-400 w-36"
                    />
                  </div>
                </div>
                <div className="m-6 ">
                  <p className="text-sm text-stone-400 mt-6 ">Message</p>{" "}
                  <input
                    type="text"
                    name="message"
                    className="border-b-2 border-stone-400 text-stone-400 w-36"
                  />
                  <button type="submit">
                    {" "}
                    <div className="m-4 mt-6 pl-4 pt-1 pb-1 pr-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl text-white font-medium w-36 ">
                      Send Message
                    </div>
                  </button>
                </div>
              </div>
            </form>
            <span>{result}</span>
            <div className="lg:w-1/3 bg-green-500 ">
              <div className="text-white m-6 font-medium">
                {" "}
                Contact Information{" "}
              </div>

              <div className="text-white m-6 text-sm flex">
                <ion-icon name="call-outline" className="m-2"></ion-icon>
                <div> +91 9667644535</div>
              </div>
              <div className="text-white m-6 text-sm flex">
                <ion-icon name="mail-outline" className="m-2"></ion-icon>
                <div> ashutoshjha867@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-zinc-50 text-center dark:bg-neutral-700 lg:text-left">
        <div className="bg-black/5 p-4 text-center text-surface dark:text-white">
          © 2023 Copyright:
          <a href="https://tw-elements.com/">URL Shortner</a>
        </div>
      </footer>
      {/* <script src="https://cdn.tailwindcss.com"></script> */}
      {/* <script src="https://use.fontawesome.com/03f8a0ebd4.js"></script> */}
      {/* <script
        type="module"
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
      ></script> */}
      {/* <script
        type="module"
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
      ></script> */}
    </>
  );
}
