import React from 'react';
import { Button, Stack } from '@mui/material';
import Title from './Title';
import Paragraph from './Paragraph';
import { Link } from 'react-router-dom';

const GetInTouch = () => {
    return (
        <Stack 
            component='section'
            direction="column"
            justifyContent='center'
            alignItems='center'
            sx={{
                py: 10,
                mx: 6,
            }}
        >
            <Title 
                text='Contact us'
                textAlign='center'
            />
            <Paragraph 
                text='It is our commitment to ensure a professional and enjoyable new home buying experience for you.'
                maxWidth='sm'
                mx={0}
                textAlign='center'
            />
            <Button 
    component={Link}
    to='/register' // Redirects to /contact page
    variant="contained"
    type="submit"
    size="medium"
    sx={{ 
        fontSize: '0.9rem',
        textTransform: 'capitalize', 
        py: 2,
        px: 4,
        mt: 3, 
        mb: 2,
        borderRadius: 0,
        border:'2px solid #002B5C',
        backgroundColor: '#14192d',
        "&:hover": {
            backgroundColor: '#fff',
            color:'#000'
        }
    }}
>
    Get in Touch
</Button>
        </Stack>
    );
}

export default GetInTouch;
