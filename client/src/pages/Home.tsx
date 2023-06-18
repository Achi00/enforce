import { useGetIdentity, useList } from "@pankod/refine-core";
import { PostCard, CustomButton } from "components";
import { Typography, Box, Stack } from "@pankod/refine-mui";
import "../index.css";
import { useEffect, useState, useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { revealVariants, textRevealVariant } from "../assets/motion.js";
import { Loading } from "components";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { bottle, enforce } from "../assets";
import AddIcon from "@mui/icons-material/Add";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DoneIcon from "@mui/icons-material/Done";
import { keyframes } from "@mui/system";
import { styled } from "@mui/system";

const Home = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useList({
    resource: "posts",
    config: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rand = (min: number, max: number): number =>
      Math.floor(Math.random() * (max - min + 1) + min);

    const uniqueRand = (min: number, max: number, prev: number): number => {
      let next = prev;

      while (prev === next) next = rand(min, max);

      return next;
    };

    const combinations = [
      { configuration: 1, roundness: 1 },
      { configuration: 1, roundness: 2 },
      { configuration: 1, roundness: 4 },
      { configuration: 2, roundness: 2 },
      { configuration: 2, roundness: 3 },
      { configuration: 3, roundness: 3 },
    ];

    let prev = 0;

    const intervalId = setInterval(() => {
      if (wrapperRef.current) {
        const index = uniqueRand(0, combinations.length - 1, prev);
        const combination = combinations[index];

        wrapperRef.current.dataset.configuration =
          combination.configuration.toString();
        wrapperRef.current.dataset.roundness = combination.roundness.toString();

        prev = index;
      }
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const latestPosts = data?.data ?? [];

  if (isLoading) return <Loading />;
  if (isError) return <Typography>Error</Typography>;

  return (
    <Box
      component="div"
      display="flex"
      flexDirection="column"
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      color="#000"
      sx={{
        overflowX: "hidden",
        background: "linear-gradient(to right, #F6F7FF 0%, #ced4da 100%)",
        inset: "0px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "60vh",
          alignItems: "center",
          justifyContent: "center",
          mb: 5, // adds bottom margin
          position: "relative",
          top: "-180px",
        }}
      >
        {/* main banner */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "60vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignSelf: "flex-start",
              width: "100%",
              height: "50vh",
              flexDirection: "column",
              gap: "4vmin",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack direction="row" width="100%">
              {/* 1 */}
              <Stack
                padding="2rem"
                direction="row"
                alignItems="center"
                gap="1vmin"
              >
                <Typography fontSize="3vmin" fontWeight="100">
                  Supplements
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "#000",
                    width: "2px",
                    height: "40px",
                  }}
                ></Box>
                <Typography>
                  Gain
                  <br />
                  recover
                </Typography>
              </Stack>
              {/* 2 */}
              <Stack
                padding="2rem"
                direction="row"
                alignItems="center"
                gap="1vmin"
              >
                <AddIcon
                  sx={{
                    color: "#fff",
                    fontSize: "4vmin",
                    backgroundColor: "#000",
                    borderRadius: "120px 120px 50px 120px",
                  }}
                />
                <Typography>On Sale</Typography>
              </Stack>
            </Stack>
            {/* cards */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                gap: "2vmin",
              }}
            >
              {/* card 1 */}
              <Stack
                width={{ lg: "80%", md: "650px", sm: "400px", xs: "280px" }}
                direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
                sx={{
                  background: "#F5EFDF",
                  height: "600px",
                  borderRadius: "35px",
                  overflow: "hidden",
                  position: "relative",
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
              >
                <Stack
                  sx={{ backgroundColor: "#000" }}
                  width={{ lg: "33.3%", md: "33.3%", sm: "100%", xs: "100%" }}
                  direction="column"
                  color="#fff"
                  zIndex="2"
                  textAlign="center"
                  justifyContent="center"
                  alignItems="center"
                  padding="1vmin"
                  pb={{ lg: "2vmin", md: "2vmin", sm: "3vmin", xs: "3vmin" }}
                >
                  <Typography fontSize="3vmin" fontWeight="400">
                    Whey Protein
                  </Typography>
                  <Typography fontSize="1.5vmin" fontWeight="100" color="#fff">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Reiciendis minima exercitationem eum nostrum.
                  </Typography>
                  <CustomButton
                    title={"More"}
                    backgroundColor="#D8D2BF"
                    handleClick={() => navigate("/posts/create")}
                    color="#000"
                    width="150px"
                    height="50px"
                  />
                </Stack>
                <Box
                  display={{ lg: "block", md: "block", sm: "none", xs: "none" }}
                >
                  <ArrowDownwardIcon
                    sx={{
                      mt: "15px",
                      color: "#000",
                      fontSize: "4vmin",
                      border: "1px solid #000",
                      borderRadius: "50%",
                    }}
                  />
                </Box>
                <Stack
                  sx={{ backgroundColor: "#D8D2BF" }}
                  width={{ lg: "33.3%", md: "33.3%", sm: "100%", xs: "100%" }}
                  direction="column"
                  color="#000"
                  zIndex="2"
                  pb={{ lg: "2vmin", md: "2vmin", sm: "3vmin", xs: "3vmin" }}
                  textAlign="center"
                  justifyContent="center"
                  alignItems="center"
                  padding="1vmin"
                >
                  <Typography fontSize="3vmin" fontWeight="400">
                    Make Order Now!
                  </Typography>
                  <Typography fontSize="1.5vmin" fontWeight="100">
                    Free Shipping
                  </Typography>
                  <CustomButton
                    title={"Buy Now"}
                    backgroundColor="#000"
                    handleClick={() => navigate("/posts/create")}
                    color="#fff"
                    width="150px"
                    height="50px"
                  />
                </Stack>
                <Stack
                  direction="column"
                  position="absolute"
                  top="40%"
                  right="50%"
                  sx={{ transform: "translate(50%, 0%)" }}
                >
                  <img
                    src={bottle}
                    alt="enforce"
                    width={650}
                    style={{
                      padding: "1rem",
                      pointerEvents: "none",
                    }}
                  />
                </Stack>
              </Stack>

              <Box
                sx={{
                  display: "flex",
                  width: "83%",
                  gap: "2vmin",
                }}
                flexDirection={{
                  lg: "row",
                  md: "row",
                  sm: "column",
                  xs: "column",
                }}
                justifyContent={{
                  lg: "space-between",
                  md: "space-between",
                  sm: "center",
                  xs: "center",
                }}
                alignItems="center"
              >
                {/* card 2 */}
                <Stack
                  m="2rem"
                  width={{ lg: "45%", md: "45%", sm: "90%", xs: "200px" }}
                  direction="row"
                  sx={{
                    background:
                      "linear-gradient(90deg, #F5EFDF 0%, #D8D2BF 100%)",
                    height: "250px",
                    borderRadius: "35px",
                    border: "1px solid black",
                    padding: "1rem",
                    overflow: "hidden",
                    position: "relative",
                    display: "flex",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                >
                  <Stack
                    direction="column"
                    color="#000"
                    textAlign="left"
                    zIndex="2"
                  >
                    <Typography fontSize="3vmin" fontWeight="700">
                      Whey Protein
                    </Typography>
                    <Typography fontSize="2vmin" width="150px">
                      Lorem ipsum dolor sit amet consectetur.
                    </Typography>
                    <CustomButton
                      title={"More"}
                      backgroundColor="#000"
                      handleClick={() => navigate("/posts/create")}
                      color="#f2f2f2"
                      width="150px"
                      height="50px"
                    />
                  </Stack>
                  <ArrowOutwardIcon
                    sx={{
                      zIndex: "10",
                      color: "#000",
                      fontSize: "4vmin",
                    }}
                  />
                  <div
                    ref={wrapperRef}
                    id="wrapper"
                    data-configuration="1"
                    data-roundness="1"
                  >
                    <div className="shape"></div>
                    <div className="shape"></div>
                    <div className="shape"></div>
                    <div className="shape"></div>
                    <div className="shape"></div>
                    <div className="shape"></div>
                    <div className="shape"></div>
                  </div>
                </Stack>
                {/* card 3 */}
                <Stack
                  m="2rem"
                  direction={{
                    lg: "row",
                    md: "column",
                    sm: "row",
                    xs: "column",
                  }}
                  justifyContent={{
                    lg: "center",
                    md: "space-between",
                    sm: "space-around",
                    xs: "center",
                  }}
                  width={{ lg: "45%", md: "45%", sm: "90%", xs: "200px" }}
                  sx={{
                    background: "#000",
                    height: "250px",
                    borderRadius: "35px",
                    padding: "1rem",
                    overflow: "hidden",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <Stack direction="column" color="#f2f2f2" zIndex="2">
                    <Stack
                      gap="1vmin"
                      alignItems="center"
                      direction="column"
                      justifyContent="center"
                    >
                      <Typography
                        color="#fff"
                        fontSize="3vmin"
                        fontWeight="700"
                        sx={{
                          borderBottom: "1px solid rgba(255, 255, 255, 0)",
                          transition: "0.3s ease-in-out",
                          ":hover": {
                            borderBottom: "1px solid rgba(255, 255, 255, 1)",
                            color: "#fff",
                          },
                        }}
                      >
                        Best Offers
                      </Typography>
                      <Stack
                        alignSelf="center"
                        direction="column"
                        justifyContent="center"
                        sx={{
                          borderBottom: "1px solid rgba(255, 255, 255, 0)",
                          transition: "0.3s ease-in-out",
                          ":hover": {
                            borderBottom: "1px solid rgba(255, 255, 255, 1)",
                            color: "#fff",
                          },
                        }}
                        color="#949494"
                      >
                        <Typography
                          width="150px"
                          fontWeight="700"
                          fontSize={{
                            lg: "2vmin",
                            md: "2vmin",
                            sm: "3vmin",
                            xs: "3vmin",
                          }}
                        >
                          01. Promo Codes
                        </Typography>
                      </Stack>
                      <Stack
                        alignSelf="center"
                        direction="column"
                        justifyContent="center"
                        sx={{
                          borderBottom: "1px solid rgba(255, 255, 255, 0)",
                          transition: "0.3s ease-in-out",
                          ":hover": {
                            borderBottom: "1px solid rgba(255, 255, 255, 1)",
                            color: "#fff",
                          },
                        }}
                        color="#949494"
                      >
                        <Typography
                          width="150px"
                          fontWeight="700"
                          fontSize={{
                            lg: "2vmin",
                            md: "2vmin",
                            sm: "3vmin",
                            xs: "3vmin",
                          }}
                        >
                          02. Free Shipping
                        </Typography>
                      </Stack>
                      <Stack
                        alignSelf="center"
                        direction="column"
                        justifyContent="center"
                        sx={{
                          borderBottom: "1px solid rgba(255, 255, 255, 0)",
                          transition: "0.3s ease-in-out",
                          ":hover": {
                            borderBottom: "1px solid rgba(255, 255, 255, 1)",
                            color: "#fff",
                          },
                        }}
                        color="#949494"
                      >
                        <Typography
                          width="150px"
                          fontWeight="700"
                          fontSize={{
                            lg: "2vmin",
                            md: "2vmin",
                            sm: "3vmin",
                            xs: "3vmin",
                          }}
                        >
                          03. Gifts
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                  <CustomButton
                    title={"Promo Codes"}
                    backgroundColor="#F5EFDF"
                    handleClick={() => navigate("/promo")}
                    color="#000"
                    width="150px"
                    height="40px"
                  />
                  <ArrowOutwardIcon
                    sx={{
                      position: "absolute",
                      right: "0",
                      top: "0",
                      margin: "2vmin",
                      color: "#f2f2f2",
                      fontSize: "4vmin",
                    }}
                  />
                </Stack>
              </Box>
              {/* content */}
              {/* second row */}
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: "#EFF3F4",
                  mb: 5,
                }}
              >
                <Typography color="#000" fontSize="3vmin">
                  Info
                </Typography>
                {/* row 1 */}
                <Stack
                  width="80%"
                  alignItems="center"
                  direction={{
                    lg: "row",
                    md: "row",
                    sm: "column",
                    xs: "column",
                  }}
                  justifyContent={{
                    lg: "space-between",
                    md: "center",
                    sm: "center",
                    xs: "center",
                  }}
                >
                  <Typography color="#000" fontSize="3vmin" fontWeight="700">
                    Save More
                  </Typography>
                  <Stack
                    alignSelf={{
                      lg: "flex-end",
                      md: "center",
                      sm: "center",
                      xs: "center",
                    }}
                    direction={{
                      lg: "row",
                      md: "row",
                      sm: "column",
                      xs: "column",
                    }}
                    justifyContent="space-between"
                    borderBottom="1px solid black"
                    width={{ lg: "50%", md: "450px", sm: "350px", xs: "280" }}
                    m="4vmin"
                  >
                    <Typography width="150px" color="#000" fontWeight="700">
                      1. Use Promo Code
                    </Typography>
                    <Typography color="#000" fontWeight="300">
                      Save
                    </Typography>
                    <Typography color="#000" fontWeight="300">
                      25%
                    </Typography>
                    <Typography color="#000" fontWeight="700">
                      Vitamins
                    </Typography>
                  </Stack>
                </Stack>
                {/* row 2 */}
                <Stack
                  width="80%"
                  alignItems="center"
                  direction={{
                    lg: "row",
                    md: "row",
                    sm: "column",
                    xs: "column",
                  }}
                  justifyContent={{
                    lg: "space-between",
                    md: "center",
                    sm: "center",
                    xs: "center",
                  }}
                >
                  <Typography color="#000" fontSize="3vmin" fontWeight="700">
                    Best Deals
                  </Typography>
                  <Stack
                    alignSelf={{
                      lg: "flex-end",
                      md: "center",
                      sm: "center",
                      xs: "center",
                    }}
                    direction={{
                      lg: "row",
                      md: "row",
                      sm: "column",
                      xs: "column",
                    }}
                    justifyContent="space-between"
                    borderBottom="1px solid black"
                    width={{ lg: "50%", md: "450px", sm: "350px", xs: "280" }}
                    m="4vmin"
                  >
                    <Typography width="150px" color="#000" fontWeight="700">
                      2. Sales
                    </Typography>
                    <Typography color="#000" fontWeight="300">
                      Save
                    </Typography>
                    <Typography color="#000" fontWeight="300">
                      25%
                    </Typography>
                    <Typography color="#000" fontWeight="700">
                      Vitamins
                    </Typography>
                  </Stack>
                </Stack>
                {/* row 3 */}
                <Stack
                  width="80%"
                  alignItems="center"
                  direction={{
                    lg: "row",
                    md: "row",
                    sm: "column",
                    xs: "column",
                  }}
                  justifyContent={{
                    lg: "space-between",
                    md: "center",
                    sm: "center",
                    xs: "center",
                  }}
                >
                  <Typography color="#000" fontSize="3vmin" fontWeight="700">
                    Buy Online
                  </Typography>
                  <Stack
                    alignSelf={{
                      lg: "flex-end",
                      md: "center",
                      sm: "center",
                      xs: "center",
                    }}
                    direction={{
                      lg: "row",
                      md: "row",
                      sm: "column",
                      xs: "column",
                    }}
                    justifyContent="space-between"
                    borderBottom="1px solid black"
                    width={{ lg: "50%", md: "450px", sm: "350px", xs: "280" }}
                    m="4vmin"
                  >
                    <Typography width="150px" color="#000" fontWeight="700">
                      3. Earn Points
                    </Typography>
                    <Typography color="#000" fontWeight="300">
                      Save
                    </Typography>
                    <Typography color="#000" fontWeight="300">
                      15%
                    </Typography>
                    <Typography color="#000" fontWeight="700">
                      Vitamins
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Box>
            <Box
              mt={2.5}
              width={{ lg: "95%", md: "95%", sm: "90%", xs: "85%" }}
              margin={{ lg: "2vmin", md: "1vmin", sm: "0", xs: "0" }}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "25px",
              }}
            >
              {latestPosts &&
                latestPosts.map((post: any) => (
                  <PostCard
                    key={post._id}
                    id={post._id}
                    description={post.description}
                    productType={post.productType}
                    title={post.title}
                    photo={post.photo}
                    photo2={post.photo2}
                    price={post.price}
                  />
                ))}
            </Box>
          </Box>
        </Box>
      </Box>
      {/* <Box>
        <motion.div
          variants={revealVariants}
          initial="hidden"
          whileInView="show"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            // position: "relative",
            // marginTop: "600px",
          }}
        >
          <Box
            component="div"
            mt={2.5}
            width={{ lg: "95%", md: "95%", sm: "90%", xs: "85%" }}
            margin={{ lg: "2vmin", md: "1vmin", sm: "0", xs: "0" }}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "25px",
            }}
          >
            {latestPosts &&
              latestPosts.map((post: any) => (
                <PostCard
                  key={post._id}
                  id={post._id}
                  description={post.description}
                  productType={post.productType}
                  title={post.title}
                  photo={post.photo}
                  photo2={post.photo2}
                  price={post.price}
                />
              ))}
          </Box>
        </motion.div>
      </Box> */}
    </Box>
  );
};

export default Home;
