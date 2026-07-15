import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoutes";
import AdminRoute from "./routes/AdminRoutes";

import DashboardLayout from "./layout/DashboardLayout";

import ProductsPage from "./products/pages/ProductsPage";
import ProductDetails from "./products/pages/ProductDetails";
import LoginPage from "./auth/LoginPage";

import Dashboard from "./analytics/Dashboard";
import AnalyticsChart from "./analytics/AnalyticsChart";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>

          {/* USER + ADMIN */}
          <Route path="/products" element={<ProductsPage />} />

          <Route
            path="/products/:id"
            element={<ProductDetails />}
          />

          {/* ADMIN ONLY */}
          <Route element={<AdminRoute />}>
           <Route
            path="/admin/products/:id"
            element={<ProductDetails />}
          />
            <Route
              path="/admin/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/admin/analytics"
              element={<AnalyticsChart />}
            />

            <Route
              path="/admin/products"
              element={<ProductsPage />}
            />
          </Route>

        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;