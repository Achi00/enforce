import { Button } from "@pankod/refine-mui";
import { CustomButtonProps } from "interfaces/common";
import { useGetIdentity } from "@pankod/refine-core";

const CustomButton = ({
  type,
  height,
  title,
  backgroundColor,
  color,
  fullWidth,
  width,
  icon,
  handleClick,
  disabled,
}: CustomButtonProps) => {
  const { data: user } = useGetIdentity();
  return (
    <Button
      disabled={disabled}
      type={type === "submit" ? "submit" : "button"}
      sx={{
        flex: fullWidth ? 1 : "unset",
        padding: "15px 15px",
        mt: "20px",
        width: fullWidth ? "200px" : { lg: width, md: "10px", xs: "10px" },
        borderRadius: "15px",
        border: "1px solid black",
        minWidth: 130,
        height: height,
        backgroundColor,
        color,
        fontSize: 16,
        fontWeight: 600,
        gap: "10px",
        textTransform: "capitalize",
        "&:hover": {
          opacity: 0.9,
          backgroundColor: "#1C232B",
          color: "#FFFFFF",
        },
      }}
      onClick={handleClick}
    >
      {icon}
      {title}
    </Button>
  );
};

export default CustomButton;
