import {
    unstable_HistoryRouter as HistoryRouter,
    Route,
    Routes,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { Suspense } from "react";
import ProgressLoading from "../components/Loading/ProgressLoading";
import Login from "../pages/Login/Login";
import { store } from "../redux/configStore";

const history = createBrowserHistory();
export default function Router() {
    return (
        <Provider store={store}>
            <HistoryRouter history={history}>
                <Suspense fallback={<ProgressLoading />}>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        {/* <Route path="*" element={<NotFound />} /> */}
                    </Routes>
                </Suspense>
            </HistoryRouter>
        </Provider>
    )
}