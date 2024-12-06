import React from "react";
import { Box, Button, styled, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import Slider from "react-slick"; // React-Slick for slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import headerImg from "../../public/images/image.png";

// Styled components
const CustomBox = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(5),
  padding: theme.spacing(5),
  backgroundColor: "#002B5C",
  color: "#FFFFFF",
}));

const BoxText = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(3),
}));

const CustomCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  color: "#002B5C",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    transform: "scale(1.05)",
    transition: "transform 0.3s ease-in-out",
  },
}));

const Header = () => {
  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <Box>
      {/* Hero Section */}
      <CustomBox>
        <BoxText>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "3.5rem" },
              lineHeight: 1.2,
            }}
          >
            Seamless Moving with <span style={{ color: "#FFD700" }}>MOVEMATE</span>
          </Typography>
          <Typography
            sx={{
              marginTop: 2,
              fontSize: "1rem",
              lineHeight: 1.6,
              color: "#FFFFFF",
            }}
          >
            Your trusted partner for fast, reliable, and stress-free moving. We
            handle everything, so you don't have to.
          </Typography>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            sx={{
              marginTop: 3,
              backgroundColor: "#FFD700",
              color: "#002B5C",
              borderRadius: "16px",
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: 700,
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: "#FFF5D6",
              },
            }}
          >
            Get Started
          </Button>
        </BoxText>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={headerImg}
            alt="Header"
            style={{
              width: "80%",
              transform: "rotate(10deg) scale(1.1)",
              transition: "transform 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "rotate(0deg) scale(1.2)")}
            onMouseLeave={(e) => (e.target.style.transform = "rotate(10deg) scale(1.1)")}
          />
        </Box>
      </CustomBox>

      {/* Slider Section */}
      <Box sx={{ backgroundColor: "#FFFFFF", py: 6 }}>
        <Typography
          variant="h4"
          textAlign="center"
          sx={{ color: "#002B5C", fontWeight: 700, mb: 4 }}
        >
          Why Choose Us?
        </Typography>
        <Slider {...sliderSettings}>
          <Box>
            <Box sx={{ textAlign: "center", px: 5 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: "#002B5C" }}>
                Reliable Service
              </Typography>
              <Typography sx={{ color: "#555", mt: 1 }}>
                MOVEMATE ensures your belongings are handled with utmost care.
              </Typography>
            </Box>
          </Box>
          <Box>
            <Box sx={{ textAlign: "center", px: 5 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: "#002B5C" }}>
                Affordable Prices
              </Typography>
              <Typography sx={{ color: "#555", mt: 1 }}>
                Get the best rates for premium moving services.
              </Typography>
            </Box>
          </Box>
          <Box>
            <Box sx={{ textAlign: "center", px: 5 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: "#002B5C" }}>
                Customer Satisfaction
              </Typography>
              <Typography sx={{ color: "#555", mt: 1 }}>
                Our customers love us, and you will too.
              </Typography>
            </Box>
         
            </Box>
        </Slider>
      </Box>

      {/* About Us Section */}
      <Box sx={{ py: 6, backgroundColor: "#F5F5F5" }}>
        <Grid container spacing={4} sx={{ px: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#002B5C",
                mb: 2,
              }}
            >
              About MOVEMATE
            </Typography>
            <Typography sx={{ color: "#555", lineHeight: 1.8 }}>
              MOVEMATE is your trusted moving partner, dedicated to making your
              relocation stress-free and efficient. With years of experience and
              a customer-first approach, we ensure seamless moving solutions
              tailored to your needs.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img
                src={headerImg}
                alt="About Us"
                style={{
                  width: "80%",
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Call-to-Action Section */}
      <Box
        sx={{
          py: 6,
          textAlign: "center",
          backgroundColor: "#002B5C",
          color: "#FFFFFF",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 3,
          }}
        >
          Ready to Make Your Move?
        </Typography>
        <Typography sx={{ mb: 4, lineHeight: 1.6 }}>
          Sign up now and experience a hassle-free moving journey with MOVEMATE.
        </Typography>
        <Button
          component={Link}
          to="/register"
          variant="contained"
          sx={{
            backgroundColor: "#FFD700",
            color: "#002B5C",
            borderRadius: "16px",
            px: 5,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: 700,
            textTransform: "capitalize",
            "&:hover": {
              backgroundColor: "#FFF5D6",
            },
          }}
        >
          Register Now
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
