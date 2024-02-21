import React, { useState } from "react";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import { getSession, login, logout } from "@/lib";
import {
  FORGOT_PASSWORD_TITLE,
  PASSWORD_PLACEHOLDER,
  SIGN_IN_TITLE,
  USERNAME_PLACEHOLDER,
} from "@/constants";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import Input from "./Input";
import Checkbox from "./Checkbox";
import Header from "./Header";
import { IForm } from "@/types";

export default async function Form() {
  const session = await getSession();

  return (
    <form 
      className="flex flex-col items-center gap-y-24 bg-white p-8 md:p-12 max-w-md w-full rounded-lg font-sans"
      action={async (formData) => {
        "use server";
        await login(formData);
        redirect("/");
      }}
    >
      <Header />
      <div className="flex flex-col items-center gap-y-8">
        <Input
          type={"text"}
          placeholder={USERNAME_PLACEHOLDER}
          icon={<PersonIcon sx={{ color: "#999999" }} />}
        />
        <Input
          type={"password"}
          placeholder={PASSWORD_PLACEHOLDER}
          icon={<LockIcon sx={{ color: "#999999" }} />}
        />
        <Checkbox />
        <button 
          type="submit"
          className="bg-blueOcean hover:bg-blue-600 text-white font-medium rounded-full h-12 w-full text-lg uppercase transition duration-100 ease-in-out cursor-pointer"
        >
          {SIGN_IN_TITLE}
        </button>
        <p className="text-center text-gray-400 text-sm">
          {FORGOT_PASSWORD_TITLE}
        </p>
      </div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </form>
  );
}
