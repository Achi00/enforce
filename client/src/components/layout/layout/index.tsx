import React from "react";
import { LayoutProps } from "@pankod/refine-core";
import { Box } from "@pankod/refine-mui";
import MessageIcon from "@mui/icons-material/Message";
import { Sider as DefaultSider } from "../sider";
import { Header as DefaultHeader } from "../header";

export const Layout: React.FC<LayoutProps> = ({
  Sider,
  Header,
  Footer,
  OffLayoutArea,
  children,
}) => {
  const SiderToRender = Sider ?? DefaultSider;
  const HeaderToRender = Header ?? DefaultHeader;

  return (
    <Box component="div" display="flex" flexDirection="row">
      <SiderToRender />
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: "100vh",
        }}
      >
        <HeaderToRender />
        <Box
          component="main"
          sx={{
            p: { xs: 1, md: 2, lg: 3 },
            flexGrow: 1,
            bgcolor: (theme) => theme.palette.background.default,
          }}
        >
          {children}
        </Box>
        <Box
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 1000,
          }}
        >
          <a
            className="media"
            href="https://www.facebook.com/myhealthge"
            target="_blank"
          >
            <MessageIcon fontSize="large" sx={{ color: "blue" }} />
          </a>
        </Box>
        {Footer && <Footer />}
      </Box>
      {OffLayoutArea && <OffLayoutArea />}
    </Box>
  );
};
