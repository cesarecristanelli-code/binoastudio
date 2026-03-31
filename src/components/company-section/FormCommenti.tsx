"use client";
import { FaLinkedin } from "react-icons/fa";
import { Send } from "lucide-react";


// Configura e usa EmailJS per far mandare la mail del commento

export default function Form() {
  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    // Gestione futura qui
    console.log("Form inviato");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#2D2A26] p-6 rounded-xl">
      <div className="w-full max-w-md bg-[#D1CBC0]/5 p-8 rounded-3xl border border-[#D1CBC0]/10 backdrop-blur-sm shadow-2xl">
        {/* Header con Titolo in stile Cinzel/Copperplate */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-[0.2em] text-[#E5E0D8] uppercase mb-2">
            Contattaci
          </h2>
          <div className="h-px w-12 bg-[#D1CBC0] mx-auto mb-4"></div>
          <p className="text-[#D1CBC0]/60 text-sm italic">
            Saremo lieti di ascoltare il tuo progetto
          </p>
        </div>

        <form onSubmit={() => handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="nome"
              className="text-[#E5E0D8] text-xs uppercase tracking-widest ps-1"
            >
              Nome
            </label>
            <input
              id="nome"
              type="text"
              name="nome"
              placeholder="Il tuo nome"
              className="px-4 py-3 rounded-xl border border-[#2D2A26] bg-[#D1CBC0] text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-[#E5E0D8] outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-[#E5E0D8] text-xs uppercase tracking-widest ps-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="esempio@mail.com"
              className="px-4 py-3 rounded-xl border border-[#2D2A26] bg-[#D1CBC0] text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-[#E5E0D8] outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="commento"
              className="text-[#E5E0D8] text-xs uppercase tracking-widest ps-1"
            >
              Messaggio
            </label>
            <textarea
              id="commento"
              name="commento"
              rows={4}
              placeholder="Come possiamo aiutarti?"
              className="px-4 py-3 rounded-xl border border-[#2D2A26] bg-[#D1CBC0] text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-[#E5E0D8] outline-none transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            className="mt-2 group flex items-center justify-center gap-3 font-bold uppercase tracking-[0.15em] px-8 py-4 rounded-full bg-[#D1CBC0] text-[#2D2A26] hover:bg-[#E5E0D8] hover:scale-[1.02] transition-all duration-300 shadow-lg"
          >
            Invia Messaggio
            <Send
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </form>

        {/* Social Links */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <span className="text-[#D1CBC0]/40 text-[10px] uppercase tracking-[0.3em]">
            Seguici su Linkedin
          </span>
          <div className="flex gap-6 justify-between">
            <div className="flex flex-col gap-2 justify-center">
              <p className="text-[#E5E0D8] text-xs uppercase tracking-widest ps-1">Andrea</p>
              <a
                href="https://www.linkedin.com/in/andreacristanelli/"
                className="text-[#E5E0D8] hover:text-[#D1CBC0] transition-colors p-2 border border-[#E5E0D8]/20 rounded-full hover:bg-white/5 mx-auto"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <p className="text-[#E5E0D8] text-xs uppercase tracking-widest ps-1">Pietro</p>
              <a
                href="https://www.linkedin.com/in/andreacristanelli/"
                className="text-[#E5E0D8] hover:text-[#D1CBC0] transition-colors p-2 border border-[#E5E0D8]/20 rounded-full hover:bg-white/5 mx-auto"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
