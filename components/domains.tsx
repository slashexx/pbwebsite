import { cn } from "@/lib/server/utils";
import Marquee from "@/components/magicui/marquee";

const domains = [
  {
    name: "ACM - ICPC",
    img: "https://icpc.global/regionals/abouticpc/foundationlogo.png",
  },
  {
    name: "Kaggle",
    img: "https://img.icons8.com/?size=100&id=Omk4fWoSmCHm&format=png&color=000000",
  },
  {
    name: "IOT-ML",
    img: "https://img.icons8.com/?size=100&id=Ih6zOUuHwOOs&format=png&color=000000",
  },
  {
    name: "ML-Research",
    img: "https://img.icons8.com/?size=100&id=114322&format=png&color=000000",
  },
  {
    name: "DevOps",
    img: "https://img.icons8.com/?size=100&id=13816&format=png&color=000000",
  },
  {
    name: "Flutter Development",
    img: "https://img.icons8.com/?size=100&id=7I3BjCqe9rjG&format=png&color=000000",
  },
  {
    name: "React Development",
    img: "https://img.icons8.com/?size=100&id=123603&format=png&color=000000",
  },
  {
    name: "Open Source Hackathon",
    img: "https://img.icons8.com/?size=100&id=63655&format=png&color=000000",
  },
  {
    name: "Interview Prep",
    img: "https://img.icons8.com/?size=100&id=13724&format=png&color=000000",
  },
];

const Card = ({ img, name }: { img: string; name: string }) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 border-gray-50/[.1] bg-gray-50/[.10] hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <img className="rounded-full" width="64" height="64" alt="" src={img} />
        <figcaption className="font-bold">{name}</figcaption>
      </div>
    </figure>
  );
};

export default function Domains() {
  return (
    <div className="">
      <h2 className="text-4xl font-bold text-center text-gray-200 m-2">
        Domains We Explore
      </h2>
      <p className="text-xl text-center text-gray-100 mb-8">
        Our club covers a wide range of interests and fields, bringing unique
        perspectives and expertise to every project!
      </p>
      <Marquee pauseOnHover className="[--duration:30s]">
        {domains.map((domain) => (
          <Card key={domain.name} {...domain} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"></div>
    </div>
  );
}
