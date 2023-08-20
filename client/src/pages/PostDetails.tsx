import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@pankod/refine-mui";
import { useDelete, useGetIdentity, useShow } from "@pankod/refine-core";
import { useParams, useNavigate } from "@pankod/refine-react-router-v6";
import { Delete, Edit } from "@mui/icons-material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { CustomButton, Loading } from "components";
import { motion } from "framer-motion";
import { revealVariants } from "assets/motion";
import Slider from "components/common/Slider";
import { SelectChangeEvent } from "@mui/material/Select";
import { AllPosts } from "pages";
import { useStateContext } from "context/StateContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ReactHtmlParser from "react-html-parser";
import ScaleIcon from "@mui/icons-material/Scale";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const PostDetails = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const { id } = useParams();
  const { mutate } = useDelete();
  const { queryResult } = useShow();

  const [selectedFlavor, setSelectedFlavor] = useState<string>("");
  const [disableAdd, setDisableAdd] = useState(false);
  const [open, setOpen] = useState(false);

  const { decQty, incQty, qty, setQty, onAdd, cartItems } = useStateContext();

  const { data, isLoading, isError } = queryResult;

  const postDetails = data?.data ?? {};
  const {
    price,
    title,
    description,
    photo,
    photo2,
    productType,
    stock,
    serving,
    weight,
    flavor,
    nutritions,
  } = postDetails;

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/posts/${id}`
        );
        const data = await response.json();

        // if the stock has decreased, refresh the page
        if (data && data.stock < stock) {
          window.location.reload();
        }
      } catch (error) {
        console.error("Error fetching product stock:", error);
      }
    }, 10000); // checks every 10 seconds

    // cleanup: stop the interval when the component unmounts
    return () => clearInterval(interval);
  }, [id, stock]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSelectedFlavor("");
    setQty(1);
  }, [id]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedFlavor(event.target.value as string);
  };

  useEffect(() => {
    const closeSelectOnScroll = () => {
      setOpen(false);
    };

    window.addEventListener("scroll", closeSelectOnScroll);

    return () => {
      window.removeEventListener("scroll", closeSelectOnScroll);
    };
  }, []);

  useEffect(() => {
    if (qty >= stock) {
      setDisableAdd(true);
    } else {
      setDisableAdd(false);
    }
  }, [qty, stock]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  const isCurrentUser =
    user && postDetails && user.email === postDetails.creator.email;

  const handleDeletePost = () => {
    const response = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (response) {
      mutate(
        {
          resource: "posts",
          id: id as string,
        },
        {
          onSuccess: () => {
            navigate("/posts");
          },
        }
      );
    }
  };

  const images = [photo, photo2];

  const replacedDescription = description
    .replace(/<strong>/g, "<b>")
    .replace(/<\/strong>/g, "</b>");

  // Split into lines
  const lines = replacedDescription.split("\n");

  // const nutritionalInformation = JSON.parse(nutritions);

  // Transformation function for <b> tags
  const transform = (node: any, index: any) => {
    if (node.type === "tag" && node.name === "b") {
      return (
        <b key={index} style={{ fontWeight: 900, color: "black" }}>
          {node.children[0].data}
        </b>
      );
    }
  };

  function createData(name: String, calories: String) {
    return { name, calories };
  }

  const rows = [createData("Protein", "20g"), createData("Sugar", "2g")];

  return (
    <Box
      component={motion.div}
      variants={revealVariants}
      initial="hidden"
      whileInView="show"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      my={{ lg: 10, md: 8, xs: 2 }}
      mx={{ lg: 10, md: 8, xs: 2 }}
    >
      <Stack
        direction={{
          xl: "row",
          lg: "column",
          md: "column",
          sm: "column",
          xs: "column",
        }}
        gap="7vmin"
        justifyContent="center"
        alignItems="center"
      >
        <div className="slider-container">
          <Slider images={images} />
        </div>
        <Stack
          direction="column"
          display="flex"
          justifyContent="center"
          gap="4vmin"
          pb="4vmin"
        >
          <Typography
            component="h2"
            width={{ lg: 600, md: 300, xs: 250 }}
            fontSize={22}
            fontWeight={700}
            color="#000"
          >
            {title}
          </Typography>
          <Typography
            component="h2"
            fontSize={18}
            fontWeight={900}
            color="#000"
            textTransform="capitalize"
          >
            {productType}
          </Typography>
          <Typography
            component="h2"
            fontSize={25}
            fontWeight={600}
            color="#000"
          >
            {price} ₾
          </Typography>
          {/* quantity */}
          <Box component="div" display="flex" alignItems="center" gap="2vmin">
            <Typography
              component="h2"
              fontSize={18}
              fontWeight={600}
              color="#000"
            >
              რაოდენობა
            </Typography>
            <Stack
              direction="row"
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #B8B8B8",
                borderRadius: "8px",
                height: "35px",
                padding: "5px",
                width: "150px",
              }}
              justifyContent="space-between"
            >
              <Button>
                <RemoveIcon
                  onClick={decQty}
                  sx={{ cursor: "pointer", color: "red" }}
                />
              </Button>
              <Typography>{qty}</Typography>
              <Button
                sx={{ weight: "10px" }}
                onClick={incQty}
                disabled={qty >= stock}
              >
                <AddIcon
                  sx={{
                    cursor: disableAdd ? "not-allowed" : "pointer",
                    color: disableAdd ? "gray" : "green",
                  }}
                />
              </Button>
            </Stack>
          </Box>
          <Stack
            direction={{ lg: "row", md: "row", sm: "row", xs: "column" }}
            alignItems="center"
            gap="1vmin"
          >
            <Typography
              sx={{
                display: "flex",
                color: "#fff",
                border: "1px solid #000",
                backgroundColor: "#000",
                borderRadius: "8px",
                gap: "1vmin",
                px: "1rem",
                width: "180px",
                height: "38px",
                justifyContent: "center",
              }}
              component="h2"
              fontSize={18}
              fontWeight={700}
              alignItems="center"
            >
              პორცია: {serving}
            </Typography>
            <Typography
              sx={{
                display: "flex",
                color: "#fff",
                border: "1px solid #000",
                backgroundColor: "#000",
                borderRadius: "8px",
                gap: "1vmin",
                px: "1rem",
                width: "180px",
                height: "38px",
                justifyContent: "center",
              }}
              component="h2"
              fontSize={18}
              fontWeight={700}
              alignItems="center"
            >
              მარაგშია: {stock}
            </Typography>

            <Typography
              sx={{
                display: "flex",
                color: "#fff",
                border: "1px solid #000",
                backgroundColor: "#000",
                borderRadius: "8px",
                gap: "1vmin",
                px: "1rem",
                width: "180px",
                height: "38px",
                justifyContent: "center",
              }}
              component="h2"
              fontSize={18}
              fontWeight={700}
              alignItems="center"
            >
              <ScaleIcon /> {weight} კგ
            </Typography>
          </Stack>
          <Typography
            color="#000"
            fontWeight={700}
            width={{ lg: 600, md: 300, xs: 250 }}
            sx={{
              fontSize: {
                xs: "10px",
                md: "12px",
                lg: "15px",
              },
            }}
          >
            {description}
          </Typography>
          <FormControl variant="outlined">
            <InputLabel sx={{ outline: "none" }} id="select-flavor-label">
              არომატი
            </InputLabel>
            <Select
              labelId="select-flavor-label"
              value={selectedFlavor}
              onChange={handleChange}
              label="არომატი"
              open={open}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
            >
              {flavor?.map((item: string, index: number) => (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* nutritions */}
        </Stack>
        <Button
          sx={{
            color: "#D8D2BF",
            borderColor: "#D8D2BF",
            backgroundColor: "#000",
            "&:hover": {
              borderColor: "#000",
              color: "#000",
              outline: "none",
            },
            "&.Mui-disabled": {
              color: "#D8D2BF", // Color for disabled button text
              // Add any other styles for disabled button state here
            },
          }}
          variant="outlined"
          onClick={() => onAdd(postDetails, qty, selectedFlavor)}
          disabled={!selectedFlavor || stock < 1}
        >
          {!selectedFlavor || stock < 1
            ? "აირჩიეთ არომატი"
            : "კალათში დამატება"}
        </Button>
      </Stack>

      <Box component="div">
        <Stack mt="25px" direction="column" gap={2}>
          {user?.email === process.env.REACT_APP_ADMIN_USER ? (
            <CustomButton
              title={!isCurrentUser ? "Save Post" : "Edit"}
              width="100px"
              height="30px"
              backgroundColor="#0D1318"
              color="#FCFCFC"
              fullWidth
              disabled={isCurrentUser ? false : true}
              icon={!isCurrentUser ? <SaveAltIcon /> : <Edit />}
              handleClick={() => {
                if (isCurrentUser) {
                  navigate(`/posts/edit/${postDetails._id}`);
                }
              }}
            />
          ) : null}
          {user?.email === process.env.REACT_APP_ADMIN_USER ? (
            <CustomButton
              title={"Delete"}
              backgroundColor={!isCurrentUser ? "#2ED480" : "#d42e2e"}
              color="#FCFCFC"
              width="100px"
              height="30px"
              fullWidth
              disabled={
                user?.email === process.env.REACT_APP_ADMIN_USER ? false : true
              }
              icon={<Delete />}
              handleClick={() => {
                if (user?.email === process.env.REACT_APP_ADMIN_USER)
                  handleDeletePost();
              }}
            />
          ) : null}
        </Stack>
        {/* <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "#F5EFDF",
            border: "1px solid #000",
            borderRadius: "35px",
          }}
        >
          <Table sx={{ Width: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.5em" }}>
                  Nutrient
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: "bold", fontSize: "1.5em" }}
                >
                  Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {nutritionalInformation.map((nutrition: any) => (
                <TableRow
                  key={nutrition?.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{ fontWeight: "bold", fontSize: "1.2em" }}
                    component="th"
                    scope="row"
                  >
                    {nutrition?.name}
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", fontSize: "1.2em" }}
                    align="right"
                  >
                    {nutrition?.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
      </Box>
      <Box component="div">
        <AllPosts />
      </Box>
    </Box>
  );
};

export default PostDetails;
