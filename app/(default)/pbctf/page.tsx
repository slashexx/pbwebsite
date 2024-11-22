"use client";
import PBCTFForm from "@/components/forms/pbctfForm";
import DotPattern from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/server/utils";

const PBCTFRegisterPage = () => {
  return (
    <>

    <div className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="w-full max-w-2xl space-y-8 relative z-10">
        <PBCTFForm />
      </div>
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "absolute inset-0 scale-150 opacity-50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        )}
      />
    </div>
    </>
  );
};

export default PBCTFRegisterPage;

