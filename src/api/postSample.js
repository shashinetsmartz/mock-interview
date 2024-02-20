import api from ".";


const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    postData: build.mutation({
      query: (body) => ({
        url: "/auth/token",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { usePostDataMutation } = extendedApi;

