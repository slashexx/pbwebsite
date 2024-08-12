import { CSSProperties, FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedShinyTextProps {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
}

const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 250,
}) => {
  return (
    <p
      style={
        {
          "--shimmer-width": `${shimmerWidth}px`,
        } as CSSProperties
      }
      className={cn(
        "relative",

        // Text color setup
        "text-gray-900 dark:text-gray-100",

        // Pulsating effect
        "animate-pulse",

        // Shimmer effect for light theme
        "bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shimmer-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)] bg-gradient-to-r from-transparent via-black to-transparent",

        // Shimmer effect for dark theme
        "dark:bg-gradient-to-r dark:from-transparent dark:via-gray-600 dark:to-transparent",

        className
      )}
    >
      {children}
    </p>
  );
};

export default AnimatedShinyText;
