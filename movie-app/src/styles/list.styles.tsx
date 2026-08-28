import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export const listStyles =StyleSheet.create({
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 18,
        marginBottom: 12,
        marginHorizontal:10,
        borderWidth: 1,
        borderColor: "white",
    },
    listInfo: {
        flex: 1,
        marginLeft: 15,
    },

    listName: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 5,
    },
    movieCount: {
        color: COLORS.textSecondary,
        fontSize: 14,
    },
    header: {
        minHeight: 65,
        backgroundColor: COLORS.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    title: {
        color: "white",
        fontSize: 22,
        fontWeight: "700",
        flexShrink: 1,
    },
    titleInput: {
        color: "white",
        fontSize: 22,
        fontWeight: "700",
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: "white",
        paddingVertical: 2,
        marginRight: 10,
    },
    headerActions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    iconButton: {
        padding: 4,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        color: "#999",
    },
    row: {
        justifyContent: "flex-start",
        gap: 8,
    },
    content: {
        padding: 12,
    },
    cardWrapper: {
        position: "relative",
    },
    removeBadge: {
        position: "absolute",
        top: -6,
        right: -6,
        backgroundColor: "white",
        borderRadius: 13,
        zIndex: 1,
    },

})