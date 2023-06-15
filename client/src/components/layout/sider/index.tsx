import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Drawer,
  Sider as DefaultSider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Tooltip,
  Button,
  IconButton,
  MuiList,
} from "@pankod/refine-mui";
import {
  ListOutlined,
  Logout,
  ExpandLess,
  ExpandMore,
  ChevronLeft,
  ChevronRight,
  MenuRounded,
  Dashboard,
} from "@mui/icons-material";
import DiscountIcon from "@mui/icons-material/Discount";
import ControlPointDuplicateIcon from "@mui/icons-material/ControlPointDuplicate";
import HistoryIcon from "@mui/icons-material/History";
import {
  CanAccess,
  ITreeMenu,
  useIsExistAuthentication,
  useLogout,
  useTitle,
  useTranslate,
  useRouterContext,
  useMenu,
  useRefineContext,
  useGetIdentity,
} from "@pankod/refine-core";

import { Title as DefaultTitle } from "../title";

export const Sider: typeof DefaultSider = ({ render }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [opened, setOpened] = useState(false);

  const drawerWidth = () => {
    if (collapsed) return 64;
    return 200;
  };

  const t = useTranslate();
  const { Link } = useRouterContext();
  const { hasDashboard } = useRefineContext();
  const translate = useTranslate();

  const { menuItems, selectedKey, defaultOpenKeys } = useMenu();
  const isExistAuthentication = useIsExistAuthentication();
  const { mutate: mutateLogout } = useLogout();
  // const { mutate: login } = useLogin<CredentialResponse>();
  const Title = useTitle();

  const [open, setOpen] = useState<{ [k: string]: any }>({});

  React.useEffect(() => {
    setOpen((previousOpen) => {
      const previousOpenKeys: string[] = Object.keys(previousOpen);
      const uniqueKeys = new Set([...previousOpenKeys, ...defaultOpenKeys]);
      const uniqueKeysRecord = Object.fromEntries(
        Array.from(uniqueKeys.values()).map((key) => [key, true])
      );
      return uniqueKeysRecord;
    });
  }, [defaultOpenKeys]);

  const RenderToTitle = Title ?? DefaultTitle;

  const handleClick = (key: string) => {
    setOpen({ ...open, [key]: !open[key] });
  };

  const renderTreeView = (tree: ITreeMenu[], selectedKey: string) => {
    return tree.map((item: ITreeMenu) => {
      const { icon, label, route, name, children, parentName } = item;
      const isOpen = open[route || ""] || false;

      const isSelected = route === selectedKey;
      const isNested = !(parentName === undefined);

      if (children.length > 0) {
        return (
          <CanAccess
            key={route}
            resource={name.toLowerCase()}
            action="list"
            params={{
              resource: item,
            }}
          >
            <div key={route}>
              <Tooltip
                title={label ?? name}
                placement="right"
                disableHoverListener={!collapsed}
                arrow
              >
                <ListItemButton
                  onClick={() => {
                    if (collapsed) {
                      setCollapsed(false);
                      if (!isOpen) {
                        handleClick(route || "");
                      }
                    } else {
                      handleClick(route || "");
                    }
                  }}
                  sx={{
                    pl: isNested ? 4 : 2,
                    justifyContent: "center",
                    "&.Mui-selected": {
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                      backgroundColor: "#0D1318",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      justifyContent: "center",
                      minWidth: 36,
                      color: "primary.contrastText",
                    }}
                  >
                    {icon ?? <ListOutlined />}
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                      noWrap: true,
                      fontSize: "16px",
                      fontWeight: isSelected ? "bold" : "normal",
                    }}
                  />
                  {!collapsed && (isOpen ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              </Tooltip>
              {!collapsed && (
                <Collapse in={open[route || ""]} timeout="auto" unmountOnExit>
                  <MuiList component="div" disablePadding>
                    {renderTreeView(children, selectedKey)}
                  </MuiList>
                </Collapse>
              )}
            </div>
          </CanAccess>
        );
      }

      return (
        <CanAccess
          key={route}
          resource={name.toLowerCase()}
          action="list"
          params={{ resource: item }}
        >
          <Tooltip
            title={label ?? name}
            placement="right"
            disableHoverListener={!collapsed}
            arrow
          >
            <ListItemButton
              component={Link}
              to={route}
              selected={isSelected}
              onClick={() => {
                setOpened(false);
              }}
              sx={{
                pl: isNested ? 4 : 2,
                py: isNested ? 1.25 : 1,
                "&.Mui-selected": {
                  "&:hover": {
                    backgroundColor: isSelected ? "#03045e" : "transparent",
                  },
                  backgroundColor: isSelected ? "#023e8a" : "transparent",
                },
                justifyContent: "center",
                margin: "10px auto",
                borderRadius: "15px",
                minHeight: "56px",
                width: "90%",
              }}
            >
              <ListItemIcon
                sx={{
                  justifyContent: "center",
                  minWidth: 36,
                  color: isSelected ? "#fff" : "#160A17",
                }}
              >
                {icon ?? <ListOutlined />}
              </ListItemIcon>
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  noWrap: true,
                  fontSize: "16px",
                  fontWeight: isSelected ? "bold" : "normal",
                  color: isSelected ? "#fff" : "#160A17",
                  marginLeft: "10px",
                }}
              />
            </ListItemButton>
          </Tooltip>
        </CanAccess>
      );
    });
  };

  const dashboard = hasDashboard ? (
    <CanAccess resource="dashboard" action="list">
      <Tooltip
        title={translate("dashboard.title", "Dashboard")}
        placement="right"
        disableHoverListener={!collapsed}
        arrow
      >
        <ListItemButton
          component={Link}
          to="/"
          selected={selectedKey === "/"}
          onClick={() => {
            setOpened(false);
          }}
          sx={{
            pl: 2,
            py: 1,
            "&.Mui-selected": {
              "&:hover": {
                backgroundColor: "transparent",
              },
              backgroundColor: "transparent",
            },
            justifyContent: "center",
          }}
        >
          <ListItemIcon
            sx={{
              justifyContent: "center",
              minWidth: 36,
              color: "#808191",
              marginLeft: "10px",
            }}
          >
            <Dashboard />
          </ListItemIcon>
          <ListItemText
            primary={translate("dashboard.title", "Home")}
            primaryTypographyProps={{
              noWrap: true,
              fontSize: "16px",
              fontWeight: selectedKey === "/" ? "bold" : "normal",
            }}
          />
        </ListItemButton>
      </Tooltip>
    </CanAccess>
  ) : null;
  const { data: user } = useGetIdentity();

  const LogoutButton = () => {
    if (!user || !user.email) {
      return null;
    }

    return (
      <Tooltip
        title={t("buttons.logout", "Logout")}
        placement="right"
        disableHoverListener={!collapsed}
        arrow
      >
        <ListItemButton
          key="logout"
          onClick={() => mutateLogout()}
          sx={{
            justifyContent: "center",
            margin: "10px auto",
            borderRadius: "15px",
            minHeight: "56px",
            width: "90%",
          }}
        >
          <ListItemIcon
            sx={{
              justifyContent: "center",
              minWidth: 36,
              color: "#000",
            }}
          >
            <Logout />
          </ListItemIcon>
          <ListItemText
            primary={t("buttons.logout", "Logout")}
            primaryTypographyProps={{
              noWrap: true,
              fontSize: "16px",
            }}
          />
        </ListItemButton>
      </Tooltip>
    );
  };

  const items = renderTreeView(menuItems, selectedKey);

  const renderSider = () => {
    if (render) {
      return render({
        dashboard,
        logout: <LogoutButton />,
        items,
        collapsed,
      });
    }
    return (
      <>
        {dashboard}
        {items}
        <LogoutButton />
      </>
    );
  };

  const drawer = (
    <MuiList disablePadding sx={{ mt: 1, color: "#000" }}>
      {renderSider()}
    </MuiList>
  );

  return (
    <>
      <Box
        component="div"
        sx={{
          width: { xs: drawerWidth() },
          display: {
            xs: "none",
            md: "block",
          },
          transition: "width 0.3s ease",
        }}
      />
      <Box
        component="nav"
        sx={{
          position: "fixed",
          zIndex: 1101,
          width: { sm: drawerWidth() },
          display: "flex",
        }}
      >
        <Drawer
          variant="temporary"
          open={opened}
          onClose={() => setOpened(false)}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: 256,
              bgcolor: "#fcfcfc",
            },
          }}
        >
          <Box
            component="div"
            sx={{
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RenderToTitle collapsed={false} />
          </Box>
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          PaperProps={{ elevation: 0 }}
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              height: "100vh",
              overflow: "hidden",
              position: "relative",
              border: "none",
              boxShadow: "none",
              boxSizing: "border-box",
              transition: "width 200ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(to right, #ced4da 0%, #F6F7FF 100%)",

                zIndex: -1,
              },
            },
          }}
          open
        >
          <Box
            component="div"
            sx={{
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RenderToTitle collapsed={collapsed} />
          </Box>
          <Box
            component="div"
            sx={{
              flexGrow: 1,
              overflowX: "hidden",
              overflowY: "auto",
            }}
          >
            {/* Menu */}
            <Box borderTop="1px solid gray">{drawer}</Box>
            <Box
              sx={{
                width: "100%",
                height: "250px",
                display: "flex",
                gap: "1vmin",
                justifyContent: "center",
                borderTop: "1px solid gray",
                borderBottom: "1px solid gray",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Stack
                sx={{
                  width: "90%",
                  height: "90%",
                  padding: "1rem",
                  background: "#F5EFDF",
                  border: "1px solid #000",
                  borderRadius: "15px",
                  gap: "1rem",
                  color: "#000",
                }}
              >
                <Stack
                  direction="row"
                  gap="10px"
                  borderRadius="15px"
                  padding="10px"
                  sx={{
                    "&:hover": {
                      opacity: 0.9,
                      backgroundColor: "#e9ecef",
                      color: "#000",
                    },
                  }}
                >
                  <DiscountIcon />
                  <Typography fontWeight="700">Discounts</Typography>
                </Stack>
                <Stack
                  direction="row"
                  gap="10px"
                  borderRadius="15px"
                  padding="10px"
                  sx={{
                    "&:hover": {
                      opacity: 0.9,
                      backgroundColor: "#adb5bd",
                      color: "#000",
                    },
                  }}
                >
                  <ControlPointDuplicateIcon />
                  <Typography fontWeight="700">Points</Typography>
                </Stack>
                <Stack
                  direction="row"
                  gap="10px"
                  borderRadius="15px"
                  padding="10px"
                  sx={{
                    "&:hover": {
                      opacity: 0.9,
                      backgroundColor: "#adb5bd",
                      color: "#000",
                    },
                  }}
                >
                  <HistoryIcon />
                  <Typography fontWeight="700">History</Typography>
                </Stack>
              </Stack>
            </Box>
          </Box>
          <Button
            sx={{
              background: "#0D1318",
              color: "primary.contrastText",
              textAlign: "center",
              borderRadius: "0px",
              borderTop: "1px solid #ffffff1a",
              "&:hover": {
                background: "#343a40",
              },
            }}
            fullWidth
            size="large"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </Drawer>
        <Box
          component="div"
          sx={{
            display: { xs: "block", md: "none" },
            position: "fixed",
            top: "14px",
            left: "0px",
            borderRadius: "0 6px 6px 0",
            bgcolor: "#475BE8",
            zIndex: 1199,
            width: "36px",
          }}
        >
          <IconButton
            sx={{ color: "#fff", width: "36px" }}
            onClick={() => setOpened((prev) => !prev)}
          >
            <MenuRounded />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};
