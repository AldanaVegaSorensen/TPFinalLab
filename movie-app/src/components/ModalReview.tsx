import { Modal, View, Pressable , Text, TextInput, StyleSheet, StatusBar} from "react-native"
import { Ionicons } from "@expo/vector-icons"; 
import { StarRating } from "./StarRating";
import { Fecha } from "./Fecha";
import { useState } from "react";
import { COLORS } from "../constants/colors";


interface ModalReviewProps {
    visible: boolean;
    onClose: () => void;
    onSave: (
        fecha: Date,
        rating: number,
        comment: string
    ) => void;
}

export default function ModalReview({
  visible,
  onClose,
  onSave,
}: ModalReviewProps) {
    const [fecha, setFecha] = useState<Date>(new Date());
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState("");

    const handleSave = () => {
        onSave(fecha, rating, comment);
    };

    
    return(
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Escribir review</Text>
                    <Pressable style={styles.close} onPress={onClose}>
                        <Ionicons
                            name="close"
                            size={28}
                            color="white"
                        />
                    </Pressable>
                </View>
                
                <View style={styles.content}>
                    <Text style={styles.label}>Fecha</Text>
                    <Fecha
                        value={fecha}
                        onChange={setFecha}
                    />

                    <View style={styles.divider}></View>

                    <Text style={styles.label}>Puntuación</Text>
                    <StarRating rating={rating} onChange={setRating}/>

                    <View style={styles.divider}></View>
                </View>

                

                <View style={styles.content}>
                    <Text style={styles.label}>Comentario</Text>
                    <TextInput style={styles.textInput} placeholder="Haz un comentario..." multiline textAlignVertical="top" onChangeText={setComment}></TextInput>
                </View>
                
                <Pressable
                    style={styles.actionButton}
                    onPress={handleSave}
                >
                    <Text style={styles.actionText}>Guardar</Text>
                </Pressable>
                
            </View>
        </Modal>

    )
}

const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor:COLORS.surface
    },
    containerInput:{
        flex: 1,
    },
    header:{
        height: 65,
        backgroundColor:COLORS.primary,
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center',
        paddingHorizontal:20,
        position:'relative'
    },
    title:{
        color:'white',
        fontSize:22,
        fontWeight: '700'
    },
    close:{
        position:'absolute',
        right: 15,
        padding:6,
    },
    content:{
        padding:20,
        gap:24,
    },
    label:{
        color:COLORS.text,
        fontSize:18,
        fontWeight: '600'
    },
    input:{
        height: 40,
        margin: 12,
        padding: 10,
        borderWidth: 1,
    },
    textInput:{
        minHeight: 130,
        backgroundColor: "white",
        borderRadius: 12,
        padding: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#DDD",
    },
    actionButton: {
        height: 50,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        marginTop: 5,
      },
    actionText: {
        color: "white",
        fontSize: 17,
        fontWeight: "600",
    },
    divider: {
        height: 1,
        backgroundColor: "white",
        width: "100%",
        marginVertical: 10,
    },
})