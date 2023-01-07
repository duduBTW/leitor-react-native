import { ThemeProvider } from "styled-components";
import theme from "./src/styles/theme";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import {
  Nunito_400Regular,
  Nunito_700Bold,
  Nunito_500Medium,
} from "@expo-google-fonts/nunito";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// pages
import HomePage from "./src/components/pages/home";
import BookPage from "./src/components/pages/book";

export type RootStackParamList = {
  Home: undefined;
  Book: {
    id: string;
    title: string;
    cover: string | null | undefined;
  };
};

export type Props = NativeStackScreenProps<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

export default function App() {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <NavigationContainer
          theme={{
            dark: false,
            colors: {
              background: theme.color.purple["50"],
              border: "#E9D5FF",
              card: "",
              notification: "",
              primary: theme.color.purple["500"],
              text: "#52525B",
            },
          }}
        >
          <Stack.Navigator
            screenOptions={{
              headerBackTitle: "",
              title: "",
              animation: "flip",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: theme.color.purple["50"],
              },
            }}
          >
            <Stack.Screen
              name="Home"
              component={HomePage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="Book" component={BookPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
