import Digimons from "@/components/digimons";
import Landing from "@/components/landing";
import { Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaProvider>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>App de digimon.</Text>
        {/* <Digimons/> */}
        <Landing />
      </View>
    </SafeAreaProvider>
  );
}
