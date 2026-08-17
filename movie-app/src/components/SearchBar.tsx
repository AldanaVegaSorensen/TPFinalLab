import { View, StyleSheet, TextInput } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface Props {
    placeholder: string,
    onPress?: ()=> void;
}

const SearchBar = ({placeholder, onPress}:Props) =>{
    return (
        <View style={styles.container}>
            <Ionicons name="search" size={15} color={"white"} />
            <TextInput
                onPress={onPress}
                placeholder={placeholder}
                value=""
                onChange={()=>{}}
                placeholderTextColor={"gray"}
                style={styles.textInput}
            />
        
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#243458", 
    borderRadius: 9999,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  textInput:{
    flex: 1, 
    marginLeft: 5, 
    color: "white",
    paddingVertical: 0
  }
});