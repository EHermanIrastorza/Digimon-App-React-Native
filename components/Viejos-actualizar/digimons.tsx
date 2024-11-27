import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Image, Button } from 'react-native';
import Digimon from '@/interfaces/DigimonInterface';
import { getAllDigimon, getAllLevels } from '@/lib/FetchDigi';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Digimons = () => {
    const [digimons, setDigimons] = useState<Digimon[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [levels, setLevels] = useState<{ id: number, level: string }[]>([])
    const itemsPerPage = 10;
    const inset = useSafeAreaInsets()

    useEffect(() => {
        const loadDigimons = async () => {
            try {
                const digimonsData = await getAllDigimon();
                const levelsData = await getAllLevels();
                
                setDigimons(digimonsData)
                setLevels(levelsData)

                const updatedDigimons = digimonsData.map(digimon => ({
                    ...digimon,
                    levels: levelsData.filter(level => level.id === digimon.id) || [],
                }));
                setDigimons(updatedDigimons);
            } catch (error) {
            }
        }
        loadDigimons();
    }, [])

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
        <View style={{ paddingTop: inset.top, paddingBottom: inset.bottom }}>
            {
                digimons.length === 0 ?(
                    <ActivityIndicator/>
                ):(
                    <>
                    <Text>Lista de Digimons</Text>
            <FlatList
            data={paginateData()}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                
                <View style={styles.itemContainer}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View>
                            <Text style={styles.name}>{item.name}</Text>

                            {item.levels && Array.isArray(item.levels) && item.levels.length > 0 ? (
                                <Text>Level: {item.levels.map(level => level.level).join(', ')}</Text>
                            ) : (
                                <Text>No levels available</Text>
                            )}

                        </View>
                    </View>
                )}
                />
            <View >
                <Button title="Back" onPress={prevPage} disabled={currentPage === 1} />
                <Text> Página {currentPage} </Text>
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
};

export default Digimons

const styles = StyleSheet.create({
    itemContainer: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: "#f9f9f9",
        borderRadius: 5,
        elevation: 2,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
});