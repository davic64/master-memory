import { Logo } from "../../../assets";

const Header = () => {
  return (
    <div className="w-full text-center bg-gray-800 py-6 flex items-center justify-center bg-opacity-95 mx-auto my-auto select-none fixed z-20">
      <img
        src={Logo}
        alt="logo master memory"
        className="w-32 pointer-events-none"
      />
    </div>
  );
};

export default Header;
