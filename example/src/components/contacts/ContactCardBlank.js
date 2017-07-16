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


const ContactCardBlank = ({ children, user, contact, apikey }) => {
  const statusColor = contact.status === "ONLINE" ? "#4bec13" : "red";
  return (
    <Link
      to={{
        pathname: "/chat",
        state: { user, contact, apikey }
      }}
      style={styles.row}
      component={TouchableOpacity}
    >
      {children}
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default ContactCardBlank;
