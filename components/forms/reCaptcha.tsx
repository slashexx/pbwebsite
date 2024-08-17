import { useEffect } from "react";

const Recaptcha = ({ onChange }: { onChange: (token: string | null) => void }) => {
  useEffect(() => {
    const loadRecaptcha = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '', { action: 'submit' }).then((token: string) => {
            onChange(token); 
          });
        });
      }
    };

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = loadRecaptcha;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [onChange]);

  return null;
};

export default Recaptcha;



