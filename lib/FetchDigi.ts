import Digimon from "@/interfaces/DigimonInterface";

const DIGIMON_API_URL = "https://digi-api.com/api/v1/digimon";
const DIGIMON_API_LEVEL = "https://digi-api.com/api/v1/level";
const DIGIMON_API_TYPE = "https://digi-api.com/api/v1/type";

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
  let nextPageUrl = DIGIMON_API_LEVEL;

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
        throw new Error(
          "Los datos recibidos no contienen los niveles esperados"
        );
      }

      nextPageUrl = data.pageable?.nextPage || null;
    }
  } catch (error: any) {
    console.error("Error fetching la API", error);
    throw error;
  }

  return allLevels;
}

export async function getAllDigimonTypes(): Promise<
  { id: number; type: string }[]
> {
  let allDigimonTypes: { id: number; type: string }[] = [];
  let nextPageUrl = DIGIMON_API_TYPE;

  try {
    while (nextPageUrl) {
      const response = await fetch(nextPageUrl);
      if (!response.ok) {
        throw new Error("Algo falló en el fetch");
      }

      const data = await response.json();

    
      console.log("Datos recibidos de la API:", data);

     
      if (data.content && Array.isArray(data.content.fields)) {
       
        allDigimonTypes = [
          ...allDigimonTypes,
          ...data.content.fields.map((field: any) => ({
            id: field.id, 
            type: field.name, 
          })),
        ];
      } else {
        throw new Error(
          "Los datos recibidos no contienen los tipos de Digimon esperados"
        );
      }

      nextPageUrl = data.pageable?.nextPage || null;
    }
  } catch (error: any) {
    console.error("Error al hacer fetch de la API", error);
    throw error;
  }

  return allDigimonTypes;
}
