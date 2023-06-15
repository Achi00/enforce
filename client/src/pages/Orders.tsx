import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  TableCell,
  Button,
} from "@mui/material";
import { useDelete, useGetIdentity, useShow } from "@pankod/refine-core";
import { CustomButton } from "components";
import { Delete } from "@mui/icons-material";
import { useParams, useNavigate } from "@pankod/refine-react-router-v6";

type Order = {
  createdAt: string;
  customerDetails: {
    address: string;
    name: string;
    phoneNumber: string;
  };
  items: Array<{
    price: number;
    productId: string;
    quantity: number;
    selectedFlavor: string;
    title: string;
    _id: string;
  }>;
  totalPrice: number;
  isDelivered: boolean;
  updatedAt: string;
  _id: string;
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { mutate } = useDelete();
  const { data: user } = useGetIdentity();
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchOrdersData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/order`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data);
        console.log(data);
      } else {
        // handle error
        console.log("Error fetching orders:", response);
      }
    } catch (error) {
      // handle error
      console.log("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (user?.email !== process.env.REACT_APP_ADMIN_USER) {
      navigate("/posts");
    }

    fetchOrdersData();
  }, []);

  const updateDeliveryStatus = async (orderId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/order/${orderId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isDelivered: true }),
        }
      );

      if (response.ok) {
        // refresh the orders
        fetchOrdersData();
      } else {
        console.log("Error updating delivery status:", response);
      }
    } catch (error) {
      console.log("Error updating delivery status:", error);
    }
  };

  const handleDeletePost = () => {
    const response = window.confirm(
      "Are you sure you want to delete this order?"
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

  return (
    <Container>
      <Box my={4}>
        {orders.map((order, index) => (
          <Card key={index}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                შეკვეთის ID: {order._id}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                შექმნილია: {new Date(order.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                განახლებულია: {new Date(order.updatedAt).toLocaleString()}
              </Typography>
              <Typography variant="h6" gutterBottom>
                კლიენტის სახელი: {order.customerDetails.name}
              </Typography>
              <Typography variant="h6" gutterBottom>
                კლიენტის მისამართი: {order.customerDetails.address}
              </Typography>
              <Typography variant="h6" gutterBottom>
                კლიენტის ტელეფონის ნომერი: {order.customerDetails.phoneNumber}
              </Typography>
              <List>
                {order.items.map((item, i) => (
                  <ListItem key={i}>
                    <ListItemText
                      primary={`პროდუქტი ${i + 1}: ${item.title}`}
                      secondary={`რაოდენობა: ${item.quantity} | ფასი: ${item.price} | არომატი: ${item.selectedFlavor}`}
                    />
                  </ListItem>
                ))}
                <TableCell align="right">
                  {order?.isDelivered
                    ? "ამანათი ჩაბარებულია"
                    : "ამანათი არ არის ჩაბარებული"}
                </TableCell>
                <TableCell align="right">
                  {order.isDelivered ? (
                    ""
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => updateDeliveryStatus(order._id)}
                    >
                      Completed
                    </Button>
                  )}
                </TableCell>
              </List>
              <Typography variant="h6" gutterBottom>
                ჯამური ფასი: {order.totalPrice}
              </Typography>
            </CardContent>
            <Box margin="2rem">
              <CustomButton
                title={"Delete"}
                backgroundColor="#d42e2e"
                // 2ED480
                color="#FCFCFC"
                width="100px"
                height="30px"
                fullWidth
                icon={<Delete />}
                handleClick={() => {
                  handleDeletePost();
                }}
              />
            </Box>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Orders;
