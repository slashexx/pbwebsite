"use client";
import RecruitmentForm from "@/components/forms/recruitmentForm";
import DotPattern from "@/components/magicui/dot-pattern";
import "../../css/additional-styles/form.css";
import { cn } from "@/lib/server/utils";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/Firebase";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import Head from "next/head";
import Link from "next/link";

const RegisterPage = () => {
  const router = useRouter();

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (!user) {
  //       router.push("/login");
  //     }
  //   });
  // });

  // useEffect(() => {
  //   router.push("/");
  // })
  return (
    <>

      <div className="w-50 mt-16 mx-auto flex flex-col items-center justify-center">
      <Link href="https://www.codebattle.in/" target="_blank" rel="noopener noreferrer">
        <img
          src={"/images/codebattle.webp"}
          alt="recruitment-poster"
          height={200}
          width={1900}
          className="mt-9"
        />
      </Link>
        <div className="form-container my-2">
          <RecruitmentForm />
        </div>

        
      </div>
    </>
  );
};

export default RegisterPage;
