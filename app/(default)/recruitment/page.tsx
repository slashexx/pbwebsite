
import RecruitmentForm from "@/components/forms/recruitmentForm";
import DotPattern from "@/components/magicui/dot-pattern";
import "../../css/additional-styles/form.css";
import { cn } from "@/lib/utils";
const RegisterPage = () => {
  return (
    
      <div className="w-50 mt-16 mx-auto flex flex-col items-center justify-center">
 
        <div className="form-container my-2">
          <RecruitmentForm />
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
    
  );
};

export default RegisterPage;
