import api from ".";


const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getData: builder.query({
      query: (email) => ({
        url: `/auth/forgot/password?email=${email}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetDataQuery } = extendedApi;
