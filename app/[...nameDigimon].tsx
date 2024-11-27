
import { IdigimonNew } from "@/interfaces/DigimonInterface2";
import { digimonNamesId } from "@/lib/NewFetchDigi";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

export default function NameDigimon() {
    const [digimon, setDigimon] = useState<IdigimonNew | null>(null);
    const { nameDigimon } = useLocalSearchParams();
  
    useEffect(() => {
      
  
      const fetchDigimon = async () => {
        try {
       
          if (Array.isArray(nameDigimon)) {
           
            const data = await digimonNamesId(nameDigimon[1]); 
            console.log("Fetched Digimon (array case):", data); 
            setDigimon(data); 
          } else if (typeof nameDigimon === 'string') {
           
            const data = await digimonNamesId(nameDigimon);
            console.log("Fetched Digimon (string case):", data); 
            setDigimon(data); 
          }
        } catch (error) {
          console.error("Error fetching Digimon:", error); 
        }
      };
  
      fetchDigimon();
    }, [nameDigimon]); 
  
    return (
      <View>
        {digimon ? (
          <View>
            <View className="flex flex-col items-center justify-center border">
            <Image source={{ uri: digimon.img }} style={{ width: 100, height: 100 }} />
            </View>
            <View className="flex flex-col items-center justify-center border bg-gray-700">
            <Text className="text-xl text-white ">Nombre: {digimon.name}</Text>
            <Text>Nivel: {digimon.level}</Text>
            </View>
          </View>
        ) : (
          <Text>Cargando...</Text>
        )}
      </View>
    )

}


