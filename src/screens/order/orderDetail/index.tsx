import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { StyleSheet, Pressable } from 'react-native'
import { Box, Button, Input, Icon } from 'native-base';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Controller } from 'react-hook-form';

interface Props {
    id?: number;
    title: string;
    subTitle: string;
    navigate: string;
    collapse?: any;
    setCollapse?: any;
    control?: any;
}

const OrderDetail: React.FC<Props> = ({ id, title, subTitle, navigate, collapse, setCollapse }) => {
    const navigation = useNavigation()
    const handleAddButtonPress = () => {
        // console.log(collapse);

        switch (id) {
            case 1:
                setCollapse({ ...collapse, isOrderTypeChoosingVisible: !collapse.isOrderTypeChoosingVisible });
                break;
            case 2:
                setCollapse({ ...collapse, isTotalWeightVisible: !collapse.isTotalWeightVisible });
                break;
            case 3:
                setCollapse({ ...collapse, isTotalDimensionVisible: !collapse.isTotalDimensionVisible });
                break;
            case 4:
                setCollapse({ ...collapse, isNoteVisible: !collapse.isNoteVisible });
                break;
        }
    };
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.header_2}>{title}</Text>
                <Text>{subTitle}</Text>
            </View>
            <View style={styles.buttonView}>
            <Button style={styles.button} onPress={handleAddButtonPress} >
                <Text style={styles.textButton}>
                    View
                </Text>
            </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    header_1: {
        fontSize: 25,
        fontWeight: "700",
    },
    header_2: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 5,
    },
    button: {
        borderRadius: 15,
        backgroundColor: "#F79E1B",
    },
    textButton: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: '700',
        textAlign: 'center'
    },
    buttonView: {
        justifyContent: "center",
        minWidth: 90,
        borderRadius: 10,
    }
})

export default OrderDetail