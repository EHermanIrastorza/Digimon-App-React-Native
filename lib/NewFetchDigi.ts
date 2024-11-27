import { IdigimonNew } from "@/interfaces/DigimonInterface2";

const NEWDIGIMON_API_URL = "https://digimon-api.vercel.app/api/digimon";

export async function bringAllDigimons(): Promise<IdigimonNew[]> {
  try {
    const response = await fetch(NEWDIGIMON_API_URL);

    if (!response.ok) {
      throw new Error("Algo falló en la fetch: " + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error al traer los Digimons:", error);
  }
  return []; 
}

export async function digimonNamesId(name: string): Promise<IdigimonNew | null> {
  try {
    const response = await fetch(`${NEWDIGIMON_API_URL}/name/${name}`); 

    if (!response.ok) {
      throw new Error("Algo falló en la fetch: " + response.statusText);
    }

    const data = await response.json();
    return data[0]; 
  } catch (error) {
    console.error(`Error al traer el Digimon con nombre ${name}:`, error);
    return null; 
  }
}