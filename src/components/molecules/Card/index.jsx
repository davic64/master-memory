import { Logo } from "../../../assets";
import "./style.css";

const Card = ({ src, isFlipped, onClick }) => {
  return (
    <div
      className="flip-card cursor-pointer group relative w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36"
      onClick={onClick}
    >
      <div className={`flip-card-inner ${isFlipped ? "flip" : undefined}`}>
        <div className="flip-card-front">
          <div className="w-full h-full bg-gray-800 rounded-xl flex items-center justify-center">
            <img
              src={Logo}
              alt="logo"
              className="w-16 md:w-24 opacity-30 transition ease-in-out group-hover:opacity-100 select-none pointer-events-none"
            />
          </div>
        </div>
        <div className="flip-card-back absolute inset-0">
          <img
            src={src}
            alt="image"
            className="w-full h-full object-cover rounded-xl select-none pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
