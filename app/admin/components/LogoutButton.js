'use client';
import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button onClick={() => signOut({ callbackUrl: "/admin/auth/signin" })}>
            Logout
        </button>
    );
}
