'use client'
import { useEffect, useState } from "react";
import { FaUser, FaEyeSlash, FaEye, FaPhoneAlt } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { signUpService } from "../../services/auth.service";
import { useRouter } from "next/navigation";
import { IoIosMedical } from "react-icons/io";
import { isValidPhoneNumber } from "../../helper/util";
import { ImSpinner11 } from "react-icons/im";

export default function SignUpPage() {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [requiredName, setRequiredName] = useState(false);
    const [requiredPhone, setRequiredPhone] = useState(false);
    const [requiredPassword, setRequiredPassword] = useState(false);
    const [validPhone, setValidPhone] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const handleSubmit = async () => {
        if (name == "")
            setRequiredName(true);
        if (phone == "")
            setRequiredPhone(true);
        if (password == "") {
            setRequiredPassword(true);
        }
        if (phone !== "" && password !== "" && name !== "") {
            setLoading(true);
            setRequiredName(false);
            setRequiredPassword(false);
            setRequiredPhone(false);
            const result = await signUpService(phone, name, password);
            if (result.status == 200 || result.status == 201)
                router.replace("/sign-in");
            else setErrorMessage(result.data.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (phone !== "")
            setValidPhone(isValidPhoneNumber(phone));
    }, [phone])

    return (
        <div className="w-full min-h-screen mx-auto grid place-items-center">
            <div className="bg-white px-5 py-10 flex flex-col space-y-3 w-96">
                <p className="text-center text-3xl text-purple-600 font-semibold">Quiz Vani Heroes</p>
                {errorMessage !== "" ? <div className="text-red-500 font-bold">Fail: {errorMessage}</div> : null}
                <div className="flex flex-row justify-between">
                    <div>Full name</div>
                    {requiredName ? <div className="text-red-500 flex flex-row items-center">Required <IoIosMedical /></div> : <></>}
                </div>
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
                <div className="flex flex-row justify-between">
                    <div>Phone</div>
                    {requiredPhone ? <div className="text-red-500 flex flex-row items-center">Required <IoIosMedical /></div> : <></>}
                </div>
                <div>
                    <div
                        className="rounded-md"
                        style={{
                            borderWidth: "1px"
                        }}>
                        <div className="flex flex-row space-x-4 items-center my-2 mx-3">
                            <FaPhoneAlt />
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
                    {validPhone ? null : <div className="text-red-500 font-semibold">Please input a valid phone start with country code. Ex: +84912345678</div>}
                </div>
                <div className="flex flex-row justify-between">
                    <div>Password</div>
                    {requiredPassword ? <div className="text-red-500 flex flex-row items-center">Required <IoIosMedical /></div> : <></>}
                </div>
                <div
                    className="rounded-md"
                    style={{
                        borderWidth: "1px"
                    }}>
                    <div className="flex flex-row justify-between my-2 mx-3">
                        <div className="flex flex-row space-x-4 items-center">
                            <MdOutlinePassword />
                            <input
                                className="outline-none bg-transparent"
                                type={showPassword ? "text" : "password"}
                                autoComplete="off"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button onClick={() => { setShowPassword(!showPassword) }}>
                            {showPassword ? <FaEyeSlash /> :
                                <FaEye />}
                        </button>

                    </div>
                </div>
                <button onClick={handleSubmit} className="bg-red-400 text-white rounded-md">
                    {!loading ? <div className="my-2 font-bold">Sign Up</div> : <ImSpinner11 className="my-2 animate-spin mx-auto" />}
                </button>
                <div className="text-center">{"Already have an account!"} <a className="cursor-pointer underline text-red-400" href="/sign-in">Sign In</a></div>
            </div>
        </div>
    );
}