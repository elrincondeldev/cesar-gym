"use client";

import React from "react";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import PopUpCreateLink from "./PopUpCreateLink";

function Dashboard() {
  const [links, setLinks] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/links`);
        console.log("Test");

        if (response.status === 200) {
          const data = await response.json();
          setLinks(data);
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [showPopUp]);

  return (
    <div className="flex items-center justify-center ">
      {links.length > 0 ? (
        <div className="flex flex-col gap-5 items-center justify-center min-h-[450px]">
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Enlaces
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Usos restantes
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {links.map((link: any) => (
                    <tr
                      key={link.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="py-4 px-6">{link.url}</td>
                      <td className="py-4 px-6">{link.uses}</td>
                      <td className="py-4 px-6">
                        {link.active ? "Activado" : "Desactivado"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button
            onClick={() => setShowPopUp(true)}
            className="bg-gray-50 text-black font-bold px-5 py-2 rounded-md"
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
