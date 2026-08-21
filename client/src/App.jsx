import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import NotesPage from "./pages/NotesPage";
import FavoriteNotesPage from "./pages/FavoriteNotesPage";
import AllNotesPage from "./pages/AllNotesPage";
import OtherNotesPage from "./pages/OtherNotesPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="notes" element={<NotesPage />} />
        <Route path="notes/favorite" element={<FavoriteNotesPage />} />
        <Route path="notes/all" element={<AllNotesPage />} />
        <Route path="notes/other" element={<OtherNotesPage />} />
      </Route>
      <Route path="/" element={<Navigate to="/notes/all" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
