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
            <Route path="/" element={<WithNavbar />}>
                <Route path="/" lazy={() => import("./pages/root.tsx")} />
                <Route path="/admit_card" element={<WithAuthentication />}>
                    <Route path="/admit_card" lazy={() => import("./pages/admitCard.tsx")} />
                </Route>
            </Route>
            <Route path="/examination" element={<WithNavbar />} />
        </Route>
    )
);

