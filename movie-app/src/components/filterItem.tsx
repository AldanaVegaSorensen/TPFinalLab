import { TouchableOpacity,Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons";


export const FilterItem = ({title}:{title:string}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.categoryWrapper}>
      <Text style={{color: "white", marginRight:6, fontSize: 12}}>{title}</Text>
      <Ionicons
        name="chevron-down"
        size={24}
        color="white"
      />
    </TouchableOpacity>
  )
}

const styles =StyleSheet.create({
  categoryWrapper:{
    borderWidth: 1,
    borderColor: "gray",
    padding: 8,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 14,
    backgroundColor: "#1B1919"
  },
})