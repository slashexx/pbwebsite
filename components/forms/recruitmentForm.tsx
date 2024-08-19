"use client";
import "../../app/css/additional-styles/utility-patterns.css";
import "../../app/css/additional-styles/theme.css";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { years, branches } from "@/lib/constants/dropdownOptions";
import Recaptcha from "./reCaptcha";

const RecruitmentForm: React.FC = () => {
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [mode, setMode] = useState<boolean>(false);
  const [display, setDisplay] = useState<boolean>(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      whatsapp_number: "",
      college_id: "",
      year_of_study: "",
      branch: "",
      about: "",
    },
  });

  const changeMode = (e: any) => {
    console.log(e.target.value);
    if (e.target.value === "1st year") setMode(true);
    else setMode(false);
    setDisplay(true);
  };

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA");
      return;
    }

    
    try {
      let response = await fetch("/api/registration/recruitment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status == 200) {
        setSuccess(true);
      }
      response = await response.json();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full mx-auto">
        <div className="flex flex-col p-5 rounded-lg shadow">
          <div className="flex flex-col items-center text-center">
            <div className="inline-block p-4 bg-green-300 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 64 64"
              >
                <circle cx="32" cy="32" r="23" fill="#98c900"></circle>
                <path
                  fill="#fff"
                  d="M31.921,13.966c2.577,0,4.674-1.957,4.946-4.461c-1.594-0.349-3.247-0.539-4.946-0.539 c-12.703,0-23,10.297-23,23c0,1.699,0.19,3.352,0.539,4.946c2.505-0.272,4.461-2.369,4.461-4.946 C13.921,22.041,21.997,13.966,31.921,13.966z"
                  opacity=".3"
                ></path>
                <path
                  d="M54.382,27.021c-2.505,0.272-4.461,2.369-4.461,4.946c0,9.925-8.075,18-18,18 c-2.577,0-4.674,1.957-4.946,4.461c1.594,0.349,3.247,0.539,4.946,0.539c12.703,0,23-10.297,23-23 C54.921,30.268,54.732,28.614,54.382,27.021z"
                  opacity=".15"
                ></path>
                <path
                  fill="none"
                  stroke="#fff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="3"
                  d="M14.968,23.393c1.878-3.699,4.932-6.705,8.666-8.522"
                ></path>
                <ellipse cx="32" cy="61" opacity=".3" rx="19" ry="3"></ellipse>
                <g>
                  <path
                    fill="#edff9c"
                    d="M29,42c-0.512,0-1.023-0.195-1.414-0.586l-7-7c-0.781-0.781-0.781-2.047,0-2.828 c0.781-0.781,2.047-0.781,2.828,0L29,37.171l12.586-12.585c0.781-0.781,2.047-0.781,2.828,0c0.781,0.781,0.781,2.047,0,2.828 l-14,14C30.023,41.805,29.512,42,29,42z"
                  ></path>
                </g>
              </svg>
            </div>
            <h2 className="mt-2 font-semibold text-gray-100">
              Registration Successfull!
            </h2>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              Data Saved ! Good Luck for the Test!
            </p>
            <p className="mt-2 text-sm text-gray-400 leading-relaxed">
              Join the Whatsapp Group for further updates immediately.
            </p>
          </div>

          <div className="flex mx-auto items-center mt-3">
            <a href="https://chat.whatsapp.com/EGnzKX13Xmi3pii7KOp7w5">
              <button className="flex-1 px-4 py-2 mx-auto bg-green-500 hover:bg-green-600 text-white text-sm rounded-md">
                Join the Whatsapp Group!
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-4 mx-auto p-6 rounded-lg">
      <h1 className="mb-6 h1 text-center">Recruitment Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h5 className="h5 mb-4 text-center">
            <span className="text-red-600"> * </span>Fields are required
          </h5>
          <div className="mb-4">
            <label className="block">
              Full Name<span className="text-red-600"> * </span>
            </label>
            <input
              {...register("name", {
                required: "Name is required",
              })}
              name="name"
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:border-0 focus:outline-offset-0 focus:outline-green-500"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-row justify-between">
            <div className="mb-4 w-1/2 pr-2">
              <label>
                Branch<span className="text-red-600"> * </span>
              </label>
              <select
                {...register(`branch`, {
                  required: "Branch is required",
                })}
                name={`branch`}
                size={1}
                className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:border-0 focus:outline-offset-0 focus:outline-green-500"
              >
                {branches.map((branch, index) => (
                  <option
                    className="text-wrap px-4 py-2 border rounded-md bg-black form-input focus:border-0 focus:outline-offset-0 focus:outline-green-500"
                    value={branch}
                    key={index}
                  >
                    {branch}
                  </option>
                ))}
              </select>
              {errors.branch && (
                <p className="text-red-500">{errors.branch.message}</p>
              )}
            </div>

            <div className="mb-4 w-1/2 pl-2">
              <label>
                Year of Study<span className="text-red-600"> * </span>
              </label>
              <select
                {...register(`year_of_study`, {
                  required: "Year of study is required",
                })}
                name={`year_of_study`}
                onChange={(e) => changeMode(e)}
                className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:border-0 focus:outline-offset-0 focus:outline-green-500"
              >
                {years.map((year, index) => (
                  <option
                    className="w-full px-4 py-2 border rounded-md bg-black form-input focus:border-0 focus:outline-offset-0 focus:outline-green-500"
                    value={year}
                    key={index}
                  >
                    {year}
                  </option>
                ))}
              </select>
              {errors.year_of_study && (
                <p className="text-red-500">{errors.year_of_study.message}</p>
              )}
            </div>
          </div>
          {display && (
            <>
              {mode === true ? (
                <div className="mb-4">
                  <label className="block">
                    {`Admission Numner(For 1st Years)`}
                    <span className="text-red-600"> * </span>
                  </label>
                  <input
                    {...register(`college_id`, {
                      required: "Admission Number is required",
                    })}
                    name={`college_id`}
                    pattern="[1-9][0-9][A-Z][A-Z][A-Z][A-Z][0-9]{4}"
                    type="text"
                    placeholder="Enter admission number"
                    className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:border-0 focus:outline-offset-0 focus:outline-green-500"
                  />
                  {errors.college_id && (
                    <p className="text-red-500">{errors.college_id.message}</p>
                  )}
                </div>
              ) : (
                <div className="mb-4">
                  <label className="block">
                    {`USN`}
                    <span className="text-red-600"> * </span>
                  </label>
                  <input
                    {...register(`college_id`, {
                      required: "USN is required",
                    })}
                    name={`college_id`}
                    pattern="[1][D][S][1-3][0-9][A-Z][A-Z][0-9]{3}"
                    type="text"
                    placeholder="Enter your USN"
                    className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:border-0 focus:outline-offset-0 focus:outline-green-500"
                  />
                  {errors.college_id && (
                    <p className="text-red-500">{errors.college_id.message}</p>
                  )}
                </div>
              )}
            </>
          )}

          <div className="mb-4">
            <label className="block mb-2">
              Email<span className="text-red-600"> * </span>
            </label>
            <input
              {...register("email", {
                required: "Email is required",
              })}
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:border-0 focus:outline-offset-0 focus:outline-green-500"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2">
              Whatsapp Number
              <span className="text-red-600"> * </span>
            </label>
            <input
              {...register("whatsapp_number", {
                required: "Whatsapp Number is required",
              })}
              name="whatsapp_number"
              type="tel"
              pattern="[1-9]{1}[0-9]{9}"
              placeholder="Enter your whatsapp number"
              className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:border-0 focus:outline-offset-0 focus:outline-green-500"
            />
            {errors.whatsapp_number && (
              <p className="text-red-500">{errors.whatsapp_number.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2">
              {`Tell us something about yourself (max 150 words)`}
              <span className="text-red-600"> * </span>
            </label>
            <textarea
              {...register("about", {
                required: "This field is required",
              })}
              name="about"
              rows={6}
              maxLength={1400}
              placeholder="I am a..."
              className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:border-0 focus:outline-offset-0 focus:outline-green-500"
            />
            {errors.about && (
              <p className="text-red-500">{errors.about.message}</p>
            )}
          </div>

          <Recaptcha onChange={setRecaptchaToken} />

          <button
            type="submit"
            className="bg-green-500 text-white rounded-lg py-2 px-4  hover:bg-green-600 "
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecruitmentForm;
