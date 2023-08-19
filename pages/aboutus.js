
import { Box, Button, Flex, Heading, Text, useBreakpointValue, Container, SimpleGrid, Stack, Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { AboutCard } from './aboutcard.js'

export default function Home() {

  const router = useRouter();

  const homeSubmission = () => {
    router.push('/')
  }

  const navHeight = useBreakpointValue({ base: "3rem", md: "4rem" });

  const kaku = AboutCard('K Purnendu', 'https://cdn.discordapp.com/attachments/1114134300846215231/1138446577502007366/latest.png', 'PPT' )
  const neel = AboutCard('Neel Vinchhi', 'https://cdn.discordapp.com/attachments/1114134300846215231/1138446577502007366/latest.png', 'Frontend, Backend and Machine Learning')
  const neev = AboutCard('Neev Raj Singh', 'https://cdn.discordapp.com/attachments/1114134300846215231/1138446577502007366/latest.png', 'Frontend')
  const samvar = AboutCard('Sambhar Shah', 'https://cdn.discordapp.com/attachments/1114134300846215231/1138446577502007366/latest.png', 'Backend')
  const rachit = AboutCard('Rachit Jain', 'https://cdn.discordapp.com/attachments/1114134300846215231/1138446577502007366/latest.png', 'PPT')
  const anchit = AboutCard('Anchit Mitra', 'https://cdn.discordapp.com/attachments/1114134300846215231/1138446577502007366/latest.png', 'PPT')

  return (
    <Box bg="blackAlpha.900" h="100vh">
      {/* Navbar */}
      <Flex 
        bg="transparent" 
        w="100%" 
        p={4} 
        alignItems="center"
        justifyContent="space-between"
        h={navHeight}
        color="black"
      >
        
        <Image src='https://cdn.discordapp.com/attachments/1114134300846215231/1138438931260641350/Logo.png' boxSize='50px'/>
        <Button _hover={{bgGradient: 'linear(to-r, #007fff, #00dee6)', color: 'black', border: 'none'}} color='white' variant='outline' onClick={homeSubmission}>Home</Button> 
      </Flex>

      {/* Content */}
      <Flex flexDirection="column" alignItems="center" justifyContent="center" pt={16}>
        <Container maxW="6xl">
            <Flex justifyContent="center" textAlign="center" alignItems="center" flexDirection="column">
                <Heading size="2xl" bgGradient='linear(to-r, #007fff, #00dee6)' bgClip='text' mb={2}>About Us</Heading>
                <Text fontSize="lg" color="white" mt={3} mb={4}>Welcome to GenV, your gateway to seamless learning and enhanced understanding! We are an innovative group of high school enthusiasts on a mission to revolutionize education through cutting-edge technology. With a fervent belief in the power of artificial intelligence, we've harnessed the capabilities of GPT and other advanced AI models to create an automatic mind map generator that's set to redefine the way students learn. Our passion for simplifying complex concepts drives us to develop tools that transform the educational landscape, making it more accessible, engaging, and tailored to your needs. GenV is not just a name; it's a symbol of the next generation of learning, where knowledge flourishes effortlessly, and understanding blooms organically. Join us on this exciting journey towards a brighter, more interconnected educational future.</Text>
            </Flex>
        <Flex flexDirection="column" alignItems="center" justifyContent="center" pt={16}>
        <Heading color='white' mb='10'>Meet the team</Heading>
        <Stack direction='row'> 
            {kaku}
            {neel}
            {neev}
            {anchit}
            {rachit}
            {samvar}
        </Stack>
        </Flex>
        </Container>
      </Flex>
    </Box>
  );
}