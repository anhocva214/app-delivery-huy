import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button, StyleSheet } from 'react-native'
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

const OrderDetail: React.FC<Props> = ({id, title, subTitle, navigate, collapse, setCollapse}) => {
    const navigation = useNavigation()
    const handleAddButtonPress = () => {
        switch (id) {
            case 1:
                setCollapse({...collapse, isOrderTypeChoosingVisible: !collapse.isOrderTypeChoosingVisible});
                break;
            case 2:
                setCollapse({...collapse, isTotalWeightVisible: !collapse.isTotalWeightVisible});
                break;
            case 3:
                setCollapse({...collapse, isTotalDimensionVisible: !collapse.isTotalDimensionVisible});
                break;
            case 4:
                setCollapse({...collapse, isNoteVisible: !collapse.isNoteVisible});
                break;
        }
    };
    return (
        <View style={styles.container}>
            <View>
            <Text style={styles.header_2}>{title}</Text>
            <Text>{subTitle}</Text>
            </View>
            <View style={styles.button}>
            <Button color={"#FFFFFF"} title={((id==1 && collapse.isOrderTypeChoosingVisible) || 
                (id==2 && collapse.isTotalWeightVisible) ||
                (id==3 && collapse.isTotalDimensionVisible) ||
                (id==4 && collapse.isNoteVisible)) ? "Collapse" : "Open"} onPress={handleAddButtonPress} />
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
        backgroundColor: "#F79E1B",
        borderRadius: 5,
        minWidth: 90        
    }
})

export default OrderDetail