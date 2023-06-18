import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Stack,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Title, Sider, Layout, Header } from "components/layout";
import { useParams } from "react-router-dom";

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
  updatedAt: string;
  _id: string;
};

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/order/${id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

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

    fetchOrdersData();
  }, []);

  return orders ? (
    <Box display="flex">
      <Sider />
      <Box>
        <Container maxWidth="lg">
          <Box my={4}>
            <Card>
              <CardContent>
                <Typography variant="h3" fontSize="700" gutterBottom>
                  შეკვეთა წარმატებით შეიქმნა
                </Typography>
                <Typography variant="h6" gutterBottom>
                  შეკვეთის ID: {orders._id}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  შეკვეთა შექმნილია: {orders.createdAt}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  მომხმარებლის დეტალები:
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="სახელი"
                      secondary={orders.customerDetails.name}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="ტელეფონის ნომერი"
                      secondary={orders.customerDetails.phoneNumber}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="მისამართი"
                      secondary={orders.customerDetails.address}
                    />
                  </ListItem>
                </List>
                <Typography variant="h6" gutterBottom>
                  პროდუქტი:
                </Typography>
                {orders.items.map((item, index) => (
                  <List key={index} sx={{ borderTop: "1px solid black" }}>
                    <ListItem>
                      <ListItemText
                        primary="პროდუქტის დასახელება"
                        secondary={
                          <span
                            style={{
                              fontSize: "1.2rem",
                              color: "#000",
                              fontWeight: "700",
                            }}
                          >
                            {item.title}
                          </span>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Product ID"
                        secondary={
                          <span
                            style={{
                              fontSize: "1.2rem",
                              color: "#000",
                              fontWeight: "700",
                            }}
                          >
                            {item.productId}
                          </span>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="არჩეული არომატი"
                        secondary={
                          <span
                            style={{
                              fontSize: "1.2rem",
                              color: "#000",
                              fontWeight: "700",
                            }}
                          >
                            {item.selectedFlavor}
                          </span>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="რაოდენობა"
                        secondary={
                          <span
                            style={{
                              fontSize: "1.2rem",
                              color: "#000",
                              fontWeight: "700",
                            }}
                          >
                            {item.quantity.toString()}
                          </span>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="ფასი"
                        secondary={
                          <span
                            style={{
                              fontSize: "1.2rem",
                              color: "#000",
                              fontWeight: "700",
                            }}
                          >
                            {item.price.toString() + "₾"}
                          </span>
                        }
                      />
                    </ListItem>
                  </List>
                ))}
                <Typography variant="h6" gutterBottom>
                  ჯამური ფასი: {orders.totalPrice} ₾
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>
    </Box>
  ) : (
    <div>Loading...</div>
  );
};

export default Orders;
