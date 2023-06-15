import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { wrap } from "@popmotion/popcorn";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material";

type ImageSliderProps = {
  images: string | string[];
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    };
  },
};

const Slider: React.FC<ImageSliderProps> = ({ images }) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [[page, direction], setPage] = useState([0, 0]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof images === "string") {
      setImageUrls(images.split(" "));
    } else {
      setImageUrls(images);
    }
  }, [images]);

  const imageIndex = wrap(0, imageUrls.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const handleDialogOpen = () => setOpen(true); // Function to open dialog
  const handleDialogClose = () => setOpen(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <AnimatePresence initial={false} custom={direction}>
        {imageUrls.map((image: string, index: number) => {
          if (index !== imageIndex) return null;

          return (
            <motion.img
              className="slider-img"
              key={image} // Set the key to the image URL
              src={image}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              onClick={handleDialogOpen}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            />
          );
        })}
      </AnimatePresence>
      <Dialog
        sx={{ overflow: "hidden", padding: "0" }}
        open={open}
        onClose={handleDialogClose}
        fullScreen={fullScreen}
      >
        <AppBar
          position="static"
          sx={{ backgroundColor: "transparent", boxShadow: "none" }}
        >
          <Toolbar
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "transparent",
            }}
          >
            <IconButton
              edge="end"
              color="default"
              onClick={handleDialogClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
            padding: 0,
            overflow: "hidden",
          }}
        >
          <img
            src={imageUrls[imageIndex]}
            alt="Enlarged view"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </Dialog>
      <div className="next" onClick={() => paginate(1)}>
        <ArrowForwardIosIcon sx={{ fontSize: "2vmin" }} />
      </div>
      <div className="prev" onClick={() => paginate(-1)}>
        <ArrowForwardIosIcon sx={{ fontSize: "2vmin" }} />
      </div>
    </>
  );
};

export default Slider;
