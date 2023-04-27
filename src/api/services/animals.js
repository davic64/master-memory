import api from "../config";

export const getAnimals = async () => {
  const response = await api.get("/animals/types/game/entries?per_page=20");
  return response.data;
};
