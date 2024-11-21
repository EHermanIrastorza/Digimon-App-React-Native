import Digimon from "@/interfaces/DigimonInterface";

const DIGIMON_API_URL = "https://digi-api.com/api/v1/digimon";

export async function getAllDigimon(): Promise<Digimon[]> {
  let allDigimons: Digimon[] = [];
  let nextPageUrl = DIGIMON_API_URL;
  try {
    while (nextPageUrl) {
      const response = await fetch(nextPageUrl);
      if (!response.ok) {
        throw new Error("Algo fallo en el fetch");
      }
      const data = await response.json();
      if (Array.isArray(data.content)) {
        allDigimons = [
          ...allDigimons,
          ...data.content.map((digimon: any) => ({
            id: digimon.id,
            name: digimon.name,
            xAntibody: digimon.xAntibody,
            image: digimon.image,
          })),
        ];
      } else {
        throw new Error("los datos recibidos no se encuentran en el API");
      }
      nextPageUrl = data.pageable?.nextPage || null;
    }
  } catch (error: any) {
    console.error("Error fetching la API", error);
    throw error;
  }
  return allDigimons;
}

export async function getAllLevels(): Promise<{ id: number; level: string }[]> {
  let allLevels: { id: number; level: string }[] = [];
  let nextPageUrl = "https://digi-api.com/api/v1/level";

  try {
    while (nextPageUrl) {
      const response = await fetch(nextPageUrl);
      if (!response.ok) {
        throw new Error("Algo falló en el fetch");
      }

      const data = await response.json();
      console.log(data);  

      if (Array.isArray(data.content.fields)) {
        allLevels = [
          ...allLevels,
          ...data.content.fields.map((level: any) => ({
            id: level.id,
            level: level.name, 
          })),
        ];
      } else {
        throw new Error("Los datos recibidos no contienen los niveles esperados");
      }

      nextPageUrl = data.pageable?.nextPage || null;
    }
  } catch (error: any) {
    console.error("Error fetching la API", error);
    throw error;
  }

  return allLevels;
}
