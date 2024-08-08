"use client";

import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import PopUpCreateLink from "./PopUpCreateLink";

function Dashboard() {
  const [links, setLinks] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://cesar-gym.vercel.app/api/links`);
        console.log("Test");

        if (response.status === 200) {
          const data = await response.json();
          setLinks(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [showPopUp]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
      {links.length > 0 ? (
        <div className="flex flex-col gap-5 items-center w-full max-w-6xl">
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-full">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-4 md:px-6">
                    Enlaces
                  </th>
                  <th scope="col" className="py-3 px-4 md:px-6">
                    Usos restantes
                  </th>
                  <th scope="col" className="py-3 px-4 md:px-6">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {links.map((link: any) => {
                  // Crear una nueva URL con /redirect/ prefijo
                  const redirectUrl = link.url.replace(
                    /https:\/\/cesar-gym.vercel.app\/(.+)/,
                    "https://cesar-gym.vercel.app/redirect/$1"
                  );

                  return (
                    <tr
                      key={link.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="py-4 px-4 md:px-6">{redirectUrl}</td>
                      <td className="py-4 px-4 md:px-6">{link.uses}</td>
                      <td className="py-4 px-4 md:px-6">
                        {link.active ? "Activado" : "Desactivado"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <button
            onClick={() => setShowPopUp(true)}
            className="bg-gray-50 text-black font-bold px-4 py-2 rounded-md md:px-5 md:py-3"
          >
            Crear nuevo enlace
          </button>
          {showPopUp && <PopUpCreateLink onClose={() => setShowPopUp(false)} />}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Dashboard;
