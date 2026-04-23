import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import OrderPage from "@/pages/OrderPage";
import SupportPage from "@/pages/SupportPage";
import RechargePage from "@/pages/RechargePage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/recharge" element={<RechargePage />} />
      </Routes>
    </Router>
  );
}
