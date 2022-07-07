import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Calendar } from "../pages";

function routes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default routes;
