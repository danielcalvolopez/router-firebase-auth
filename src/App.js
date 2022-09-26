import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import { allRoutes } from "./utils/routes";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {Object.values(allRoutes).map(({ path, Element }) => (
            <Route key={path} path={path} element={<Element />} />
          ))}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
