import { IdigimonNew } from "@/interfaces/DigimonInterface2";
import { bringAllDigimons } from "@/lib/NewFetchDigi";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function NewUltimateFilterCards() {
    const [ultimate, setUtimate] = useState<IdigimonNew[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15
    const inset = useSafeAreaInsets()
    useEffect(() => {
        const fetchChampions = async () => {
            const data = await bringAllDigimons()
            const filteredRookies = data.filter((digimon) => digimon.level.toLocaleLowerCase() === "ultimate")
            setUtimate(filteredRookies)

        }
        fetchChampions()
    }, [])

    const paginateData = ultimate.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(ultimate.length / itemsPerPage)
    return (
        <View style={{ paddingTop: inset.top, paddingBottom: inset.bottom }}>

            <FlatList
                data={paginateData}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (

                    <View  >
                        <Image source={{ uri: item.img }} style={{ height: 100, width: 100 }} />
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