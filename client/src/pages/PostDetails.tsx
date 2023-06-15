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

const PostDetails = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const { id } = useParams();
  const { mutate } = useDelete();
  const { queryResult } = useShow();

  const [selectedFlavor, setSelectedFlavor] = useState<string>("");
  const [open, setOpen] = useState(false);

  const { decQty, incQty, qty, setQty, onAdd, cartItems } = useStateContext();

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
  } = postDetails;

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

  return (
    <Box
      component={motion.div}
      variants={revealVariants}
      initial="hidden"
      whileInView="show"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      // sx={{ textTransform: "capitalize" }}
      my={{ lg: 10, md: 8, xs: 2 }}
      mx={{ lg: 10, md: 8, xs: 2 }}
    >
      <Stack
        direction={{ lg: "row", md: "column", sm: "column", xs: "column" }}
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
            component="h1"
            fontSize={{ lg: "2vw", md: 25, xs: 20 }}
            width={{ lg: 600, md: 300, xs: 250 }}
            fontWeight={900}
            color="#000000"
          >
            {title}
          </Typography>
          <Typography
            component="h2"
            fontSize={25}
            fontWeight={700}
            color="#9D9D9D"
          >
            {productType}
          </Typography>
          <Typography
            component="h2"
            fontSize={25}
            fontWeight={700}
            color="#9D9D9D"
          >
            ფასი: {price} ₾
          </Typography>
          <Typography
            component="h2"
            fontSize={25}
            fontWeight={700}
            color="#9D9D9D"
          >
            პორცია: {serving}
          </Typography>
          <Typography
            component="h2"
            fontSize={25}
            fontWeight={700}
            color="#9D9D9D"
          >
            მარაგშია: {stock}
          </Typography>

          <Typography
            component="h2"
            fontSize={25}
            fontWeight={700}
            color="#9D9D9D"
          >
            წონა: {weight} კგ
          </Typography>
          <FormControl variant="outlined">
            <InputLabel id="select-flavor-label">არომატი</InputLabel>
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
          {/* quantity */}
          <Box component="div">
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
              <RemoveIcon
                onClick={decQty}
                sx={{ cursor: "pointer", color: "red" }}
              />
              <Typography>{qty}</Typography>
              <AddIcon
                onClick={incQty}
                sx={{ cursor: "pointer", color: "green" }}
              />
            </Stack>
          </Box>
        </Stack>
        <Button
          sx={{
            color: "#023e8a",
            borderColor: "#023e8a",
          }}
          variant="outlined"
          onClick={() => onAdd(postDetails, qty, selectedFlavor)}
          disabled={!selectedFlavor || stock < 1}
        >
          Add to Cart
        </Button>
      </Stack>
      <Box component="div" mt="4vw">
        <Stack>
          <Typography
            component="h2"
            fontSize={{ lg: 19, md: 15, xs: 12 }}
            width="100%"
            fontWeight={600}
            color="#000000"
          >
            {description}
          </Typography>
        </Stack>
      </Box>
      <Box component="div">
        <Stack mt="25px" direction="column" gap={2}>
          {isCurrentUser ? (
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
          {isCurrentUser ? (
            <CustomButton
              title={"Delete"}
              backgroundColor={!isCurrentUser ? "#2ED480" : "#d42e2e"}
              color="#FCFCFC"
              width="100px"
              height="30px"
              fullWidth
              disabled={isCurrentUser ? false : true}
              icon={!isCurrentUser ? null : <Delete />}
              handleClick={() => {
                if (isCurrentUser) handleDeletePost();
              }}
            />
          ) : null}
        </Stack>
      </Box>
      <Box component="div">
        <AllPosts />
      </Box>
    </Box>
  );
};

export default PostDetails;
