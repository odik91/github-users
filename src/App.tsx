import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthWrapper, Dashboard, Error, Login, PrivateRoute } from "./pages";

const App = () => {
  return (
    <AuthWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="" element={<Dashboard />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </AuthWrapper>
  );
};
export default App;
