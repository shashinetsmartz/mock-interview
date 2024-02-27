import api from ".";

const extendedApi = api.injectEndpoints({
  endpoints: (build) => ({
    submitAudio: build.mutation({
        query: (body) => ({
          url: "/audios",
          method: "POST",
          body,
          prepareHeaders: (headers) => {
            headers.set("Content-Type", "multipart/form-data")
              return headers
          },
        }),
      })
  }),
});

export const { useSubmitAudioMutation } = extendedApi;