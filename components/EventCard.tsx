import Image from "next/image";

interface EventCardProps {
  event: {
    id: string;
    eventName: string;
    description: string;
    eventDate: string;
    lastDateOfRegistration: string;
    dateCreated: string;
    dateModified: string;
    imageURL: string;
    registrationLink: string;
  };
  isAdminLoggedIn: boolean;
  onDelete: (eventId: string) => void;
  onSelect: (event: {
    id: string;
    eventName: string;
    description: string;
    eventDate: string;
    lastDateOfRegistration: string;
    dateCreated: string;
    dateModified: string;
    imageURL: string;
    registrationLink: string;
  }) => void;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  isAdminLoggedIn,
  onDelete,
  onSelect,
}) => {
  // Extracting the day and month from the eventDate string
  const eventDate = new Date(event.eventDate);
  const day = eventDate.toLocaleString("en-US", { day: "2-digit" });
  const month = eventDate.toLocaleString("en-US", { month: "short" });

  return (
    <div
      className="relative bg-gray-900 shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer w-full mb-4 sm:w-1/3 sm:mb-0 md:w-3/12"
      onClick={() => onSelect(event)}
    >
      {/* Event Date Badge */}
      

      {/* Event Image */}
      <Image
        src={event.imageURL}
        alt={event.eventName}
        width={300}
        height={100}
        className="w-full h-48 p-2 object-cover rounded-2xl"
      />
      

      {/* Event Content */}
      <div className="p-5 text-white">
      <div className="absolute top-90 left-4 bg-gray-800 text-white p-2 rounded-2xl text-center shadow-lg ">
        <p className="text-xl font-bold">{day}</p>
        <p className="text-sm uppercase">{month}</p>
      </div>
        <h3 className="text-xl font-semibold mb-2 ml-16">{event.eventName}</h3>
        <p className="text-gray-400 mb-4 truncate ml-16">{event.description}</p>

        {/* Admin Options */}
        {isAdminLoggedIn && (
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(event);
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Update
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(event.id);
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
