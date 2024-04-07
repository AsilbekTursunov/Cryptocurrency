import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const apikey = "pub_41555da7d1fc0b27580ff4737791628569728";
const cryptoNewsHeaders = {
  "x-api-key": apikey,
};

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://newsdata.io",
  }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: (value) =>
        createRequest(
          `/api/1/news?apikey=${apikey}&q=${value ? value : "cryptocurrency"}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
