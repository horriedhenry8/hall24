import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GlobalShortcutListener() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'p') {
        event.preventDefault();
        navigate('/profile');
      }
      if (event.ctrlKey  && event.key.toLowerCase() === 's') {
        event.preventDefault();
        navigate('/settings');
      }
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'q') {
        event.preventDefault();
        navigate('/');
        localStorage.removeItem("token");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  return null;
}

export default GlobalShortcutListener;
