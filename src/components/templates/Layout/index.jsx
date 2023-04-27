import Header from "../../organisms/Header";
import { JungleBG } from "../../../assets";

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-900 text-white" style={{ minHeight: "100vh" }}>
      <img
        src={JungleBG}
        alt="background"
        className="w-full h-[100vh] object-cover fixed opacity-10 pointer-events-none"
      />
      <Header />
      {children}
    </div>
  );
};

export default Layout;
