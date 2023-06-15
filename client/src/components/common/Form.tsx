import {
  Box,
  Typography,
  FormControl,
  FormHelperText,
  TextField,
  TextareaAutosize,
  Stack,
  Select,
  MenuItem,
  Button,
} from "@pankod/refine-mui";

import { FormProps } from "interfaces/common";
import CustomButton from "./CustomButton";

const Form = ({
  type,
  register,
  handleSubmit,
  handleImageChange,
  handleImageChange2,
  formLoading,
  onFinishHandler,
  postImage,
  postImage2,
}: FormProps) => {
  // add flavour
  return (
    <Box component="div">
      <Stack sx={{ padding: "24px" }}>
        <Typography fontSize={25} fontWeight={700} color="#11142d">
          {type} a Post
        </Typography>
        <Box
          component="div"
          mt={2.5}
          borderRadius="15px"
          padding="20px"
          bgcolor="#fcfcfc"
        >
          <form
            style={{
              marginTop: "20px",
              padding: "24px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
            onSubmit={handleSubmit(onFinishHandler)}
          >
            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 20,
                  color: "#11142d",
                }}
              >
                Enter Product Name
              </FormHelperText>
              <TextField
                fullWidth
                required
                id="outlined-basic"
                color="info"
                variant="outlined"
                {...register("title", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 20,
                  color: "#11142d",
                }}
              >
                Enter Description
              </FormHelperText>
              <TextareaAutosize
                minRows={5}
                required
                placeholder="Enter Description"
                color="info"
                style={{
                  width: "100%",
                  background: "transparent",
                  fontSize: "20px",
                  borderColor: "rgba(0, 0, 0, 0.23)",
                  borderRadius: 6,
                  padding: 10,
                  color: "#919191",
                }}
                {...register("description", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 20,
                  color: "#11142d",
                }}
              >
                Enter Weight
              </FormHelperText>
              <TextareaAutosize
                minRows={5}
                required
                placeholder="Enter Weight"
                color="info"
                style={{
                  width: "100%",
                  background: "transparent",
                  fontSize: "20px",
                  borderColor: "rgba(0, 0, 0, 0.23)",
                  borderRadius: 6,
                  padding: 10,
                  color: "#919191",
                }}
                {...register("weight", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 20,
                  color: "#11142d",
                }}
              >
                Enter Servings
              </FormHelperText>
              <TextareaAutosize
                minRows={5}
                required
                placeholder="Enter Servings"
                color="info"
                style={{
                  width: "100%",
                  background: "transparent",
                  fontSize: "20px",
                  borderColor: "rgba(0, 0, 0, 0.23)",
                  borderRadius: 6,
                  padding: 10,
                  color: "#919191",
                }}
                {...register("serving", { required: true })}
              />
            </FormControl>

            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 20,
                  color: "#11142d",
                }}
              >
                Enter how many is in stock
              </FormHelperText>
              <TextField
                minRows={2}
                required
                placeholder="Stock..."
                color="info"
                style={{
                  width: "100%",
                  background: "transparent",
                  fontSize: "20px",
                  borderColor: "rgba(0, 0, 0, 0.23)",
                  borderRadius: 6,
                  padding: 10,
                  color: "#919191",
                }}
                {...register("stock", { required: true })}
              />
            </FormControl>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 20,
                  color: "#11142d",
                }}
              >
                Select Product Type
              </FormHelperText>
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ "aria-label": "Without label" }}
                defaultValue="template"
                {...register("productType", { required: true })}
              >
                <MenuItem value="powder">powder</MenuItem>
                <MenuItem value="amino">amino</MenuItem>
                <MenuItem value="vitamin">vitamin</MenuItem>
                <MenuItem value="gainer">gainer</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 20,
                  color: "#11142d",
                }}
              >
                Enter flavors
              </FormHelperText>
              <TextareaAutosize
                minRows={5}
                required
                placeholder="Enter flavors like cocoa, apple, orange seterate with , to create array"
                color="info"
                style={{
                  width: "100%",
                  background: "transparent",
                  fontSize: "20px",
                  borderColor: "rgba(0, 0, 0, 0.23)",
                  borderRadius: 6,
                  padding: 10,
                  color: "#919191",
                }}
                {...register("flavors", { required: true })}
              />
            </FormControl>
            <Stack direction="row" gap={4}>
              <FormControl>
                <FormHelperText
                  sx={{
                    fontWeight: 500,
                    margin: "10px 0",
                    fontSize: 20,
                    color: "#11142d",
                  }}
                >
                  Enter Price
                </FormHelperText>
                <TextField
                  minRows={5}
                  required
                  placeholder="Enter price  without $"
                  color="info"
                  style={{
                    background: "transparent",
                    fontSize: "20px",
                    borderColor: "rgba(0, 0, 0, 0.23)",
                    borderRadius: 6,
                    padding: 10,
                    color: "#919191",
                  }}
                  {...register("price", { required: true })}
                />
              </FormControl>
            </Stack>
            <Stack direction="column" gap={1} justifyContent="center" mb={2}>
              <Stack direction="row" gap={2}>
                <Typography color="#11142d" fontSize={20} fontWeight={500}>
                  Post Photo
                </Typography>
                <Button
                  component="label"
                  sx={{
                    width: "fit-content",
                    color: "#2ed480",
                    textTransform: "capitalize",
                    fontSize: 20,
                  }}
                >
                  Upload
                  <input
                    hidden
                    multiple
                    accept="image/*"
                    type="file"
                    onChange={(e) => {
                      //  @ts-ignore
                      handleImageChange(e.target.files[0]);
                    }}
                  />
                </Button>
                <Button
                  component="label"
                  sx={{
                    width: "fit-content",
                    color: "#2ed480",
                    textTransform: "capitalize",
                    fontSize: 20,
                  }}
                >
                  Upload2
                  <input
                    hidden
                    multiple
                    accept="image/*"
                    type="file"
                    onChange={(e) => {
                      //  @ts-ignore
                      handleImageChange2(e.target.files[0]);
                    }}
                  />
                </Button>
                {/* <Button
                  component="label"
                  sx={{
                    width: "fit-content",
                    color: "#2ed480",
                    textTransform: "capitalize",
                    fontSize: 20,
                  }}
                >
                  Upload3
                  <input
                    hidden
                    multiple
                    accept="image/*"
                    type="file"
                    onChange={(e) => {
                      //  @ts-ignore
                      handleImageChange3(e.target.files[0]);
                    }}
                  />
                </Button>
                <Button
                  component="label"
                  sx={{
                    width: "fit-content",
                    color: "#2ed480",
                    textTransform: "capitalize",
                    fontSize: 20,
                  }}
                >
                  Upload4
                  <input
                    hidden
                    multiple
                    accept="image/*"
                    type="file"
                    onChange={(e) => {
                      //  @ts-ignore
                      handleImageChange4(e.target.files[0]);
                    }}
                  />
                </Button> */}
              </Stack>
              <Typography
                fontSize={14}
                color="#808191"
                sx={{ wordBreak: "break-all" }}
              >
                {postImage?.name}
              </Typography>
              <Typography
                fontSize={14}
                color="#808191"
                sx={{ wordBreak: "break-all" }}
              >
                {postImage2?.name}
              </Typography>
              {/* <Typography
                fontSize={14}
                color="#808191"
                sx={{ wordBreak: "break-all" }}
              >
                {postImage3?.name}
              </Typography>
              <Typography
                fontSize={14}
                color="#808191"
                sx={{ wordBreak: "break-all" }}
              >
                {postImage4?.name}
              </Typography> */}
            </Stack>
            <CustomButton
              type="submit"
              title={formLoading ? "Submiting..." : "Submit"}
              backgroundColor="#475be8"
              color="#fcfcfc"
              height="70px"
              width="200px"
            />
          </form>
        </Box>
      </Stack>
    </Box>
  );
};

export default Form;
