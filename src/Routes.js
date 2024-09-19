import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Login/Login";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import DashboardLayout from "./Layouts/DashboardLayouts/DashboardLayout";
import { Route, Routes } from "react-router-dom";
import Speakers from "./Pages/Speakers/Speakers";
import Events from "./Pages/Events/Events";
import Exhibitors from "./Pages/Exhibitors/Exhibitors";
import AddAndUpdateForm from "./Components/Speakers/AddAndUpdateForm";

const routes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/speakers" element={<Speakers />} />
        <Route path="/events" element={<Events />} />
        <Route path="/exhibitors" element={<Exhibitors />} />
      </Route>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/add-update-speaker" element={<AddAndUpdateForm />} />
    </Routes>
  );
};

export default routes;
