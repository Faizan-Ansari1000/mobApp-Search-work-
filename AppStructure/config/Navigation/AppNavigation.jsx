import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../../Screens/Home";
import { StatusBar } from "react-native";
import Retreive from "../../Screens/Retreive";

export default function AppNavigation() {

    const Stack = createNativeStackNavigator();

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
                    <Stack.Screen name="Retreive" component={Retreive} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}