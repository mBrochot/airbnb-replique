import React, { useState, useEffect } from "react";
import { Text, ActivityIndicator, StyleSheet } from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback
} from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import { useRoute } from "@react-navigation/core";
import axios from "axios";

import RoomCard from "../components/RoomCard";

const Room = () => {
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [viewMore, setViewMore] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://airbnb-api.herokuapp.com/api/room/${route.params.id}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
 
  return (
    <>
      {isLoading ? (
        <ActivityIndicator/>
      ) : (
          <>
            <ScrollView >
              <TouchableWithoutFeedback
                     onPress={() => setViewMore(!viewMore)}
                      style={styles.container}>
                <RoomCard data={data} margin />
                <Text numberOfLines={viewMore ? null : 4} style={styles.description}>
                  {data.description}
                </Text>
              </TouchableWithoutFeedback>
              <MapView
                scrollEnabled={false}
                style={{
                flex: 1,
                  height: 200,
                  marginHorizontal: 20
                 
                }}
                initialRegion={{
                latitude: data.loc[1],
                longitude: data.loc[0],
                latitudeDelta: 0.02,
                longitudeDelta: 0.02
                }}>
              <Marker
                coordinate={{ latitude: data.loc[1], longitude: data.loc[0] }}
                title={data.tilte}
                description={data.description}
              />
              </MapView>
            </ScrollView>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20
  },
  description: {
    fontSize: 16,
  },
});

export default Room;
