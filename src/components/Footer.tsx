import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <section
      className={`mt-auto bg-black/70 text-gray-200 flex flex-col justify-center items-center pt-16 pb-10 px-5 border border-gray-800 leading-relaxed`}
      id="footer"
    >
      <p className="font-light">
        &copy; Binoastudio. <span className="text-red-300">Tutti i diritti riservati.</span>
      </p>
      <p className="font-light">
        <span className="text-red-400">P.IVA 12345678910 Cod. Fisc 0101010101010</span> | Sede: via Vespucci
        Amerigo, 2 - 37068 Vigasio, VR (IT)
      </p>
      <p className="font-light text-red-400">
        Email: andrea@binoastudio.com pietro@binoastudio.com
      </p>
      <p className="font-light text-red-400">Privacy Policy | Cookies Policy</p>
      <div className="flex gap-6 justify-between    mt-5 text-gray-200">
        <div className="flex flex-col gap-2 justify-center">
          <p className="text-[#E5E0D8] text-xs uppercase tracking-widest ps-1">
            Andrea
          </p>
          <a
            href="https://www.linkedin.com/in/andreacristanelli/"
            className="text-[#E5E0D8] hover:text-[#D1CBC0] transition-colors p-2 border border-[#E5E0D8]/20 rounded-full hover:bg-white/5 mx-auto"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
        <div className="flex flex-col gap-2 justify-center">
          <p className="text-red-400 text-xs uppercase tracking-widest ps-1">
            Pietro
          </p>
          <a
            href="https://www.linkedin.com/in/andreacristanelli/"
            className="text-[#E5E0D8] hover:text-[#D1CBC0] transition-colors p-2 border border-[#E5E0D8]/20 rounded-full hover:bg-white/5 mx-auto"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
