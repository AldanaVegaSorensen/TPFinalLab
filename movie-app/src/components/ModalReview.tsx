import { Modal, View, Pressable , Text, TextInput,} from "react-native"
import { Ionicons } from "@expo/vector-icons"; 
import { StarRating } from "./StarRating";
import { Fecha } from "./Fecha";
import { useEffect, useState } from "react";
import { Review } from "../types/review";
import PrimaryButton from "./PrimaryButton";
import { commonStyles } from "../styles/general";
import { modalStyles } from "../styles/modalList.styles";


interface ModalReviewProps {
    visible: boolean;
    onClose: () => void;
    onSave: (
        fecha: Date,
        rating: number,
        comment: string
    ) => void;
    review?: Review | null;
    watchedAt?: string;
}

export default function ModalReview({
  visible,
  onClose,
  onSave,
  review,
  watchedAt
}: ModalReviewProps) {
    const [fecha, setFecha] = useState<Date>(new Date());
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState("");

    const handleSave = () => {
        onSave(fecha, rating, comment);
    };
    
    useEffect(() => {
        if (visible) {
            if (review) {
            setRating(review.rating);
            setComment(review.comment);

            if (watchedAt) {
                setFecha(new Date(watchedAt));
            }
            } else {
            setFecha(new Date());
            setRating(0);
            setComment("");
            }
        }
    }, [visible, review, watchedAt]);
    
    return(
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <View style={commonStyles.darkContainer}>
                <View style={commonStyles.header}>
                    <Text style={commonStyles.title}>Escribir review</Text>
                    <Pressable style={commonStyles.close} onPress={onClose}>
                        <Ionicons
                            name="close"
                            size={28}
                            color="white"
                        />
                    </Pressable>
                </View>
                
                <View style={modalStyles.content}>
                    <Text style={modalStyles.label}>Fecha</Text>
                    <Fecha
                        value={fecha}
                        onChange={setFecha}
                    />

                    <View style={commonStyles.divider}></View>

                    <Text style={modalStyles.label}>Puntuación</Text>
                    <StarRating rating={rating} onChange={setRating}/>

                    <View style={commonStyles.divider}></View>
                </View>

                
                <View style={modalStyles.content}>
                    <Text style={modalStyles.label}>Comentario</Text>
                    <TextInput style={modalStyles.textInput} placeholder="Haz un comentario..." multiline textAlignVertical="top" onChangeText={setComment} value={comment}></TextInput>
                </View>
                
                <View style={modalStyles.content}>
                    <PrimaryButton
                    title="Guardar"
                    onPress={handleSave}
                />
                </View>
                
                
            </View>
        </Modal>

    )
}