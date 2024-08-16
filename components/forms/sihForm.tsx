"use client";
import "../../app/css/additional-styles/utility-patterns.css";
import "../../app/css/additional-styles/theme.css";
import { useState } from "react";
import Accordion from "./accordion";
import { useForm, SubmitHandler } from "react-hook-form";
import { useFormContext } from "../forms/formContext";
import {
  years,
  courses,
  branches,
  problems,
} from "@/lib/constants/dropdownOptions";
import { useRouter } from "next/navigation";

const SIHMultiStepForm: React.FC = () => {
  const { formData, setFormData } = useFormContext();
  const [step, setStep] = useState<number>(1);
  formData.team_members.length = formData.team_info.team_size;
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
  });
  const onSubmit: SubmitHandler<any> = async (data : any) => {
    setFormData({ ...formData, ...data });
    if (step < 3) {
      setStep(step + 1);
      console.log(step);
    } else {
      try {
        let response = await fetch("/api/registration/sih", {
          method: "POST",
          body: JSON.stringify(data),
        });
        if (response.status == 200) {
          setSuccess(true);
        }
        response = await response.json();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  if (isSuccess) {
    const router = useRouter();
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
            <h2 className="mt-2 font-semibold text-gray-800">
              Registration Successfull!
            </h2>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              You have successfully registered for Smart India Hackathon.
            </p>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
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
      <img
        className="rounded-full h-20 mx-auto mb-10 w-20"
        src="https://i0.wp.com/opportunitycell.com/wp-content/uploads/2022/03/SIH2.png?fit=327%2C345&ssl=1"
        alt="SIH"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Team Information */}
        {step === 1 && (
          <div>
            <h2 className="h2 mb-4">Team Information</h2>
            <div className="mb-4">
              <label className="block mb-2">
                Team Name<span className="text-red-600"> * </span>
              </label>
              <input
                {...register("team_info.team_name", {
                  required: "Team Name is required",
                })}
                name="team_info.team_name"
                type="text"
                placeholder="Enter a unique team name"
                className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:border-0 focus:outline-offset-0 focus:outline-green-500"
              />
              {errors.team_info?.team_name && (
                <p className="text-red-500">
                  {errors.team_info.team_name.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2">
                Team Leader Name<span className="text-red-600"> * </span>
              </label>
              <input
                {...register("team_info.team_leader.name", {
                  required: "Team Leader Name is required",
                })}
                name="team_info.team_leader.name"
                type="text"
                placeholder="Enter the team leader's name"
                className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:border-0 focus:outline-offset-0 focus:outline-green-500"
              />
              {errors.team_info?.team_leader?.name && (
                <p className="text-red-500">
                  {errors.team_info.team_leader.name.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2">
                Team Leader Email<span className="text-red-600"> * </span>
              </label>
              <input
                {...register("team_info.team_leader.email", {
                  required: "Team Leader Email is required",
                })}
                name="team_info.team_leader.email"
                type="email"
                placeholder="Enter the team leader's email"
                className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:border-0 focus:outline-offset-0 focus:outline-green-500"
              />
              {errors.team_info?.team_leader?.email && (
                <p className="text-red-500">
                  {errors.team_info.team_leader.email.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2">
                Team Leader Phone Number
                <span className="text-red-600"> * </span>
              </label>
              <input
                {...register("team_info.team_leader.phone", {
                  required: "Team Leader Phone is required",
                })}
                name="team_info.team_leader.phone"
                type="tel"
                pattern="[1-9]{1}[0-9]{9}"
                placeholder="Enter the team leader's phone number"
                className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:border-0 focus:outline-offset-0 focus:outline-green-500"
              />
              {errors.team_info?.team_leader?.phone && (
                <p className="text-red-500">
                  {errors.team_info.team_leader.phone.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2">
                College/Institution Name
                <span className="text-red-600"> * </span>
              </label>
              <input
                {...register("team_info.college_name", {
                  required: "College Name is required",
                })}
                name="team_info.college_name"
                type="text"
                placeholder="Enter the institution name"
                className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:border-0 focus:outline-offset-0 focus:outline-green-500"
              />
              {errors.team_info?.college_name && (
                <p className="text-red-500">
                  {errors.team_info.college_name.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2">
                Team Size<span className="text-red-600"> * </span>
              </label>
              <input
                {...register("team_info.team_size", {
                  required: "Team Size is required",
                })}
                type="number"
                name="team_info.team_size"
                min="2"
                max="6"
                placeholder="Enter team size (usually 6)"
                className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:border-0 focus:outline-offset-0 focus:outline-green-500"
              />
              {errors.team_info?.team_size && (
                <p className="text-red-500">
                  {errors.team_info.team_size.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white rounded-lg py-2 px-4  hover:bg-green-600 "
            >
              Next
            </button>
          </div>
        )}

        {/* Step 2: Team Members Information */}
        {step === 2 && (
          <div>
            <h2 className="h2 mb-4">Team Members Information</h2>

            {formData.team_members.map((member, index) => (
              <Accordion key={index} title={`Member ${index + 1}`}>
                <div className="mb-4">
                  <label className="block">
                    Name<span className="text-red-600"> * </span>
                  </label>
                  <input
                    {...register(`team_members.${index}.name`, {
                      required: "Name is required",
                    })}
                    name={`team_members.${index}.name`}
                    type="text"
                    placeholder="Enter member's name"
                    className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {errors.team_members?.[index]?.name && (
                    <p className="text-red-500">
                      {errors.team_members[index].name.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block">
                    Email<span className="text-red-600"> * </span>
                  </label>
                  <input
                    {...register(`team_members.${index}.email`, {
                      required: "Email is required",
                    })}
                    name={`team_members.${index}.email`}
                    type="email"
                    placeholder="Enter member's email"
                    className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {errors.team_members?.[index]?.email && (
                    <p className="text-red-500">
                      {errors.team_members[index].email.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block">
                    Phone Number<span className="text-red-600"> * </span>
                  </label>
                  <input
                    {...register(`team_members.${index}.phone`, {
                      required: "Phone number is required",
                    })}
                    name={`team_members.${index}.phone`}
                    pattern="[1-9]{1}[0-9]{9}"
                    type="tel"
                    placeholder="Enter member's phone number"
                    className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {errors.team_members?.[index]?.phone && (
                    <p className="text-red-500">
                      {errors.team_members[index].phone.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block">
                    Role in Team<span className="text-red-600"> * </span>
                  </label>
                  <input
                    {...register(`team_members.${index}.role`, {
                      required: "Role is required",
                    })}
                    name={`team_members.${index}.role`}
                    type="text"
                    placeholder="Enter role in team"
                    className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {errors.team_members?.[index]?.role && (
                    <p className="text-red-500">
                      {errors.team_members[index].role.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block">
                    College ID/USN
                    <span className="text-red-600"> * </span>
                  </label>
                  <input
                    {...register(`team_members.${index}.enrollment_id`, {
                      required: "College ID is required",
                    })}
                    name={`team_members.${index}.enrollment_id`}
                    pattern="[1][D][S][1-2][0-9][A-Z][A-Z][0-9]{3}"
                    type="text"
                    placeholder="Enter college ID"
                    className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  {errors.team_members?.[index]?.enrollment_id && (
                    <p className="text-red-500">
                      {errors.team_members[index].enrollment_id.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block">
                    Course/Department<span className="text-red-600"> * </span>
                  </label>
                  <select
                    {...register(`team_members.${index}.course`, {
                      required: "Course is required",
                    })}
                    name={`team_members.${index}.course`}
                    className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:outline-none focus:border-2 focus:border-green-500"
                  >
                    {courses.map((course) => (
                      <option
                        className="w-full px-4 py-2 border bg-black t rounded-md form-input focus:outline-none focus:border-2 focus:border-green-500"
                        value={course}
                      >
                        {course}
                      </option>
                    ))}
                  </select>
                  {errors.team_members?.[index]?.course && (
                    <p className="text-red-500">
                      {errors.team_members[index].course.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block">
                    Year of Study<span className="text-red-600"> * </span>
                  </label>
                  <select
                    {...register(`team_members.${index}.year_of_study`, {
                      required: "Year of study is required",
                    })}
                    name={`team_members.${index}.year_of_study`}
                    className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {years.map((year) => (
                      <option
                        className="w-full px-4 py-2 border rounded-md bg-black form-input focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={year}
                      >
                        {year}
                      </option>
                    ))}
                  </select>
                  {errors.team_members?.[index]?.year_of_study && (
                    <p className="text-red-500">
                      {errors.team_members[index].year_of_study.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block">
                    Branch<span className="text-red-600"> * </span>
                  </label>
                  <select
                    {...register(`team_members.${index}.branch`, {
                      required: "Branch is required",
                    })}
                    name={`team_members.${index}.branch`}
                    className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {branches.map((branch) => (
                      <option
                        className="w-50 text-wrap px-4 py-2 border rounded-md bg-black form-input focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={branch}
                      >
                        {branch}
                      </option>
                    ))}
                  </select>
                  {errors.team_members?.[index]?.branch && (
                    <p className="text-red-500">
                      {errors.team_members[index].branch.message}
                    </p>
                  )}
                </div>
              </Accordion>
            ))}

            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="bg-green-500 text-white rounded-lg py-2 px-4 hover:bg-green-600 focus:border-0 focus:outline-offset-0 focus:outline-green-500 mr-2"
            >
              Previous
            </button>

            <button
              type="submit"
              className="bg-green-500 text-white rounded-lg py-2 px-4 hover:bg-green-600 focus:border-0 focus:outline-offset-0 focus:outline-green-500"
            >
              Next
            </button>
          </div>
        )}

        {/* Step 3: Project Information */}
        {step === 3 && (
          <div>
            <h2 className="h2 mb-4">Project Information</h2>

            <div className="mb-4">
              <label className="block mb-2">
                Project Title<span className="text-red-600"> * </span>
              </label>
              <input
                {...register("project_information.title", {
                  required: "Project Title is required",
                })}
                name="project_information.title"
                type="text"
                placeholder="Enter project title"
                className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:border-0 focus:outline-offset-0 focus:outline-green-500"
              />
              {errors.project_information?.title && (
                <p className="text-red-500">
                  {errors.project_information.title.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2">
                Project Abstract<span className="text-red-600"> * </span>
              </label>
              <textarea
                {...register("project_information.abstract", {
                  required: "Project Abstract is required",
                })}
                name="project_information.abstract"
                placeholder="Enter a brief description of the project"
                rows={6}
                className="w-full px-4 py-2 border rounded-md bg-transparent form-textarea focus:border-0 focus:outline-offset-0 focus:outline-green-500"
              ></textarea>
              {errors.project_information?.abstract && (
                <p className="text-red-500">
                  {errors.project_information.abstract.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2">
                Problem Statement<span className="text-red-600"> * </span>
              </label>
              <select
                {...register("project_information.problem_statement", {
                  required: "Problem Statement is required",
                })}
                size={1}
                name="project_information.problem_statement"
                className="w-full px-4 py-2 border rounded-md bg-transparent form-textarea focus:border-0 focus:outline-offset-0 focus:outline-green-500"
              >
                {problems.map((problem) => (
                  <option
                    className="px-4 py-2 border rounded-md bg-transparent form-input focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={problem}
                  >
                    {problem}
                  </option>
                ))}
              </select>
              {errors.project_information?.problem_statement && (
                <p className="text-red-500">
                  {errors.project_information.problem_statement.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2">
                Technology Stack<span className="text-red-600"> * </span>
              </label>
              <input
                {...register("project_information.tech_stack", {
                  required: "Technology Stack is required",
                })}
                name="project_information.tech_stack"
                type="text"
                placeholder="Enter the tech stack (e.g. NextJS, TypeScript, Tailwind Css...)"
                className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:border-0 focus:outline-offset-0 focus:outline-green-500"
              />
              {errors.project_information?.tech_stack && (
                <p className="text-red-500">
                  {errors.project_information.tech_stack.message}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="bg-green-500 text-white rounded-lg py-2 px-4 hover:bg-green-600 focus:border-0 focus:outline-offset-0 focus:outline-green-500 mr-2"
            >
              Previous
            </button>

            <button
              type="submit"
              className="bg-green-500 text-white rounded-lg py-2 px-4 hover:bg-green-600 focus:border-0 focus:outline-offset-0 focus:outline-green-500"
            >
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SIHMultiStepForm;
