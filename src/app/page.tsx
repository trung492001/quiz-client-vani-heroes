"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen mx-auto grid place-items-center">
      <div className="bg-white px-5 py-10 flex flex-col space-y-4 rounded-md">
        <div className="space-y-6">
          <div className="text-red-500 text-3xl font-semibold">Welcome to Quiz Vani Heroes</div>
          <button onClick={() => {
            router.push("/sign-in")
          }} className="bg-red-400 text-white rounded-md w-full active:bg-red-600 hover:bg-red-500">
            <div className="my-2 mx-3 font-bold">Start Quiz</div>
          </button>
        </div>
      </div>
    </div>
  );
}
