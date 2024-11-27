import { useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, Image, Text, View } from "react-native";
import Digimon from '@/interfaces/DigimonInterface';
import { getAllDigimon, getAllDigimonTypes, getAllLevels } from "@/lib/FetchDigi";


export function ChampionCards() {
    const [digimons, setDigimons] = useState<Digimon[]>([]);
    const [types, setTypes] = useState<{ id: number, type: string }[]>([]);
    const [levels, setLevels] = useState<{ id: number, level: string }[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20); // Cambia el número de items por página aquí

    useEffect(() => {
        const adultDigimons = async () => {
            try {
                console.log("Fetching data from APIs...");

                // Obtener los datos de las APIs
                const digimonsData = await getAllDigimon();
                const levelsData = await getAllLevels();
                const typeData = await getAllDigimonTypes();

                setTypes(typeData);
                setLevels(levelsData);

                console.log("Levels data:", levelsData);
                console.log("Types data:", typeData);

                // Encontrar el nivel "Adult"
                const adultLevel = levelsData.find(
                    (level) => level.level.toLowerCase() === "adult"
                );

                if (!adultLevel) {
                    throw new Error("No se encontró el nivel Adult");
                }

                console.log("Adult level:", adultLevel);

                // Añadir niveles a cada Digimon
                const updatedDigimons = digimonsData.map((digimon) => ({
                    ...digimon,
                    levels: levelsData.filter((level) => level.id === digimon.id) || [], // Asignar niveles
                }));

                console.log("Updated Digimons with Levels:", updatedDigimons);

                // Filtrar Digimons por nivel "Adult"
                const adults = updatedDigimons.filter((digimon) =>
                    Array.isArray(digimon.levels) &&
                    digimon.levels.some((level) => level.id === adultLevel.id)
                );

                console.log("Filtered Digimons:", adults);

                // Añadir tipos a cada Digimon
                const updatedAdults = adults.map((digimon) => ({
                    ...digimon,
                    types: Array.isArray(digimon.types) && digimon.types.length > 0
                        ? digimon.types.map((type) => {
                            const matchedType = typeData.find((t) => t.id === type.id);
                            return matchedType
                                ? { id: matchedType.id, type: matchedType.type }
                                : { id: -1, type: "Unknown" };
                        })
                        : typeData.filter((t) => t.id === digimon.id).map((t) => ({
                            id: t.id,
                            type: t.type,
                        })),
                }));

                console.log("Updated Adults with Types:", updatedAdults);
                setDigimons(updatedAdults);
            } catch (error: any) {
                console.error("Error al traer los Digimons Adult:", error);
            }
        };

        adultDigimons();
    }, []);

    const paginateData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return digimons.slice(startIndex, endIndex);
    };

    const nextPage = () => {
        if (currentPage * itemsPerPage < digimons.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <View>
            <Text>Adult Digimons</Text>
            {digimons.length === 0 ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <FlatList
                        data={paginateData()}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View>
                                <Text>{item.name}</Text>
                                <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />
                                <View>
                                    <Text>{item.name}</Text>
                                    {item.levels && Array.isArray(item.levels) && item.levels.length > 0 ? (
                                        <Text>Level: {item.levels.map(level => level.level).join(', ')}</Text>
                                    ) : (
                                        <Text>No levels available</Text>
                                    )}
                                </View>
                                <Text>Types: {item.types.map(t => t.type).join(", ")}</Text>
                                <Text>X Antibody: {item.xAntibody ? "Yes" : "No"}</Text>
                            </View>
                        )}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <Button title="Previous" onPress={prevPage} disabled={currentPage === 1} />
                        <Text>Page {currentPage}</Text>
                        <Button
                            title="Next"
                            onPress={nextPage}
                            disabled={currentPage * itemsPerPage >= digimons.length}
                        />
                    </View>
                </>
            )}
        </View>
    );
}