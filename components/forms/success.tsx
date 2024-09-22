

export default function Success(props: any) {
    return (
        <div className="w-full mx-auto">
        <div className="flex flex-col p-5 rounded-lg shadow">
          <div className="flex flex-col items-center text-center">
            <div className="inline-block p-4 bg-green-300 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 64 64"
              >
                <circle cx="32" cy="32" r="23" fill="#98c900"></circle>
                <path
                  fill="#fff"
                  d="M31.921,13.966c2.577,0,4.674-1.957,4.946-4.461c-1.594-0.349-3.247-0.539-4.946-0.539 c-12.703,0-23,10.297-23,23c0,1.699,0.19,3.352,0.539,4.946c2.505-0.272,4.461-2.369,4.461-4.946 C13.921,22.041,21.997,13.966,31.921,13.966z"
                  opacity=".3"
                ></path>
                <path
                  d="M54.382,27.021c-2.505,0.272-4.461,2.369-4.461,4.946c0,9.925-8.075,18-18,18 c-2.577,0-4.674,1.957-4.946,4.461c1.594,0.349,3.247,0.539,4.946,0.539c12.703,0,23-10.297,23-23 C54.921,30.268,54.732,28.614,54.382,27.021z"
                  opacity=".15"
                ></path>
                <path
                  fill="none"
                  stroke="#fff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  stroke-width="3"
                  d="M14.968,23.393c1.878-3.699,4.932-6.705,8.666-8.522"
                ></path>
                <ellipse cx="32" cy="61" opacity=".3" rx="19" ry="3"></ellipse>
                <g>
                  <path
                    fill="#edff9c"
                    d="M29,42c-0.512,0-1.023-0.195-1.414-0.586l-7-7c-0.781-0.781-0.781-2.047,0-2.828 c0.781-0.781,2.047-0.781,2.828,0L29,37.171l12.586-12.585c0.781-0.781,2.047-0.781,2.828,0c0.781,0.781,0.781,2.047,0,2.828 l-14,14C30.023,41.805,29.512,42,29,42z"
                  ></path>
                </g>
              </svg>
            </div>
            <h2 className="mt-2 font-semibold text-gray-100">
              Registration Successfull!
            </h2>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              {props.message}
            </p>
            <p className="mt-2 text-sm text-gray-400 leading-relaxed">
              Join the Whatsapp Group for further updates immediately.
            </p>
          </div>

          <div className="flex mx-auto items-center mt-3">
            <a href={props.joinLink}>
              <button className="flex-1 px-4 py-2 mx-auto bg-green-500 hover:bg-green-600 text-white text-sm rounded-md">
                Join the Whatsapp Group!
              </button>
            </a>
          </div>
        </div>
      </div>
    );
}