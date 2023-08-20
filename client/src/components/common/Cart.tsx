import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { TiDeleteOutline } from "react-icons/ti";
import { AiOutlineLeft } from "react-icons/ai";
import { useStateContext } from "context/StateContext";
import { Typography, Box, Stack, Button } from "@pankod/refine-mui";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import GooglePayButton from "@google-pay/button-react";
import { useNavigate } from "react-router-dom";

interface Item {
  _id: string;
  productId: string; // Since this references a Post, it's an ID represented as a string
  title: string;
  selectedFlavor: string;
  price: number;
  quantity: number;
}

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    setTotalPrice,
    toggleCartItemQuantity,
    setTotalQuantities,
    onRemove,
    cartItems,
    setShowCart,
    setCartItems,
  } = useStateContext();

  const [clientToken, setClientToken] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/client_token", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Client token fetched: ", data.clientToken);
        setClientToken(data.clientToken);
      })
      .catch((error) => {
        console.error("Error fetching client token: ", error);
      });
  }, []);

  // Read from localStorage and update state when the component mounts
  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      const parsedSavedCartItems = JSON.parse(savedCartItems);
      setCartItems(parsedSavedCartItems);

      // Update totalQuantities
      const totalQty = parsedSavedCartItems.reduce(
        (total: any, item: any) => total + item.quantity,
        0
      );
      setTotalQuantities(totalQty);
    }
  }, []);

  useEffect(() => {
    // your previous code

    const savedTotalPrice = localStorage.getItem("totalPrice");
    if (savedTotalPrice) {
      const parsedSavedTotalPrice = JSON.parse(savedTotalPrice);
      setTotalPrice(parsedSavedTotalPrice);
    }
  }, [totalPrice]);

  const navigate = useNavigate();

  return (
    <Box
      position="fixed"
      right="0"
      top="0"
      width={{ lg: "30%", md: "45%", sm: "50%", xs: "100%" }}
      height="100vh"
      component="div"
      sx={{
        backgroundColor: "#f2f2f2",
        zIndex: "100",
        borderLeft: "1px solid #B8B8B8",
        overflowY: "auto",
      }}
      ref={cartRef}
    >
      <Button
        sx={{
          color: "#000",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          padding: "2vmin",
        }}
        variant="text"
        onClick={() => setShowCart(false)}
      >
        <Stack direction="row" display="flex" alignItems="center">
          <AiOutlineLeft />
          <Typography fontWeight="700">Your Cart</Typography>
        </Stack>
        <Typography
          sx={{
            color: "#000",
          }}
        >
          <TiDeleteOutline size={35} />
        </Typography>
      </Button>
      {cartItems.length < 1 && (
        <Stack
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="2rem"
        >
          <AddShoppingCartIcon sx={{ fontSize: "5vmin", color: "#000" }} />
          <Typography sx={{ color: "#000", fontWeight: "bold" }}>
            Your shopping cart is empty
          </Typography>
          <Link to="/posts">
            <Button
              sx={{
                color: "#000",
                border: "2px solid #000",
                backgroundColor: "#E3DDCC",
                borderRadius: "35px",
                fontWeight: "bold",
                // width: "100%",
                padding: "1vmin",
              }}
              variant="text"
              onClick={() => setShowCart(false)}
            >
              CONTINUE SHOPPING
            </Button>
          </Link>
        </Stack>
      )}

      <Box component="div">
        {cartItems.length >= 1 &&
          cartItems.map((item: any) => (
            <Stack
              direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
              padding="4vmin"
              borderBottom="1px solid #B8B8B8"
              justifyContent="center"
              alignItems="center"
              key={item.id}
            >
              <img
                style={{ width: "40%", height: "auto", borderRadius: "25px" }}
                src={item.photo}
                alt="my health"
              />
              <Stack direction="column" padding="2vmin">
                <Typography
                  fontSize={{
                    lg: "4vmin",
                    md: "3vmin",
                    sm: "4vmin",
                    xs: "6vmin",
                  }}
                  sx={{ color: "#000" }}
                >
                  {item.title}
                </Typography>
                <Typography
                  fontSize={{
                    lg: "3vmin",
                    md: "2.5vmin",
                    sm: "3vmin",
                    xs: "4vmin",
                  }}
                  sx={{
                    color: "#000",
                    fontWeight: "bold",
                  }}
                >
                  ფასი: {item.price} ₾
                </Typography>
                <Typography
                  fontSize={{
                    lg: "3vmin",
                    md: "2.5vmin",
                    sm: "3vmin",
                    xs: "4vmin",
                  }}
                  sx={{
                    color: "#000",
                    fontWeight: "bold",
                  }}
                >
                  რაოდენობა: {item.quantity}
                </Typography>
                <Typography
                  fontSize={{
                    lg: "3vmin",
                    md: "2.5vmin",
                    sm: "3vmin",
                    xs: "4vmin",
                  }}
                  sx={{
                    color: "#000",
                    fontWeight: "bold",
                  }}
                >
                  არომატი: {item.selectedFlavor}
                </Typography>
                <Stack
                  direction="column"
                  display="flex"
                  alignItems="center"
                  gap="1vmin"
                  justifyContent="center"
                >
                  <Stack
                    marginTop="2vmin"
                    direction="row"
                    alignItems="center"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #B8B8B8",
                      borderRadius: "8px",
                      height: "35px",
                      padding: "5px",
                      width: "18vmin",
                    }}
                    justifyContent="space-between"
                  >
                    <RemoveIcon
                      onClick={() =>
                        toggleCartItemQuantity(
                          item._id,
                          item.selectedFlavor,
                          "dec"
                        )
                      }
                      sx={{ cursor: "pointer", color: "red" }}
                    />
                    <Typography>{item.quantity}</Typography>
                    <AddIcon
                      onClick={() =>
                        toggleCartItemQuantity(
                          item._id,
                          item.selectedFlavor,
                          "inc"
                        )
                      }
                      sx={{ cursor: "pointer", color: "green" }}
                    />
                  </Stack>
                  <Button
                    onClick={() => onRemove(item, item.selectedFlavor)}
                    sx={{
                      color: "#023e8a",
                      borderColor: "#023e8a",
                      height: "35px",
                      padding: "5px",
                      width: "18vmin",
                    }}
                    variant="outlined"
                  >
                    Remove
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          ))}
        {cartItems.length >= 1 && (
          <Box component="div">
            <Stack
              justifyContent="center"
              alignItems="center"
              direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
              gap="2vmin"
              padding="2vmin"
            >
              <Typography
                sx={{ fontWeight: "bold", fontSize: "2vmin", color: "#023e8a" }}
              >
                Subtotal:
              </Typography>
              <Typography sx={{ fontWeight: "bold", fontSize: "2vmin" }}>
                ₾ {totalPrice}
              </Typography>
            </Stack>
            <Stack
              justifyContent="center"
              alignItems="center"
              paddingBottom="1vmin"
            >
              {clientToken === null ? (
                <Typography>Loading...</Typography>
              ) : (
                <GooglePayButton
                  environment="TEST"
                  buttonSizeMode="fill"
                  paymentRequest={{
                    apiVersion: 2,
                    apiVersionMinor: 0,
                    allowedPaymentMethods: [
                      {
                        type: "CARD",
                        parameters: {
                          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                          allowedCardNetworks: ["MASTERCARD", "VISA"],
                        },
                        tokenizationSpecification: {
                          type: "PAYMENT_GATEWAY",
                          parameters: {
                            gateway: "braintree",
                            "braintree:apiVersion": "v1",
                            "braintree:sdkVersion": "3.16.0",
                            "braintree:merchantId": "r6nzsbk3vn4wr6bs",
                            "braintree:authorizationFingerprint": clientToken,
                          },
                        },
                      },
                    ],
                    merchantInfo: {
                      merchantId: "BCR2DN4T52LJNFQH",
                      merchantName: "ecommerce",
                    },
                    transactionInfo: {
                      totalPriceStatus: "FINAL",
                      totalPriceLabel: "Total",
                      totalPrice: totalPrice.toString(),
                      currencyCode: "GEL",
                      countryCode: "GE",
                    },
                    shippingAddressRequired: true,
                    shippingAddressParameters: {
                      allowedCountryCodes: ["US", "GE"], // adjust this to the country codes you support
                      phoneNumberRequired: true,
                    },
                    shippingOptionRequired: true,
                    shippingOptionParameters: {
                      defaultSelectedOptionId: "Free",
                      shippingOptions: [
                        {
                          id: "Free",
                          label: "უფასო მიტანა",
                          description: "3-5 სამუშაო დღეში",
                        },
                      ],
                    },
                  }}
                  onLoadPaymentData={async (paymentRequest) => {
                    console.log(
                      "load payment data",
                      paymentRequest.paymentMethodData
                    );

                    const { shippingAddress } = paymentRequest;
                    if (shippingAddress) {
                      // Extract the nonce (token) from paymentMethodData
                      const paymentNonceFromGooglePay =
                        paymentRequest.paymentMethodData.tokenizationData.token;
                      console.log("Type of Nonce:", paymentNonceFromGooglePay);
                      console.log("paymentRequest:", paymentRequest);
                      console.log(
                        "paymentMethodData:",
                        paymentRequest.paymentMethodData
                      );
                      console.log(
                        "tokenizationData:",
                        paymentRequest.paymentMethodData.tokenizationData
                      );
                      console.log(
                        "Token:",
                        paymentRequest.paymentMethodData.tokenizationData.token
                      );

                      // Construct your order data
                      const orderData = {
                        paymentNonce: paymentNonceFromGooglePay,
                        totalPrice: totalPrice,
                        items: cartItems.map((item: Item) => ({
                          productId: item._id,
                          title: item.title,
                          selectedFlavor: item.selectedFlavor,
                          price: item.price,
                          quantity: item.quantity,
                        })),
                        customerDetails: {
                          name: shippingAddress.name, // use data from Google Pay
                          address: shippingAddress.address1, // use data from Google Pay
                          phoneNumber: shippingAddress.phoneNumber, // placeholder, replace with actual data
                        },
                      };

                      console.log(
                        "Payment Nonce from Google Pay:",
                        paymentNonceFromGooglePay
                      );
                      console.log("Total Price:", totalPrice);
                      console.log("paymentRequest", paymentRequest);

                      // Post the orderData to your API
                      await fetch("http://localhost:8080/api/v1/order", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(orderData),
                      })
                        .then((response) => {
                          if (!response.ok) {
                            throw new Error("HTTP error " + response.status);
                          }
                          return response.json();
                        })
                        .then((responseData) => {
                          console.log(
                            "Order created successfully:",
                            responseData
                          );
                          navigate(`/success/${responseData.order._id}`);

                          setCartItems([]); // set cart items to an empty array
                          setTotalPrice(0); // set total price to 0
                          localStorage.removeItem("cartItems"); // remove items from localStorage
                          localStorage.removeItem("totalPrice"); // remove total price from localStorage
                        })
                        .catch((error) => {
                          console.log("Fetching failed:", error);
                          toast.error(
                            "There was an error while creating the order: " +
                              error.message
                          );
                        });

                      // Now, process the payment
                      const paymentResponse = await fetch(
                        "http://localhost:8080/api/v1/order/process_payment",
                        {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            paymentNonce: paymentNonceFromGooglePay,
                            totalPrice: totalPrice,
                          }),
                        }
                      );

                      if (paymentResponse.ok) {
                        const responseData = await paymentResponse.json();
                        console.log(
                          "Payment processed successfully:",
                          responseData
                        );
                      } else {
                        // handle error during payment processing
                        console.log(
                          "Error processing payment:",
                          paymentResponse
                        );
                        toast.error(
                          "There was an error while processing the payment"
                        );
                      }
                    } else {
                      toast.error("Shipping address is undefined");
                    }
                  }}
                />
              )}
            </Stack>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Cart;
