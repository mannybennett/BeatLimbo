import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutIcon from '@mui/icons-material/Logout';

const MobileLogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <LogoutIcon sx={{ fontSize: 30, marginTop: "3px" }} onClick={() => logout({ returnTo: "http://localhost:3000" })} />
  );
};

export default MobileLogoutButton;