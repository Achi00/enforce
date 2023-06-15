import { Box, Stack, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import {} from "../assets";
import { useTable } from "@pankod/refine-core";

const Footer = () => {
  const {
    tableQueryResult: { isLoading },
  } = useTable();
  if (isLoading) return null;

  return (
    <Box
      component="div"
      sx={{
        borderTop: "1xp solid black",
        background: "linear-gradient(130deg, #fff, #adb5bd, #fff)",
        width: "100%",
        height: "200px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        width="90%"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="column" gap={5}>
          <a
            className="media"
            href="https://www.facebook.com/myhealthge"
            target="_blank"
          >
            გამოგვყევით Facebook ზე
            <FacebookIcon />
          </a>

          <Typography fontSize={16} fontWeight={900} color="#000">
            myhealthmod@gmail.com
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
