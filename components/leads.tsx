const leads = [
    { id: 0, text: "lead 1" },
    { id: 1, text: "lead 2" },
    { id: 2, text: "lead 3" },
  ];

  const Leads = () => {
    return (
      <>
      <div className="container place-items-center font-bold pt-20 pb-10">
        <h2 className="text-5xl text-white-800 text-center">Leads</h2>
        <h5 className="text-2xl text-white-800 text-center">
          Our Leadership Position are held by the best minds in and across the campus
        </h5>
      </div>
      <div className="view">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="box card-wrapper transition-transform duration-1000 ease-in-out transform hover:scale-105 hover:shadow-2xl"
          >
            <h1 className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-3xl text-base text-center text-green-600">
              {lead.text}
            </h1>
          </div>
        ))}
      </div>
      </>
    );
  };

  export default Leads;
  