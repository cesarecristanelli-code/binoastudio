"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleLogin = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (username === "admin" && password === "binoa6898") {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/form-inserimento-immobili");
    } else {
      setError("Credenziali non valide!");
    }
  };

  return (
    <section className="min-w-2xl min-h-12.5 flex justify-center items-center py-60">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-2 p-10 border-2 border-black text-black rounded-lg"
      >
        <h2 className="text-xl font-bold text-center mx-auto">
          Area Riservata
        </h2>
        <label htmlFor="username" className="ps-2">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          required
          onChange={(e) => setUsername(e.target.value)}
          className="p-3 border-2 border-black w-sm mb-3 rounded-xl"
        />

        <label htmlFor="password" className="ps-2">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 border-2 border-black w-sm mb-3 rounded-xl"
        />

        <button
          type="submit"
          className="px-2 py-3 border-2 border-black cursor-pointer text-center mb-3 rounded-2xl hover:bg-gray-200"
        >
          Login
        </button>

        {error && (
          <p className="p-4 mx-auto text-center text-white border-2 border-red-600 bg-red-400 rounded-md">
            {error}
          </p>
        )}
      </form>
    </section>
  );
}
