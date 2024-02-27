import api from ".";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    submitAudio: build.mutation({
        query: (body) => ({
          url: "/audio",
          method: "POST",
          body,
        }),
      })
  }),
});

export const { useSubmitAudioMutation } = extendedApi;