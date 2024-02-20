import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import routes from "./routes";
// import { WithoutAuth } from "./WithoutAuth";
import NoAuth from "pages/NoAuth";
import NotFound from "pages/NotFound";
import InterviewQuestionsPage from "pages/InterviewQuestionsPage";
import InterviewResponsesPage from "pages/InterviewResponsesPage";

const MainRoute = () => {
  const defaultPath = routes.app.home;
  const redirectPath = defaultPath;
  //   const hasAuth = document.referrer.includes("https://netsmartz.darwinbox.in/");
  const hasAuth = true;
  // const navigatedFromDarwin = document.referrer.includes("https://netsmartz.darwinbox.in/");
  // const hasAuth = sessionToken && navigatedFromDarwin;
  return (
    <Routes>
      <Route index element={hasAuth ? <Navigate to={redirectPath} /> : <Navigate to={routes.app.noAuth} />} />
      {hasAuth && <Route path={routes.app.home} element={<HomePage />} />}
      {hasAuth && <Route path={routes.app.interviewQues} element={<InterviewQuestionsPage />} />}
      {hasAuth && <Route path={routes.app.interviewRes} element={<InterviewResponsesPage />} />}
      <Route path={routes.app.noAuth} element={<NoAuth />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
  //   return (
  //     <Routes>
  //       <Route
  //         path={routes.app.home}
  //         element={
  //           <WithoutAuth path={routes.app.home}>
  //             <HomePage />
  //           </WithoutAuth>
  //         }
  //       />
  //       <Route path="/" element={<Navigate to={redirectPath} />} />
  //     </Routes>
  //   );
};

export default MainRoute;
