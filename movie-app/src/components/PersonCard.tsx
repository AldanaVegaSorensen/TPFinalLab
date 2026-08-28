import { View, Text, Image, StyleSheet, TouchableOpacity, } from "react-native";

type PersonCardProps = {
  name: string;
  role: string;
  image: string | null;
  onPress?: () => void;
};

export default function PersonCard({
  name,
  role,
  image,
  onPress,
}: PersonCardProps) {
  const content = (
    <>
      <Image
        style={styles.image}
        source={
          image
            ? {
                uri: `https://image.tmdb.org/t/p/w185${image}`,
              }
            : require("@/src/assets/images/Person_Placeholder.png")
        }
      />

      <Text style={styles.role} numberOfLines={1}>
        {role}
      </Text>

      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    marginRight: 20,
    alignItems: "center",
  },

  image: {
    width: 80,
    height: 100,
    borderRadius: 16,
  },

  role: {
    color: "white",
    marginTop: 5,
    fontSize: 12,
    textAlign: "center",
  },

  name: {
    color: "#a3a3a3",
    marginTop: 2,
    fontSize: 12,
    textAlign: "center",
  },
});