import { useEffect, useState } from "react";
import { Gorilla, Loro } from "../../../assets";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";

const Modal = ({ isOpen, setOpen }) => {
  const [name, setName] = useState("");

  const startGame = () => {
    localStorage.setItem("name", name);
    setOpen(false);
  };

  useEffect(() => {
    isOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "initial");
  }, [isOpen]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      startGame();
    }
  };

  return isOpen ? (
    <div className="w-full h-full absolute top-0 left-0 z-20 flex items-center justify-center">
      <div className="w-full h-full bg-black absolute opacity-40" />
      <div className="bg-gray-700 relative z-30 p-32 rounded-xl">
        <img
          src={Gorilla}
          alt="gorilla"
          className="w-56 absolute -left-20 -bottom-1 pointer-events-none select-none"
        />
        <img
          src={Loro}
          alt="loro"
          className="w-56 absolute -right-20 -top-20 pointer-events-none select-none"
        />
        <div className="flex flex-col items-center justify-center gap-6">
          <p className="font-bold text-2xl text-center">
            Before you start, write your name/nickname
          </p>
          <Input
            placeholder="Your name/nickname"
            className="w-full focus:outline-purple-500 text-gray-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button
            className="w-full text-xl transform transition ease-in-out hover:scale-95"
            onClick={startGame}
          >
            Start
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
