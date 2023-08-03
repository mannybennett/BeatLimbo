import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutIcon from '@mui/icons-material/Logout';

const MobileLogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <LogoutIcon
      onClick={() => logout({ returnTo: "http://localhost:3000" })}
      sx={{
        cursor: 'pointer',
        fontSize: 25,
        marginTop: "8px",
        transition: "color 0.6s",
        "&:hover": {
          color: "#d91226",
        }
      }}
    />
  );
};

export default MobileLogoutButton;