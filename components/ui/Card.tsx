interface CardProps {
    name: string;
    domain: string;
    company: string;
}

const Card: React.FC<CardProps> = ({ name, domain, company }) => {
    return (

        <div className="relative w-72 h-44 border rounded-xl overflow-hidden shadow-lg transition-transform transform hover:-translate-y-1 hover:shadow-white hover:shadow-md bg-gray-900">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center p-4 text-white">
                <div className="relative flex flex-col items-center text-center">
                    <p className="text-xl font-bold text-gray-300 mb-1">{name}</p>
                    <p className="text-md text-gray-400 mb-1">{domain}</p>
                    <p className="text-md text-transparent bg-clip-text bg-gradient-to-r from-[#a2d240] to-[#1b8b00]">
                        {company}
                    </p>
                </div>
            </div>
        </div>

    );
}

export default Card;