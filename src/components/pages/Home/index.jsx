import { useEffect, useCallback, useState, useMemo } from "react";
import { getAnimals } from "../../../api";
import {
  Coin,
  CoinBad,
  errorSound,
  coinSound,
  gameSong,
  playSound,
} from "../../../assets";
import { Badge, Button } from "../../atoms";
import { Card, Modal } from "../../molecules";

const Home = () => {
  const [animalsMemo, setAnimalsMemo] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const [matchedCards, setMatchedCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [score, setScore] = useState({ points: 0, errors: 0 });

  const soundTrackPlay = useCallback(() => {
    const music = new Audio(gameSong);
    music.loop = true;
    music.play();
  }, []);

  const soundPoint = useCallback((sound) => {
    const music = new Audio(sound);
    music.play();
  }, []);

  const playGame = useCallback(() => {
    const soundPlay = new Audio(playSound);
    soundPlay.play();
    soundTrackPlay();
    setPlaying(true);
  }, []);

  const handleClickCard = useCallback(
    (card, index) => {
      if (selectedCards.length === 2) return;
      if (selectedCards.some((cardData) => cardData.index === index)) {
        setSelectedCards(
          selectedCards.filter((selected) => selected.index !== index)
        );
        return;
      }
      setSelectedCards([...selectedCards, { animal: card.image.title, index }]);
    },
    [setSelectedCards, selectedCards, matchedCards, setMatchedCards]
  );

  useEffect(() => {
    const getData = async () => {
      try {
        const animals = await getAnimals();
        const animalsArray = animals.entries.flatMap((animal) => [
          animal.fields,
          animal.fields,
        ]);
        animalsArray.sort(() => Math.random() - 0.5);
        setAnimalsMemo(animalsArray);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    !localStorage.getItem("name") ? setOpen(true) : setOpen(false);
  }, [open]);

  useMemo(() => {
    if (selectedCards.length === 2) {
      if (selectedCards[0].animal === selectedCards[1].animal) {
        soundPoint(coinSound);
        setScore({ ...score, points: score.points + 1 });
        setMatchedCards([...matchedCards, selectedCards[0].animal]);
      } else {
        soundPoint(errorSound);
        setScore({ ...score, errors: score.errors + 1 });
      }
      setTimeout(() => {
        setSelectedCards([]);
      }, 600);
    }
  }, [selectedCards]);

  return score.points !== animalsMemo.length / 2 ? (
    playing ? (
      <>
        <Modal isOpen={open} setOpen={setOpen} />
        <div className="pt-28 relative z-10">
          <div className="h-full w-full py-10 px-12 md:px-32">
            <div className="flex items-center justify-center gap-10">
              <Badge src={Coin} points={score.points} />
              <Badge src={CoinBad} points={score.errors} />
            </div>
            <div className="mt-10">
              <div className="flex flex-wrap gap-4 justify-center">
                {animalsMemo.map((animal, index) => (
                  <Card
                    key={index}
                    src={animal.image.url}
                    isFlipped={
                      selectedCards.some(
                        (cardData) => cardData.index === index
                      ) || matchedCards.includes(animal.image.title)
                    }
                    onClick={() =>
                      !matchedCards.includes(animal.image.title)
                        ? handleClickCard(animal, index)
                        : null
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    ) : (
      <div
        className="w-full flex flex-col items-center justify-center pt-28 text-center"
        style={{ height: "calc(100vh - 7rem" }}
      >
        <p className="text-3xl font-bold">Welcome to Master Memory!</p>
        <p className="text-2xl my-4">Instructions:</p>
        <ul className="text-center">
          <li>- Select two cards</li>
          <li>- If the cards match, you earn one point</li>
          <li>- If the cards do not match you will get an error</li>
          <li>- Find all pairs to win</li>
        </ul>
        <Button
          className="transform transition ease-in-out hover:scale-125 active:scale-50 text-xl mt-8"
          onClick={playGame}
        >
          Start Game
        </Button>
      </div>
    )
  ) : (
    <div
      className="w-full pt-28 flex flex-col items-center justify-center"
      style={{ height: "calc(100vh - 7rem" }}
    >
      <p className="w-full text-4xl md:text-5xl text-center font-bold px-20">
        Congratulations {localStorage.getItem("name")}, you have finished the
        game
        <br />
        <span className="bg-gradient-to-r from-purple-700 to-pink-600">
          you are a genius
        </span>
      </p>
    </div>
  );
};

export default Home;
