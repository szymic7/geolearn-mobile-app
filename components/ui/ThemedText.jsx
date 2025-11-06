import React from "react";
import { Text } from "react-native";
import Colors from "../../utils/colors";

function ThemedText({
  style,
  size = 16,
  children,
  variant = "Regular",
  color = Colors.textPrimary,
  ...props
}) {
  return (
    <Text
      style={[
        { fontFamily: `Montserrat-${variant}`, fontSize: size, color: color },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

ThemedText.Regular = (props) => <ThemedText {...props} variant="Regular" />;
ThemedText.Regular.displayName = "ThemedText.Regular";

ThemedText.Medium = (props) => <ThemedText {...props} variant="Medium" />;
ThemedText.Medium.displayName = "ThemedText.Medium";

ThemedText.SemiBold = (props) => <ThemedText {...props} variant="SemiBold" />;
ThemedText.SemiBold.displayName = "ThemedText.SemiBold";

ThemedText.Bold = (props) => <ThemedText {...props} variant="Bold" />;
ThemedText.Bold.displayName = "ThemedText.Bold";

export default ThemedText;
