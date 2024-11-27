import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Pressable } from 'react-native';
import { IdigimonNew } from "@/interfaces/DigimonInterface2";
import { bringAllDigimons } from "@/lib/NewFetchDigi";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link } from 'expo-router';


const AllDigimonsTest = () => {
    const [digimons, setDigimons] = useState<IdigimonNew[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const inset = useSafeAreaInsets()

    useEffect(() => {
        const fetchDigimons = async () => {

            const data = await bringAllDigimons();
            setDigimons(data);
            console.log(data, setDigimons)
        };

        fetchDigimons();
    }, []);



    const paginatedData = digimons.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(digimons.length / itemsPerPage);

    return (



        <View style={{ paddingBottom: inset.bottom, paddingTop: inset.top }}>

            <Text >Digimon List</Text>
            <FlatList
                data={paginatedData}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <Link asChild href={`/name/${item.name}`}>
                        <Pressable>
                            <View >

                                <Image source={{ uri: item.img }} style={{ width: 40, height: 50 }} />
                                <View>
                                    <Text >{item.name}</Text>
                                    <Text >{item.level}</Text>
                                </View>
                            </View>
                        </Pressable>
                    </Link>
                )}
            />
            <View className='flex flex-row items-centerm-4 p-5'>
                <Pressable
                    onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className='pr-2'

                >
                    <Text >Anterior</Text>
                </Pressable>
                <Text >
                    Página {currentPage} de {totalPages}
                </Text>
                <Pressable
                    onPress={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className='pl-2'
                >
                    <Text >Siguiente</Text>
                </Pressable>
            </View>
        </View>

    );
};

export default AllDigimonsTest;