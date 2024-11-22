import React from 'react';
import { Box, Button, styled, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
// Image
import headerImg from '../../public/images/image.png';
import { borderRadius } from '@mui/system';

const Header = () => {

    const CustomBox = styled(Box)(({ theme }) => ({
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        gap: theme.spacing(2),
        paddingTop: theme.spacing(10),
        backgroundColor: '#002B5C',
        minHeight:'100vh',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',

            
        }
    }));

    const BoxText = styled(Box)(({ theme }) => ({
        flex: '1',
        paddingLeft: theme.spacing(8),
        [theme.breakpoints.down('md')]: {
            flex: '2',
            textAlign: 'center',
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
    }));

    return (
        <CustomBox component='header'>
            {/* Box text */}
            <BoxText component='section'>
                <Typography
                    variant='h2'
                    component='h1'
                    sx={{
                        fontWeight: 700,
                        color: '#fff',
                    }}
                >
                    Moving made simple and seamless with MOVEMATE
                </Typography>

                <Typography
                    component='p'
                    sx={{
                        py: 3,
                        lineHeight: 1.6,
                        color: '#fff',
                    }}
                >
                    Your go-to place for fast, reliable, and affordable moving services. From packing to unpacking, MOVEMATE takes care of it all.
                </Typography>

                    <Box>
        <Button
            component={Link}
            to='/register'  // Replace with your target route
            variant='contained'
            sx={{
                mr: 2,
                px: 4,
                py: 1,
                fontSize: '0.9rem',
                textTransform: 'capitalize',
                border: '2px solid #ffffff',
                borderRadius: '16px',
                color: '#000',
                backgroundColor: '#fff',
                "&&:hover": {
                    backgroundColor: "#002B5C",
                    color: "#fff"
                },
                "&&:focus": {
                    backgroundColor: "#002B5C"
                }
            }}
        >
            Register Now
        </Button>
    </Box>
            </BoxText>

            <Box sx={theme => ({
                [theme.breakpoints.down('md')]: {
                    flex: '1',
                    paddingTop: '30px',
                    alignSelf: 'center',
                },
                [theme.breakpoints.up('md')]: {
                    flex: '2',
                    alignSelf: 'flex-end',
                },
            })}
            >
                <img
                    src={headerImg}
                    alt="Header"
                    style={{
                        width: "100%",
                        marginBottom: -15,
                    }}
                />
            </Box>
        </CustomBox>
    );
}

export default Header;
