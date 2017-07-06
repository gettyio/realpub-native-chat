import React from "react";
import { View } from "react-native";
import { Text } from "native-base";
import PropTypes from "prop-types";

const Thumbnail = ({ initials, from }) => {
  if (from === "user") {
    return null;
  } else {
    return (
      <View style={[styles.thumbnail, styles[`${from}Thumbnail`]]}>
        <Text style={styles.initials}>
          {initials}
        </Text>
      </View>
    );
  }
};

Thumbnail.propTypes = {
  initials: PropTypes.string.isRequired,
  from: PropTypes.oneOf(["user", "contact"]).isRequired
};

const styles = {
  thumbnail: {
    borderRadius: 50,
    backgroundColor: "#0fb141",
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 2
  },
  contactThumbnail: {
    left: 0
  },
  userThumbnail: {
    right: 0
  },
  initials: {
    color: "#fff",
    fontSize: 12
  }
};

export default Thumbnail;
