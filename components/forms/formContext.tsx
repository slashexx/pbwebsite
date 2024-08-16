"use client";

import React, { createContext, useContext, useState } from "react";

interface ITeamInfo {
  team_name: string;
  college_name: string;
  team_size: number;
  team_leader: {
    name: string;
    email: string;
    phone: string;
  };
}

interface ITeamMember {
  name: string;
  email: string;
  phone: string;
  role: string;
  enrollment_id: string;
  course: string;
  year_of_study: string;
  branch: string;
}

interface IProjectInfo {
  title: string;
  abstract: string;
  problem_statement: string;
  tech_stack: string;
}

interface IFormData {
  team_info: ITeamInfo;
  team_members: ITeamMember[];
  project_information: IProjectInfo;
}

interface IFormContextType {
  formData: IFormData;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}

const FormContext = createContext<IFormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState<IFormData>({
    team_info: {
      team_name: "",
      college_name: "",
      team_size: 6,
      team_leader: {
        name: "",
        email: "",
        phone: "",
      },
    },
    team_members: Array.from({ length: 6 }, () => ({
      name: "",
      email: "",
      phone: "",
      role: "",
      enrollment_id: "",
      course: "",
      year_of_study: "",
      branch: "",
    })),
    project_information: {
      title: "",
      abstract: "",
      problem_statement: "",
      tech_stack: "",
    },
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
