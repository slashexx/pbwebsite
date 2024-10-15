import Image from 'next/image';

interface CardProps {
    name: string;
    role: string;
    company: string;
    linkedInUrl: string;
    imageUrl: string;
}

const Card: React.FC<CardProps> = ({ name, role, company, linkedInUrl, imageUrl }) => {
    return (
        <div className="flex flex-col w-72 sm:w-72 h-[24rem] rounded-xl overflow-hidden shadow-lg transition-transform transform hover:-translate-y-1 hover:shadow-white hover:shadow-md">
            <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative w-full h-72"
            >

                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-t-xl"
                />


            </a>
            <div className="p-3 border-b border-l border-r border-gray-700 bg-black rounded-b-xl flex flex-col items-center text-center">
                <p className="text-lg font-bold text-white">{name}</p>
                <p className="text-sm text-gray-300">{role}</p>
                <p className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#a2d240] to-[#1b8b00] min-h-[1.25rem]">
                    {company}
                </p>
            </div>
        </div>
    );
};

export default Card;