import React from "react";
import {AppBar, Avatar, Box, Toolbar, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import MobileLogoutButton from "./MobileLogoutButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UploadIcon from '@mui/icons-material/Upload';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const Links = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: 25,
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  }
}));

const MobileLinks = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 15,
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const Navigation = (props) => {
  return (
    <AppBar sx={{ boxShadow: "0 3px 10px 2px black" }} position="sticky">
      <StyledToolbar>
        <Typography variant="h6" style={{ flexGrow: "1" }}>
          <Link className="linkHover" to="/limbo">Beat Limbo</Link>
        </Typography>
        <Links>
          <div>
            <Link className="textIcon linkHover" to="/limbo">
              <GraphicEqIcon sx={{ fontSize: 22 }} />
              Limbo
            </Link>
          </div>
          <div>
            <Link className="textIcon linkHover" to="/upload">
              <UploadIcon sx={{ fontSize: 22 }} />
              Upload
            </Link>
          </div>
          {props.user && (
            <div>
              <LogoutButton />
            </div>
          )}
          <div>
            <Link to="/profile">
              {props.user && props.user.profile_picture ? (
                <Avatar sx={{ width: 30, height: 30 }} src={props.user.profile_picture} />
              ) : (
                <AccountCircleIcon
                sx={{
                  fontSize: 30,
                  marginTop: "3px",
                  transition: "color 0.6s",
                  "&:hover": {
                    color: "#d91226",
                  }
                }} />
              )}
            </Link>
          </div>
        </Links>
        <MobileLinks>
          <Link to="/limbo">
            <GraphicEqIcon className="linkHover" sx={{ fontSize: 30, marginTop: "3px" }} />
          </Link>
          <Link to="/upload">
            <UploadIcon className="linkHover" sx={{ fontSize: 30, marginTop: "3px" }} />
          </Link>
          {props.user && (
            <div>
              <MobileLogoutButton />
            </div>
          )}
          <Link to="/profile">
            {props.user && props.user.profile_picture ? (
              <Avatar sx={{ width: 30, height: 30 }} src={props.user.profile_picture} />
            ) : (
              <AccountCircleIcon
              sx={{
                fontSize: 30,
                marginTop: "3px",
                transition: "color 0.6s",
                "&:hover": {
                  color: "#d91226",
                }
              }} />
            )}
          </Link>
        </MobileLinks>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navigation;