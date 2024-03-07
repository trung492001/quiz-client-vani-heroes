'use client'
import { useState } from "react";
import { FaUser, FaEyeSlash, FaEye } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";

export default function SignUp() {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = () => {

    }

    return (
        <div className="w-full absolute top-1/4">
            <div className="flex flex-row justify-center">
                <div className="bg-white px-5 py-10 flex flex-col space-y-4">
                    <p className="text-center text-3xl text-red-400 font-semibold">Quiz Vani Heroes</p>
                    <div>Full name</div>
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
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
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
                        <div className="my-2 font-bold">Login</div>
                    </button>
                    <div className="text-center">{"Already have an account!"} <a className="cursor-pointer underline text-red-400">Sign In</a></div>
                </div>
            </div>
        </div>
    );
}