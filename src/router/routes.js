export const APP_PREFIX = "/mock-interview";

const routes = {
  app: {
    home: `${APP_PREFIX}/home`,
    interviewQues: `${APP_PREFIX}/interviewQuiz`,
    interviewRes: `${APP_PREFIX}/interviewResponse`,
    noAuth: `${APP_PREFIX}/noAuth`,
    notFound: `${APP_PREFIX}/404`,
  },
};

export default routes;
