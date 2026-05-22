import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <section
      className={`mt-auto bg-black/70 text-xs md:text-lg text-gray-200 flex flex-col justify-center items-center pt-16 pb-10 px-5 border border-gray-800 leading-relaxed`}
      id="footer"
    >
      <div className="md:hidden text-center mb-3">
        <p className="font-light mb-2">&copy; 2026 Binòastudio.</p>
        <p className="font-light">Binòa - di Pietro Bonetto</p>
        <p className="font-light">P.IVA: IT04658490232 | REA: VR-438596</p>
        <p className="font-light">
          Sede: Via Amerigo Vespucci 2a, 37068 Vigasio (VR)
        </p>
      </div>
      <div className="hidden md:flex flex-col text-center">
        <p className="font-light">&copy; 2026 Binòastudio.</p>
        <p className="font-light pb-3">
          Binòa - di Pietro Bonetto | P.IVA: IT04658490232 | REA: VR-438596 |
          Sede: Via Amerigo Vespucci 2, 37068 Vigasio (VR)
        </p>
      </div>
      <p className="font-light">
        <span className="font-medium">Andrea</span>: andrea@binoastudio.com |
        +393473146280
      </p>
      <p className="font-light pb-3">
        <span className="font-medium">Pietro</span>: pietro@binoastudio.com |
        +393520133936
      </p>
      <Link href="/privacy" className="font-light hover:underline">
        Privacy Policy{" "}
      </Link>
      {/* SOCIAL */}
      <div className="flex gap-6 justify-between mt-5 text-gray-200">
        {/* Linkedin */}
        <a
          href="https://www.linkedin.com/company/binoa-studio"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#E5E0D8] hover:text-[#D1CBC0] transition-colors p-2 border border-[#E5E0D8]/20 rounded-full hover:bg-white/5 mx-auto"
        >
          <FaLinkedin size={20} />
        </a>
        {/* Instagram */}
        <a
          href="https://www.instagram.com/binoastudio/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#E5E0D8] hover:text-[#D1CBC0] transition-colors p-2 border border-[#E5E0D8]/20 rounded-full hover:bg-white/5 mx-auto"
        >
          <FaInstagram size={20} />
        </a>
        {/* Facebook */}
        <a
          href="https://www.facebook.com/binoastudio "
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#E5E0D8] hover:text-[#D1CBC0] transition-colors p-2 border border-[#E5E0D8]/20 rounded-full hover:bg-white/5 mx-auto"
        >
          <FaFacebook size={20} />
        </a>
      </div>
    </section>
  );
}
