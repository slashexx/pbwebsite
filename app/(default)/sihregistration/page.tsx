// pages/register.tsx
import SIHRegistrationForm from "@/components/forms/sihForm";
import { FormProvider } from "@/components/forms/formContext";
import "../../css/additional-styles/form.css";
const RegisterPage = () => {
  return (
    <FormProvider>
      <div className="w-50 mx-auto flex items-center justify-center">

<div className="form-container"><SIHRegistrationForm /></div>
        
      </div>
    </FormProvider>
  );
};

export default RegisterPage;
