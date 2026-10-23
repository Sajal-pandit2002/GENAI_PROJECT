import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import Home from "./features/interview/pages/Home";
import InterviewReport from "./features/interview/pages/InterviewReport";
import Landing from "./features/interview/pages/Landing";
import InterviewReports from "./features/interview/pages/InterviewReports";
import AppLayout from "./components/AppLayout.jsx";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/create",
        element: (
          <Protected>
            <Home />
          </Protected>
        ),
      },
      {
        path: "/reports",
        element: (
          <Protected>
            <InterviewReports />
          </Protected>
        ),
      },
      {
        path: "/interview/:interviewId",
        element: (
          <Protected>
            <InterviewReport />
          </Protected>
        ),
      },
    ],
  },
]);
