import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

function RedirectPage() {
  const { code } = useParams();
  const urls = useSelector((state) => state.urls);
  const navigate = useNavigate();

  const match = urls.find((u) => u.short === code);
  const now = new Date();

  useEffect(() => {
    if (match) {
      if (new Date(match.expiry) > now) {
        window.location.href = match.original;
      } else {
        alert("This link has expired!");
        navigate("/");
      }
    } else {
      alert("Invalid link!");
      navigate("/");
    }
  }, [match, now, navigate]);

  return <p className="text-center mt-20">Redirecting...</p>;
}

export default RedirectPage;
