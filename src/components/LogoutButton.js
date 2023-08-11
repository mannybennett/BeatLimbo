import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <div className="textIcon linkHover" style={{ cursor: "pointer" }} onClick={() => logout({ returnTo: "https://beatlimbo.onrender.com/" })}>
      <LogoutIcon sx={{ fontSize: 22 }} />
      Sign Out
    </div>
  );
};

export default LogoutButton;