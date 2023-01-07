import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import api from "../../../utils/api";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../App";

// components
import Typography from "../../typography";
import { FlatGrid } from "react-native-super-grid";
import {
  RefreshControl,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const HomePage = () => {
  const { refetch: refetchBooks, isRefetching } = useBooks();

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetchBooks} />
        }
      >
        <s.profile_picture
          source={{
            uri: "https://pbs.twimg.com/profile_images/1586400138297102336/djPMq8QY_400x400.jpg",
          }}
        />
        <s.title color="gray.500" fontWeigth={700}>
          Books
        </s.title>
        <BookGrid />
      </ScrollView>
    </SafeAreaView>
  );
};

const BookGrid = () => {
  const { data: books, isLoading, isError } = useBooks();

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Something went bad :(</Typography>;
  if (!books || books.length <= 0)
    return <Typography>No books found.</Typography>;

  return (
    <FlatGrid
      scrollEnabled={false}
      spacing={16}
      itemDimension={160}
      data={books}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <BookCard {...item} />}
    />
  );
};

const BookCard = ({
  id,
  title,
  cover,
}: {
  id: string;
  title: string;
  cover?: string | null;
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate("Book", {
          id,
          cover,
          title,
        });
      }}
    >
      <s.book_container>
        <s.book_cover
          source={{
            uri: cover ?? "https://leitor.vercel.app/images/book_cover.svg",
          }}
        />
        {Boolean(title) && (
          <s.book_title fontWeigth={500}>{title}</s.book_title>
        )}
      </s.book_container>
    </TouchableWithoutFeedback>
  );
};

// -- Services
export const booksSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    cover: z.string().nullable(),
    publishing_company: z.string().nullable(),
    author_picture_url: z.string().nullable(),
    author_author_name: z.string().nullable(),
  })
);
const useBooks = () =>
  useQuery(["book-list"], async () => {
    const { data } = await api.get("/api/book");

    return booksSchema.parse(data);
  });

// -- Styles
const s = {
  profile_picture: styled.Image`
    width: 48px;
    height: 48px;
    margin: 24px 16px;
    border-radius: 2222px;
  `,
  title: styled(Typography)`
    padding: 0 16px;
  `,
  book_cover: styled.Image`
    border-radius: 12px;
    height: 260px;
  `,
  book_container: styled.View`
    margin-bottom: auto;
  `,
  book_title: styled(Typography)`
    margin-top: 8px;
    max-width: 80%;
  `,
};

export default HomePage;
