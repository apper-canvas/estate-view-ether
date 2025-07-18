import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import BrowseProperties from "@/components/pages/BrowseProperties";
import PropertyDetails from "@/components/pages/PropertyDetails";
import SavedProperties from "@/components/pages/SavedProperties";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BrowseProperties />} />
          <Route path="property/:id" element={<PropertyDetails />} />
          <Route path="saved" element={<SavedProperties />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }}
      />
    </>
  );
}

export default App;