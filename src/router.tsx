import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { WithNavbar } from "~/layouts/withNavbar.tsx";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route path="/" element={<WithNavbar />}>
                <Route path="/" lazy={() => import("./pages/root.tsx")} />
                <Route path="/admit_card" lazy={() => import("./pages/admitCard.tsx")} />
            </Route>
            <Route path="/examination" element={<WithNavbar />}>
            </Route>
        </Route>
    )
);

