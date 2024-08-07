import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "./Loader";

interface PopUpCreateLinkProps {
  onClose: () => void;
}

const PopUpCreateLink: React.FC<PopUpCreateLinkProps> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const onHandleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await fetch("https://cesar-gym.vercel.app/api/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }),
      });

      if (response.status === 201) {
        setLoading(false);
        toast.success("Enlace creado correctamente");
        onClose();
      } else {
        setLoading(false);
        toast.error("Error al crear el enlace");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error al crear el enlace");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-lg relative w-96">
        <div className="flex items-center justify-between">
          <p className="text-xl">test</p>
          <button className="text-black font-bold" onClick={onClose}>
            Cerrar
          </button>
        </div>
        <form className="flex flex-col gap-10" onSubmit={onHandleSubmit}>
          <section className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-[#0D0D0D]">Introduce un nombre</label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="por ejemplo: FernandoAlonso"
                className="w-full border-[#979797] border-2 p-2 rounded-md text-black"
              />
            </div>
          </section>
          <button
            type="submit"
            className="bg-[#0D0D0D] text-[#F7ECEC] py-3 px-6 rounded-full text-sm ml-auto"
          >
            {loading ? <Loader /> : "Crear enlace"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopUpCreateLink;
