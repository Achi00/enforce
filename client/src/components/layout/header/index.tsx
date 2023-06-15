import React, { useContext } from "react";
import { useGetIdentity } from "@pankod/refine-core";
import {
  AppBar,
  Stack,
  Toolbar,
  Typography,
  Avatar,
  Button,
  Box,
} from "@pankod/refine-mui";
import { ColorModeContext } from "contexts";
import { useNavigate } from "react-router-dom";
import Loading from "components/Loading";
import { Login } from "pages";
import Cart from "components/common/Cart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useStateContext } from "../../../context/StateContext";

export const Header = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  if (user === undefined) {
    return <Loading />;
  } else if (!user) {
    // user doesn't exist, so redirect to the home page
    navigate("/");
  }

  const shouldRenderHeader = true;

  return shouldRenderHeader ? (
    <AppBar
      color="default"
      position="sticky"
      elevation={0}
      sx={{
        background: "linear-gradient(to right, #F6F7FF 0%, #ced4da 100%)",
      }}
    >
      <Toolbar>
        <Stack
          direction="row"
          width="100%"
          marginLeft="4vmin"
          justifyContent="flex-end"
          alignItems="center"
          gap="4vmin"
        >
          <Stack
            direction="row"
            gap="16px"
            alignItems="center"
            justifyContent="center"
          >
            {user?.name ? (
              <Typography variant="subtitle2">{user?.name}</Typography>
            ) : (
              <Login />
            )}
            {user?.avatar ? (
              <Avatar
                sx={{ width: 24, height: 24 }}
                src={user?.avatar}
                alt={user?.name}
              />
            ) : null}
          </Stack>
          <Button
            sx={{
              color: "#D8D2BF",
              borderColor: "#D8D2BF",
              backgroundColor: "#000",
              "&:hover": {
                borderColor: "#000",
                color: "#000",
              },
            }}
            variant="outlined"
            onClick={() => setShowCart(true)}
          >
            <ShoppingCartIcon />
            <Typography>{totalQuantities}</Typography>
          </Button>
          <Box component="div" sx={{ position: "absolute" }}>
            {showCart && <Cart />}
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  ) : null;
};
