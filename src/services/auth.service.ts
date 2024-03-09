import axios, { AxiosError } from "axios";

export const signInService = async (phone: string, password: string) => {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI}/auth/login`,
      {
        phone,
        password,
      }
    );
    return {
      status: result.status,
      data: result.data,
    };
  } catch (err: AxiosError | any) {
    console.log(err);
    return {
      status: err.response.status,
      data: err.response.data,
    };
  }
};

export const signUpService = async (
  phone: string,
  name: string,
  password: string
) => {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI}/users`,
      {
        phone,
        fullname: name,
        password,
      }
    );
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
};
