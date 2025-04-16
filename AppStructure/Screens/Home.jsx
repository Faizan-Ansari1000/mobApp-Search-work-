import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

export default function Home() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Welcome to Our App</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Retreive')}>
                <Text style={styles.buttonText}>Check Data</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    heading: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#7b241c',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
