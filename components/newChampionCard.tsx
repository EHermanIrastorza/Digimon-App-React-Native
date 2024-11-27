import { IdigimonNew } from "@/interfaces/DigimonInterface2";
import { bringAllDigimons } from "@/lib/NewFetchDigi";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const digimonChampionLogo = require("@/assets/images/DigiImagen/greymon-champions.png")

export default function NewChampionsFilterCards() {
    const [champion, setChampion] = useState<IdigimonNew[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15
    const inset = useSafeAreaInsets()
    useEffect(() => {
        const fetchChampions = async () => {
            const data = await bringAllDigimons()
            const filteredChampions = data.filter((digimon) => digimon.level.toLocaleLowerCase() === "champion")
            setChampion(filteredChampions)

        }
        fetchChampions()
    }, [])

    const paginateData = champion.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(champion.length / itemsPerPage)
    return (
        <View style={{ paddingTop: inset.top, paddingBottom: inset.bottom }}>
            <View className=' flex flex-col items-center justify-center bg-green-600 rounded-tl-3xl rounded-br-3xl border' >
                <Image source={digimonChampionLogo} style={{ height: 100, width: 100 }} />
            </View >
            <FlatList
                data={paginateData}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                
                    <View  >
                        <Image source={{ uri: item.img }} style={{ height: 100, width: 100 }}/>
                <View>
                    <Text>
                     {item.name}
                    </Text>
                </View>
                    </View>
                )}
            >

            </FlatList>
        </View>
    )
}