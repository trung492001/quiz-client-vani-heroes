"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaUser, FaEyeSlash, FaEye } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { signInService } from "../../services/auth.service";
import { ImSpinner11 } from "react-icons/im";
import { setCookie } from "cookies-next";


export default function SignInPage() {

    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        setLoading(true);
        signInService(phone, password).then((result) => {
            console.log("result", result);
            if (result.status == 201) {
                setCookie("accessToken", result.data.access_token)
                router.push("/question");
                setLoading(false);
            }
        })
    }

    return (
        <div className="w-full min-h-screen mx-auto grid place-items-center">
            <div className="bg-white px-5 py-10 flex flex-col space-y-4">
                <p className="text-center text-3xl text-red-400 font-semibold">Quiz Vani Heroes</p>
                <div>Phone</div>
                <div
                    className="rounded-md"
                    style={{
                        borderWidth: "1px"
                    }}>
                    <div className="flex flex-row space-x-4 items-center my-2 mx-3">
                        <FaUser />
                        <input
                            className="outline-none bg-transparent"
                            autoComplete="off"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div>Password</div>
                <div
                    className="rounded-md"
                    style={{
                        borderWidth: "1px"
                    }}>
                    <div className="flex flex-row space-x-4 items-center my-2 mx-3">
                        <MdOutlinePassword />
                        <input
                            className="outline-none bg-transparent"
                            type={showPassword ? "text" : "password"}
                            autoComplete="off"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button onClick={() => { setShowPassword(!showPassword) }}>
                            {showPassword ? <FaEyeSlash /> :
                                <FaEye />}
                        </button>

                    </div>
                </div>
                <button onClick={handleSubmit} className="bg-red-400 text-white rounded-md">
                    {!loading ? <div className="my-2 font-bold">Sign In</div> : <ImSpinner11 className="my-2 animate-spin mx-auto" />}
                </button>
                <div className="text-center">{"Don't have an account yet?"} <a className="cursor-pointer underline text-red-400" href="/sign-up">Sign Up</a></div>
            </div>
        </div>
    );
}