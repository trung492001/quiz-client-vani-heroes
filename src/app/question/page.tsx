'use client'
import { useEffect, useState } from "react";
import { getAllQuestion } from "../../services/question.service";
import { Question } from "../../model/question.model";
import { Answer } from "../../model/answer.model";
import { FaRegCheckCircle, FaTimesCircle } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import Image from "next/image";
import Dialog from "../../components/dialog";

export default function QuestionPage() {
    const [data, setData] = useState<Question[]>([]);
    const [index, setIndex] = useState<number>(0);
    const [chosenAnswerIndex, setChosenAnswerIndex] = useState<number[]>([]);
    const [finish, setFinish] = useState<boolean>(false);
    const [openHint, setOpenHint] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const clickNext = () => {
        setChosenAnswerIndex([]);
        setOpenHint(false);
        index === data.length - 1
            ? setFinish(true)
            : setIndex(index + 1);
    };

    useEffect(() => {
        getAllQuestion().then((res) => {
            setData(res.data);
        });
    }, []);

    return (
        <>
            <div className="min-h-screen grid place-items-center px-10">
                <div className="w-full shadow-2xl rounded-2xl bg-white p-5 space-y-2">
                    {!finish ? <>
                        <div className="flex flex-row justify-between">
                            <div className="text-3xl text-red-400 font-semibold">Q{index + 1}</div>
                            <button className="bg-red-400 px-2 py-3 text-white rounded-md hover:bg-red-500 active:bg-red-600" onClick={() => { setOpenDialog(true) }}>Done</button>
                        </div>
                        <div>{data[index]?.question} <span className="font-extrabold underline">{data[index]?.numberOfCorrectAns > 1 ? `Please choose ${data[index]?.numberOfCorrectAns} answers.` : null}</span></div>
                        <div className="space-y-3">
                            {data[index]?.answers.map((ans: Answer, i) => (
                                <div key={`answer-${i}`}
                                    style={{ borderWidth: "2px" }} className={`border-gray-400 ${chosenAnswerIndex.includes(i) && chosenAnswerIndex.length != data[index]?.numberOfCorrectAns ? "bg-gray-200" : "bg-transparent"} p-3 rounded-md flex flex-row justify-between cursor-pointer items-center`}
                                    onClick={() => {
                                        if (chosenAnswerIndex.length != data[index]?.numberOfCorrectAns) {
                                            setChosenAnswerIndex([...chosenAnswerIndex, i])
                                        }
                                    }}>
                                    <div>{ans.answer}</div>
                                    {(chosenAnswerIndex.length == data[index].numberOfCorrectAns && ans.isCorrect) ?
                                        <FaRegCheckCircle className='text-green-500 text-2xl' /> : null}
                                    {(chosenAnswerIndex.includes(i) && chosenAnswerIndex.length == data[index].numberOfCorrectAns && !ans.isCorrect)
                                        ? <FaTimesCircle className="text-red-500 text-2xl" /> : null
                                    }
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col md:flex-row md:justify-between">
                            <div>
                                <div
                                    onClick={() => {
                                        setOpenHint(!openHint);
                                    }}
                                    className="text-lg text-yellow-500"
                                >Hint{!openHint ? <IoMdArrowDropdown className="inline-block ml-1 text-2xl" /> : <IoMdArrowDropup className="inline-block ml-1 text-2xl" />}
                                </div>
                                {openHint ?
                                    <div>
                                        {data[index].hint}
                                    </div>
                                    : <div className="py-3"></div>
                                }
                            </div>
                            {chosenAnswerIndex.length == data[index]?.numberOfCorrectAns ?
                                <div className="pt-3 md:ml-none ml-auto">
                                    <button className="bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-500 active:bg-green-700" onClick={clickNext}>Next</button>
                                </div>
                                : null
                            }
                        </div>
                    </> : <div className="text-center my-4 space-y-4 flex flex-row justify-center items-center space-x-6">
                        <Image src={"/firework.png"} alt="" width={200} height={200} />
                        <div className="space-y-6">
                            <div className="text-red-500 text-3xl font-semibold">Congratulation</div>
                            <div className="text-xl font-medium">You solved all quizzes</div>
                        </div>
                        <Image src={"/firework.png"} alt="" width={200} height={200} />
                    </div>}
                </div>
            </div>
            <Dialog
                isOpen={openDialog}
                title={"Do you want to end quiz?"}
                body={"Once you end this quiz you will start from the first question again"}
                onOk={() => {
                    setFinish(true);
                    setOpenDialog(false);
                }}
                onCancel={() => {
                    setOpenDialog(false);
                }} />
        </>
    );
}