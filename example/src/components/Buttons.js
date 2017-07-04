export const Buttons = () =>
  <NativeRouter>
    <View style={{ flex: 1, width: "100%", height: "100%" }}>
      <Route exact path="/" component={ContactListScreen} />
      <Route path="/chat" component={ChatScreen} />
    </View>
  </NativeRouter>;
