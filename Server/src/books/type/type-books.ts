export type GoogleBook = {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail?: string;
    };
  };
};

export type GoogleBooksResponse = {
  items: GoogleBook[];
};
