// pages/register.tsx
import SIHRegistrationForm from "@/components/forms/sihForm";
import { FormProvider } from "@/components/forms/formContext";
import DotPattern from "@/components/magicui/dot-pattern";
import "../../css/additional-styles/form.css";
import { cn } from "@/lib/utils";
const RegisterPage = () => {
  return (
    <FormProvider>
      <div className="w-50 mt-16 mx-auto flex flex-col items-center justify-center">
        <div className="container">
          <div className="box">
            <div className="title">
              <span className="block"></span>
              <h1 className="h1">
                Register for Smart India Hackathon!<span></span>
              </h1>
            </div>
          </div>
        </div>

        <div className="form-container my-2">
          <SIHRegistrationForm />
        </div>
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
          )}
        />
      </div>
    </FormProvider>
  );
};

export default RegisterPage;
