import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import Star from "../components/Star";
import Carousel from "react-native-snap-carousel";

const RoomCard = ({ data, border, margin }) => {
   const _renderItem = ({ item, index }) => {
     return <Image style={styles.card} source={{ uri: item }}/>;
  }; 
  return (
    <View style={[styles.container, { borderBottomWidth: border ? 1 : 0}]}>
      {/* <Image style={styles.card} source={{ uri: data.photos[0] }} /> */}
      <Carousel
        ref={c => {
          let _carousel = c;
        }}
        // layout={'default'}
        // layout={'tinder'} layoutCardOffset={`9`}
        data={data.photos}
        renderItem={_renderItem}
        sliderWidth={375}
        itemWidth={375}
        loop={true}
      />
      <View style={styles.priceBox}>
        <Text style={styles.price}>{data.price} €</Text>
      </View>
      <View style={[styles.infosBox, { marginHorizontal: margin ? 20 : 0}]}>
        <View style={styles.infos}>
          <Text style={styles.title}>{data.title}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Star data={data.ratingValue} />
            <Text style={styles.reviews}>{data.reviews} avis</Text>
          </View>
        </View>

        <Image
          style={styles.profileImg}
          source={data.user.account.photos.length === 2
                   ? { uri: data.user.account.photos[1] }
                   : { uri: data.user.account.photos[0] }}   
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "#BBBBBB",
  },
  card: {
    height: 215,
    marginBottom: 10,

  },
  title: {
    fontSize: 16,
    marginBottom: 10,
  },
  profileImg: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  priceBox: {
    width: 70,
    height: 45,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 165,
  },
  price: {
    fontSize: 18,
    color: "white",
  },
  infosBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
    borderBottomColor: "grey",
  },
  reviews: {
    fontSize: 18,
    color: "#BBBBBB",
  },
});

export default RoomCard;
