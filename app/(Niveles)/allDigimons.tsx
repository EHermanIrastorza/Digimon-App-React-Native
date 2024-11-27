import AllDigimonsTest from "@/components/alldigimonsTest";
import { Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function allDigimons() {
    return (
        <SafeAreaProvider>
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}>

               <AllDigimonsTest/>
            </View>
        </SafeAreaProvider>
    )
}