'use client';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SignInPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (session) {
            router.push("/admin");
        }
    }, [session, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        const result = await signIn("credentials", {
            redirect: false,
            username,
            password,
            callbackUrl: "/admin",
        });
        if (result.error) {
            setErrorMsg("Invalid credentials");
        } else if (result.url) {
            router.push(result.url);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Admin Sign In</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username: </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div style={{ marginTop: "10px" }}>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
                <button type="submit" style={{ marginTop: "10px" }}>
                    Sign In
                </button>
            </form>
        </div>
    );
}
