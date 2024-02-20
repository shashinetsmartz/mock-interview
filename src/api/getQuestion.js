import api from ".";
const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getQuestion: builder.query({
      query: (qIndex) => ({
        url: `/question?index=${qIndex}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetQuestionQuery } = extendedApi;
