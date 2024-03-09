import axios from "axios";
import { getCookie } from "cookies-next";

export const getAllQuestion = async () => {
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI}/questions`,
    {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }
  );
  return result;
};
