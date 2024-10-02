import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes/routes";
import { Provider as StoreProvider } from "react-redux";
import store from "./store";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        <Routes>
          {routes.map((prop, i) => (
            <Route path={prop.path} element={prop.component} key={i} />
          ))}
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </StoreProvider>
  );
}
export default App;
