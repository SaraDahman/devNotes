import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import NotesPage from "./pages/NotesPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="notes" element={<NotesPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
