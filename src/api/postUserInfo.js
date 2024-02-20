import api from ".";


const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    postUserInfo: build.mutation({
      query: (body) => ({
        url: "/userinfo",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { usePostUserInfoMutation } = extendedApi;

