import { useState, useEffect } from "react";
import { useAuth } from "../../../context/auth";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../../Spinner";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate(); // for navigation

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("/api/v1/auth/admin-auth");
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
          navigate("/login"); // redirect to login if not admin
        }
      } catch (error) {
        setOk(false);
        navigate("/login"); // redirect to login on 401 error
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token, navigate]);

  return ok ? <Outlet /> : <Spinner path="/" />;
}
