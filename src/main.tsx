import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import Profile from "./pages/Profile.tsx";
import SignUp from "./pages/SignUp.tsx";
import ExercisePlanForm from "./pages/ExercisePlanForm.tsx";
import AllUsers from "./pages/AllUsers.tsx";
import ExercisePlans from "./pages/ExercisePlans.tsx";
import RequestedPlansTable from "./pages/RequestedPlansTable.tsx";
import ExercisePlanDiagram from "./pages/ExercisePlanDiagram.tsx";
import AllExercisePlans from "./pages/AllExercisePlans.tsx";
import { Provider as ReduxProvider } from "react-redux";
import store from "./state/store.ts";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/exercise-plan-form",
        element: <ExercisePlanForm />,
      },
      {
        path: "/all-users",
        element: <AllUsers />,
      },
      {
        path: "/exercise-plans",
        children: [
          {
            path: "",
            index: true,
            element: <ExercisePlans />,
          },
          {
            path: "/exercise-plans/all",
            element: <AllExercisePlans />,
          },
        ],
      },
      {
        path: "/requested-plans",
        children: [
          {
            path: "",
            index: true,
            element: <RequestedPlansTable />,
          },
          {
            path: ":planId",
            element: <ExercisePlanDiagram />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} signUpFallbackRedirectUrl={"/login"}>
      <ReduxProvider store={store}>
        <RouterProvider router={router} />
      </ReduxProvider>
    </ClerkProvider>
  </React.StrictMode>
);
