import api from ".";


const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    postAudio: build.mutation({
      query: (body) => ({
        url: "/audio",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { usePostAudioMutation } = extendedApi;

