"use client";
import "../../app/css/additional-styles/utility-patterns.css";
import "../../app/css/additional-styles/theme.css";
import { useState } from "react";
import Accordion from "./accordion";
import { useForm, SubmitHandler } from "react-hook-form";
import { useFormContext } from "../forms/formContext";

const SIHMultiStepForm: React.FC = () => {
  const { formData, setFormData } = useFormContext();
  const [step, setStep] = useState<number>(1);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
  });
  formData.team_members.length = formData.team_info.team_size;
  const onSubmit: SubmitHandler<any> = async (data) => {
    setFormData({ ...formData, ...data });
    if (step < 3) {
      setStep(step + 1);
    } else {
      try {
        let response = await fetch("/api/registration/sih", {
          method: "POST",
          body: JSON.stringify(data),
        });
        if(response.status==200) {
          setSuccess(true);
        }
        response = await response.json();

      } catch (error) {
        console.error("Error submitting form:", error);
        
      }

    }
  };

  if(isSuccess) {
    return (
      <div className="text-green-500 border-2 text-6xl">Registration SuccessFull!</div>
    );
  }

  return (
    <div className="my-4 mx-auto p-6 rounded-lg">
      
      <img className="rounded-full h-20 mx-auto mb-6 w-20" src="https://i0.wp.com/opportunitycell.com/wp-content/uploads/2022/03/SIH2.png?fit=327%2C345&ssl=1" alt="SIH" />
      <h1 className="mb-6 h1 text-center">SIH Registration Form</h1>
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
                type="tel"
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
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 "
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
                    College ID/Enrollment Number
                    <span className="text-red-600"> * </span>
                  </label>
                  <input
                    {...register(`team_members.${index}.enrollment_id`, {
                      required: "Enrollment ID is required",
                    })}
                    type="text"
                    placeholder="Enter enrollment ID"
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
                  <input
                    {...register(`team_members.${index}.course`, {
                      required: "Course is required",
                    })}
                    type="text"
                    placeholder="Enter course/department"
                    className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
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
                  <input
                    {...register(`team_members.${index}.year_of_study`, {
                      required: "Year of study is required",
                    })}
                    type="text"
                    placeholder="Enter year of study"
                    className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
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
                  <input
                    {...register(`team_members.${index}.branch`, {
                      required: "Branch is required",
                    })}
                    type="text"
                    placeholder="Enter branch"
                    className="w-full px-4 py-2 border rounded-md bg-transparent form-input focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
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
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:border-0 focus:outline-offset-0 focus:outline-green-500 mr-2"
            >
              Previous
            </button>

            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:border-0 focus:outline-offset-0 focus:outline-green-500"
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
              <textarea
                {...register("project_information.problem_statement", {
                  required: "Problem Statement is required",
                })}
                placeholder="Enter the problem statement"
                rows={4}
                className="w-full px-4 py-2 border rounded-md bg-transparent form-textarea focus:border-0 focus:outline-offset-0 focus:outline-green-500"
              ></textarea>
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
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:border-0 focus:outline-offset-0 focus:outline-green-500 mr-2"
            >
              Previous
            </button>

            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:border-0 focus:outline-offset-0 focus:outline-green-500"
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
