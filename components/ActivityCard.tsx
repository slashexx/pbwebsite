import { cn } from "@/lib/server/utils";
import HyperText from "./magicui/hyper-text";
import Image from "next/image";

interface ActivityCardProps {
    LeftAligned: boolean;
    Title: string;
    Subtitle: string;
    Description: string;
    ImageSrc: string;
}

export default function ActivityCard({...props}: ActivityCardProps) {
    return (
      <div
        className={cn(
            "flex flex-col gap-4 md:gap-0 md:flex-row h-full px-8 md:px-24 text-center", 
            !props.LeftAligned ? "md:text-left" : "md:text-right",
            props.LeftAligned ? "" : "md:flex-row-reverse",
        )}
        data-aos="zoom-y-out"
        data-aos-delay="150"
      >
        <div className="highlight flex-6">
            <div className="flex flex-col bg-black-800 p-0 md:p-24 md:justify-center content-center">
                <div className={cn(
                        "mx-auto",
                        !props.LeftAligned ? "md:mr-auto md:ml-0" : "md:ml-auto md:mr-0"
                    )}>
                    <HyperText
                        className={cn("text-3xl font-bold text-green-500 text-wrap")}
                        duration={200}
                        text={props.Title}
                    />
                </div>
                <h2 className="text-4xl font-semibold mb-4 -mt-4 px-0">{props.Subtitle}</h2>
                <p className="text-lg px-0 text-gray-300">
                    {props.Description}
                </p>
            </div>
        </div>

        <div className="highlight md:flex-6 md:my-auto md:px-8">
            <div className="highlight md:w-96 h-96 flex-3 flex items-center justify-center bg-black-900">
                <Image
                    src={props.ImageSrc}
                    alt=""
                    className="rounded-xl object-cover w-full h-full"
                    width={"500"}
                    height={"500"}
                />
            </div>
        </div>
      </div>
    );
}