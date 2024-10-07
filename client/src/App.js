import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/layout/Routes/Private";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import AdminRoute from "./components/layout/Routes/AdminRoute";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "../src/pages/Wishlist"; // Import the Wishlist page

// New category pages
import GraphicCardsPage from "./pages/GraphicCardsPage";
import GamingProcessorsPage from "./pages/GamingProcessorsPage";
import GamingMotherboardsPage from "./pages/GamingMotherboardsPage";

// Import ChatBot component
import ChatBot from "./components/chatBot"; // Adjust the import path as necessary
import { useAuth } from "./context/auth"; // Import auth context

function App() {
  const [auth] = useAuth(); // Get the authentication context

  return (
    <>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="/wishlist" element={<Wishlist />} />{" "}
          {/* Wishlist route */}
          {/* New category routes */}
          <Route
            path="/category/graphic-cards"
            element={<GraphicCardsPage />}
          />
          <Route
            path="/category/gaming-processors"
            element={<GamingProcessorsPage />}
          />
          <Route
            path="/category/gaming-motherboards"
            element={<GamingMotherboardsPage />}
          />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/orders" element={<Orders />} />
            <Route path="user/profile" element={<Profile />} />
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/create-category" element={<CreateCategory />} />
            <Route path="admin/create-product" element={<CreateProduct />} />
            <Route path="admin/product/:slug" element={<UpdateProduct />} />
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/users" element={<Users />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="*" element={<Pagenotfound />} />
        </Routes>
      </div>
      <Footer />
      {auth?.user && <ChatBot userName={auth.user.name} />}{" "}
      {/* Render ChatBot if user is authenticated */}
    </>
  );
}

export default App;
