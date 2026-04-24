"use client";

import { logoutAction } from "@/actions/auth";

export default function LogoutButton() {
    return (
        <button type="button" className="text-red-500 text-xl font-medium cursor-pointer hover:opacity-80 text-center" onClick={logoutAction}>
            Logout
        </button>
    )
}