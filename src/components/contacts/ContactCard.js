import React, { PureComponent } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Link } from "react-router-native";

const Avatar = ({ img }) =>
  <View style={styles.photoColumn}>
    <Image
      source={{
        uri: img
      }}
      style={{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "white"
      }}
    />
  </View>;

const ContactInfo = ({ key, username, userStatus }) =>
  <View style={styles.labelColumn}>
    <View style={styles.labelTitle}>
      <Text style={{ fontSize: 14 }}>
        {username}
      </Text>
    </View>
    <View style={{}}>
      <Text style={styles.labelStatus}>
        {userStatus}
      </Text>
    </View>
  </View>;

const ContactBadge = () =>
  <View
    style={{
      width: 60,
      alignItems: "flex-start",
      justifyContent: "center",
      paddingLeft: 8
    }}
  >
    <View
      style={{
        width: 20,
        height: 16,
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 10,
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "600"
        }}
      >
        0
      </Text>
    </View>
  </View>;

const ContactCard = props =>
  <Link
    to={{
      pathname: "/chat",
      state: { user: props }
    }}
    style={styles.row}
    component={TouchableOpacity}
    {...props}
  >
    <Avatar img={props.avatar} />
    <ContactInfo {...props} />
    <ContactBadge />
  </Link>;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    height: 70,
    paddingLeft: 16,
    flexDirection: "row",
    borderTopWidth: 0.5,
    borderColor: "#c3c3c3"
  },
  photoColumn: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center"
  },
  labelColumn: {
    flex: 0.8,
    padding: 16
  },
  labelStatus: {
    borderColor: "#c3c3c3",
    fontSize: 10
  }
});

export default ContactCard;
