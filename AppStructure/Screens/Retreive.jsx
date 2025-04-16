import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Text, TouchableOpacity, View, StyleSheet, ActivityIndicator, FlatList, TextInput, Modal, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Retreive() {
    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchId, setSearchId] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedClass, setSelectedClass] = useState("");

    const getData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get('https://sms.ilmwasooli.com/temp/gettestingdata');
            setPostData(res.data.Data);
        } catch (error) {
            console.log("ERROR: ", error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getData();
    }, []);

    const filteredData = selectedClass
        ? postData.filter((item) => item.Class === selectedClass)
        : searchId
            ? postData.filter((item) => item.id.toString().includes(searchId))
            : postData;

    const classes = [...new Set(postData.map(item => item.Class))];

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={{ color: '#7b241c' }}>Check By Class</Text>
                </TouchableOpacity>
            )
        })
    }, [navigation])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Student Records</Text>
            </View>

            {/* Search Input */}
            <TextInput
                style={styles.searchInput}
                placeholder="Search by ID"
                value={searchId}
                onChangeText={(e) => setSearchId(e)}
                keyboardType="numeric"
            />

            {loading ? (
                <ActivityIndicator size="large" color="#7b241c" style={styles.loader} />
            ) : filteredData && filteredData.length > 0 ? (
                <FlatList
                    data={filteredData}
                    renderItem={({ item }) => {
                        const isHighlighted = item.id.toString() === searchId;
                        return (
                            <TouchableOpacity
                                style={[styles.card, isHighlighted && styles.highlightedCard]}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.label}> ID: <Text style={styles.value}>{item.id}</Text></Text>
                                <Text style={styles.label}> Name: <Text style={styles.value}>{item.name}</Text></Text>
                                <Text style={styles.label}> Class: <Text style={styles.value}>{item.Class}</Text></Text>
                                <Text style={styles.label}> Admission Date: <Text style={styles.value}>{item.admissiondts}</Text></Text>
                                <Text style={styles.label}> Status: <Text style={styles.value}>{item.status}</Text></Text>
                            </TouchableOpacity>
                        );
                    }}
                />
            ) : (
                <Text style={styles.noDataText}> No data available</Text>
            )}

            {/* Modal*/}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Class</Text>
                        {classes.map((className, index) => (
                            <Pressable
                                key={index}
                                style={styles.classButton}
                                onPress={() => {
                                    setSelectedClass(className);
                                    setModalVisible(false);
                                }}
                            >
                                <Text style={styles.classButtonText}>{className}</Text>
                            </Pressable>
                        ))}
                        <Pressable
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#222',
    },
    searchInput: {
        height: 40,
        borderColor: '#7b241c',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        paddingLeft: 10,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    loader: {
        marginTop: 30,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 3,
        shadowRadius: 4,
    },
    highlightedCard: {
        backgroundColor: '#fcf3cf',
        borderColor: '#7b241c',
        borderWidth: 2,
    },
    label: {
        fontSize: 16,
        color: '#444',
        marginBottom: 4,
        fontWeight: '600',
    },
    value: {
        fontWeight: '400',
        color: '#333',
    },
    noDataText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: 'gray',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: 300,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    classButton: {
        backgroundColor: '#7b241c',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    classButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    closeButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginTop: 20,
    },
    closeButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
});
