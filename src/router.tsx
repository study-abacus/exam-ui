import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { WithNavbar } from "~/layouts/withNavbar.tsx";
import { WithAuthentication } from "~/layouts/withAuthentication.tsx";
import { AuthProvider } from "~/hooks/useAuth.tsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AuthProvider />}>
      <Route element={<WithNavbar />}>
        <Route path="/" lazy={() => import("./pages/root.tsx")} />
      </Route>
      <Route element={<WithAuthentication />}>
        <Route element={<WithNavbar />}>
          <Route path="/admit_card">
            <Route
              path="/admit_card"
              lazy={() => import("./pages/admitCard.tsx")}
            />
          </Route>
          <Route
            path="/examination/:examination_id"
            lazy={() => import("./pages/examination.tsx")}
          />
        </Route>
        <Route
          path="/examination/:examination_id/attempt"
          lazy={() => import("./pages/attempt.tsx")}
        />
      </Route>
    </Route>
  )
);
