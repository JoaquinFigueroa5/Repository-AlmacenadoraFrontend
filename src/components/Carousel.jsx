import React, { useState } from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
  Flex,
  Heading,
  Text,
  Container,
} from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function Carousel() {
  const [slider, setSlider] = useState(null);

  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '40px' });

  const cards = [
    {
      title: 'Design Projects 1',
      text: "The project board is an exclusive resource for contract work. It's perfect for freelancers, agencies, and moonlighters.",
      image:
        'https://images.unsplash.com/photo-1672552226380-486fe900b322?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'Design Projects 2',
      text: "The project board is an exclusive resource for contract work. It's perfect for freelancers, agencies, and moonlighters.",
      image:
        'https://images.unsplash.com/photo-1532635042-a6f6ad4745f9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'Design Projects 3',
      text: "The project board is an exclusive resource for contract work. It's perfect for freelancers, agencies, and moonlighters.",
      image:
        'https://images.unsplash.com/photo-1565891741441-64926e441838?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  return (
    <Box position="relative" height="600px" width="full" overflow="hidden">
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />

      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform="translate(0%, -50%)"
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>

      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform="translate(0%, -50%)"
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>

      <Slider {...settings} ref={(s) => setSlider(s)}>
        {cards.map((card, index) => (
          <Box
            key={index}
            height="2xl"
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="center"
            backgroundPosition="center center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${card.image})`}
          >
            <Container size="container.lg" height="600px" position="relative">
              <Flex
                direction={{ base: 'column', md: 'row' }}
                spacing={6}
                w="full"
                maxW="6xl"
                position="absolute"
                top="50%"
                transform="translate(0, -50%)"
                align="center"
                justify="space-between"
                px={4}
              >
                {/* Logo con ancho fijo */}
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  w={{ base: '100%', md: '200px' }} // Ancho fijo para el logo
                  mb={{ base: 4, md: 0 }}
                >
                  <img
                    src="https://www.svgrepo.com/show/530392/picture.svg"
                    alt="Logo"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </Box>

                {/* Texto expandido */}
                <Box
                  p={6}
                  bg="rgba(255, 255, 255, 0.4)"
                  borderRadius="md"
                  backdropFilter="blur(10px)"
                  boxShadow="lg"
                  flex="1" // El texto ocupa el espacio restante
                >
                  <Heading
                    fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                    textAlign="left"
                    color="blackAlpha.800"
                  >
                    {card.title}
                  </Heading>
                  <Text
                    fontSize={{ base: 'md', lg: 'lg' }}
                    textAlign="left"
                    color="blackAlpha.700"
                  >
                    {card.text}
                  </Text>
                </Box>
              </Flex>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
