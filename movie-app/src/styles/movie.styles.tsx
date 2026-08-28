import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export const movieStyles = StyleSheet.create({
    contentContainer:{
        paddingBottom:20, 
        backgroundColor: COLORS.background,
    },
    container: {
        position: "absolute", 
        zIndex: 20, 
        width: "100%", 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    title:{
        color:COLORS.text,
        textAlign:"center",
        fontSize: 24
    },
    info:{
        color: COLORS.textSecondary,
        fontWeight: "600",
        fontSize: 16,
        textAlign: "center"
    },
    sinopsis:{
        color: COLORS.textSecondary,
        fontSize: 15,
        lineHeight: 22,
        marginTop: 4,
        marginHorizontal:15,
    },
    actions: {
        flexDirection: "row",
        gap: 12,
        marginTop: 20,
        paddingHorizontal: 15,
    },

    actionButton: {
        flex: 1,
        height: 48,
        borderRadius: 10,
        backgroundColor: COLORS.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },

    actionText: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: "600",
    },
    rating: {
        marginLeft:15,
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },

    ratingText: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: "600",
    },
})