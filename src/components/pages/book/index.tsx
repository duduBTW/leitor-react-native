import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../../App";
import api from "../../../utils/api";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

// components
import { ScrollView, View } from "react-native";
import Typography from "../../typography";
import styled from "styled-components/native";
import Button from "../../button";

const bookSchema = z.object({
  id: z.string(),
  title: z.string(),
  cover: z.string().nullable().optional(),
  publishing_company: z.string().nullable().optional(),
  author_picture_url: z.string().nullable().optional(),
  author_author_name: z.string().nullable().optional(),
});

type BookSchema = z.infer<typeof bookSchema>;
type BookRoute = RouteProp<RootStackParamList, "Book">;

const useBook = () => {
  const { params } = useRoute<BookRoute>();
  const { id } = params;

  return useQuery<BookSchema>(
    ["book-item", id],
    async () => {
      const { data: book } = await api.get(`/api/book/${id}`);

      return bookSchema.parse(book);
    },
    {
      placeholderData: params,
    }
  );
};

const BookPage = () => {
  const { data: book, isLoading, isError } = useBook();

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError)
    return <Typography>Something went wrong (っ °Д °;)っ</Typography>;
  if (!book) return <Typography>Book not found (⊙_⊙)？</Typography>;

  return (
    <ScrollView>
      <s.root>
        <s.header>
          <s.cover
            source={{
              uri:
                book.cover ?? "https://leitor.vercel.app/images/book_cover.svg",
            }}
          />
          <s.header_conmtent>
            <s.title variant="xl" fontWeigth={700}>
              {book.title}
            </s.title>
            {book?.author_author_name && (
              <s.author variant="sm" color="gray.500">
                by {book.author_author_name}
              </s.author>
            )}
          </s.header_conmtent>
        </s.header>
        <Button>Start reading</Button>
        <ChapterList />
      </s.root>
    </ScrollView>
  );
};

const ChapterList = () => {
  return (
    <>
      <s.chapters_title color="gray.600" fontWeigth={500}>
        Chapters
      </s.chapters_title>
      <s.chapter>
        <Typography>Starting from Scratch</Typography>
      </s.chapter>
      <s.chapter>
        <Typography>Hierarchy is Everything</Typography>
      </s.chapter>
      <s.chapter>
        <Typography>Designing Text</Typography>
      </s.chapter>
      <s.chapter>
        <Typography>Working with Color</Typography>
      </s.chapter>
      <s.chapter>
        <Typography>Working with Color</Typography>
      </s.chapter>
      <s.chapter>
        <Typography>Working with Color</Typography>
      </s.chapter>
      <s.chapter>
        <Typography>Working with Color</Typography>
      </s.chapter>
      <s.chapter>
        <Typography>Working with Color</Typography>
      </s.chapter>
      <s.chapter>
        <Typography>Working with Color</Typography>
      </s.chapter>
    </>
  );
};

const s = {
  root: styled.View`
    flex: 1;
    margin: 8px 16px 16px;
  `,
  header: styled.View`
    flex-direction: row;
    margin-bottom: 24px;
  `,
  header_conmtent: styled.View`
    flex: 1;
  `,
  cover: styled.Image`
    width: 140px;
    height: 220px;
    border-radius: 12px;
    margin-right: 16px;
  `,
  title: styled(Typography)`
    margin-top: 16px;
    max-width: 80%;
  `,
  author: styled(Typography)`
    margin-top: auto;
  `,
  chapters_title: styled(Typography)`
    margin-top: 32px;
    margin-bottom: 4px;
  `,
  chapter: styled.View`
    margin-top: 12px;
    padding: 12px 16px;
    background-color: ${({ theme }) => theme.color.white};
    border-radius: 12px;
  `,
};

export default BookPage;
