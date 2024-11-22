import React from 'react';
import { Box, Grid, styled, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Element } from 'react-scroll'; // For scrollable element
import Title from './Title';
import imgDetail from '../../public/images/2.jpg';
import imgDetail2 from '../../public/images/4.jpg';

const GetStarted = () => {

    const CustomGridItem = styled(Grid)({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    });
    
    const CustomTypography = styled(Typography)({
        fontSize: '1.1rem',
        textAlign: 'start',
        lineHeight: '1.5',
        color: '#515151',
        marginTop: '1.5rem',
    });

    // Animation Variants
    const fadeLeft = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
    };

    const fadeRight = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        // Wrapping with Element for scrolling
        <Element name="get-started-section">
            <Grid 
                container 
                spacing={{ xs: 4, sm: 4, md: 0 }}
                sx={{
                    py: 10,
                    px: 2,
                }}
            >
                {/* Fade Left Animation */}
                <CustomGridItem 
                    item 
                    xs={12} 
                    sm={8} 
                    md={6} 
                    component={motion.section}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                    variants={fadeLeft}
                >
                    <Box 
                        component='article'
                        sx={{
                            px: 4,
                        }}
                    >
                        <Title
                            text='Seamless Moving, One Tap Away'
                            textAlign='start'
                        />
                        <CustomTypography>
                           With MOVEMATE, plan, book, and track your move all in one place. Say goodbye to moving hassles.
                        </CustomTypography> 
                    </Box>
                </CustomGridItem>
                
                {/* Fade Right Animation */}
                <Grid 
                    item 
                    xs={12} 
                    sm={4} 
                    md={6}
                    component={motion.div}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                    variants={fadeRight}
                >
                    <img 
                        src={imgDetail} 
                        alt="Detail" 
                        style={{
                            width: '100%',
                        }}
                    />
                </Grid>

                {/* Fade Left Animation */}
                <Grid 
                    item 
                    xs={12} 
                    sm={4} 
                    md={6}
                    component={motion.div}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                    variants={fadeLeft}
                    sx={{
                        order: { xs: 4, sm: 4, md: 3 },
                    }}
                >
                    <img 
                        src={imgDetail2} 
                        alt="Detail 2" 
                        style={{ 
                            width: "100%",
                        }}
                    />
                </Grid>

                {/* Fade Right Animation */}
                <CustomGridItem 
                    item 
                    xs={12} 
                    sm={8} 
                    md={6}
                    component={motion.section}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                    variants={fadeRight}
                    sx={{
                        order: { xs: 3, sm: 3, md: 4 },
                    }}
                >
                    <Box 
                        component='article'
                        sx={{
                            px: 4,
                        }}
                    >
                        <Title
                            text='Smart Moves Start Here'
                            textAlign='start'
                        />
                        <CustomTypography>
                        MOVEMATE redefines moving with simple scheduling, transparent pricing, and expert movers you can trust.
                        </CustomTypography>
                    </Box>
                </CustomGridItem>
            </Grid>
        </Element>
    );
}

export default GetStarted;
