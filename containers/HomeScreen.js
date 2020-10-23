import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { FlatList, ActivityIndicator } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

// import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import RoomCard from "../components/RoomCard";

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://airbnb-api.herokuapp.com/api/room?city=paris"
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator/>
  ) : (
    <>
        <FlatList
          
        data={data.rooms}
        keyExtractor={(item) => String(item._id)}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            style={{
              marginHorizontal: 20, marginVertical: 20}}
            onPress={() => navigation.navigate("Room", { id: item._id })}
          ><RoomCard border data={item} />
          </TouchableWithoutFeedback>
        )}
      />
    </>
  );
}
