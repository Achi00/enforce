import { Link } from "@pankod/refine-react-router-v6";
import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Stack,
} from "@pankod/refine-mui";
import { Button } from "@pankod/refine-mui";
import { PostCardProps } from "interfaces/property";
import { useGetIdentity } from "@pankod/refine-core";
import { useState } from "react";
import { GoogleButton } from "pages/login";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const PostCard = ({ id, title, photo, price, productType }: PostCardProps) => {
  const [hover, setHover] = useState(false);
  return (
    <Card
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      component={Link}
      to={`/posts/show/${id}`}
      sx={{
        maxWidth: { lg: "400px", md: "350px", xs: "280px" },
        height: "550px",
        borderRadius: "25px",
        border: "1px solid gray",
        backgroundColor: "transparent",
        padding: "2vmin",
        marginTop: "30px",
        marginBottom: "30px",
        cursor: "pointer",
        color: "#000",
      }}
      elevation={0}
    >
      <Box component="div" display="flex" justifyContent="flex-end" mb="1vmin">
        <ArrowOutwardIcon />
      </Box>
      <CardMedia
        component="img"
        width="250px"
        height="330px"
        image={photo}
        alt="card Image"
        sx={{
          borderRadius: "25px",
          cursor: "pointer",
          transition: "0.4s ease-in-out",
          "&:hover": {
            opacity: 1,
            backgroundColor: "#dee2e6",
            transition: "all 0.2s ease",
            objectFit: "cover",
          },
        }}
      />
      {hover === true ? (
        <Box
          component="div"
          sx={{
            position: "relative",
            bottom: "25%",
            left: "50%",
            transform: "translate(-50%, 50%)",
          }}
        >
          <Button
            sx={{
              zIndex: "10",
              position: "absolute",
              bottom: "50%",
              left: "50%",
              transform: "translate(-50%, 0%)",
              backgroundColor: "#0D1318",
              color: "white",
              fontSize: "18px",
              fontWeight: "900",
              padding: "0.5rem",
              pointerEvents: "none",
              "&:hover": {
                backgroundColor: "rgba(3, 4, 94, 0.7)",
              },
            }}
          >
            Explore More
          </Button>
        </Box>
      ) : null}
      <Box component="div" sx={{ position: "relative" }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "10px",
            padding: "5px",
            textTransform: "capitalize",
            textAlign: "center",
          }}
        >
          <Stack direction="column">
            <Typography fontSize={22} fontWeight={700} color="#000">
              {title}
            </Typography>
            <Typography fontSize={20} fontWeight={500} color="#000">
              {productType}
            </Typography>
            <Typography fontSize={18} fontWeight={500} color="#000">
              {price} ₾
            </Typography>
          </Stack>
        </CardContent>
      </Box>
    </Card>
  );
};

export default PostCard;
