
import { Box, Button, Flex, Heading, Text, Textarea, useBreakpointValue, Container, Spinner, Image, Stack} from '@chakra-ui/react';
import { useState } from 'react';
import {useRouter} from 'next/router';
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';






export default function Home() {
  const [text, setText] = useState("");
  const [nodeDataArray, setNodeDataArray] = useState([]);
  const [linkDataArray, setLinkDataArray] = useState([]);
  const [goDiagram, setGoDiagram] = useState();
  const [loading, setLoading] = useState(false);


  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmission = () => {
    setLoading(true);
    console.log("Submitting...");
    // Handle the text submission logic here
    fetch("/api/generate", {  // Adjust the endpoint if you've deployed it differently.
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: text }),
    }).then(response => response.json()).then(result => {
      console.log("RESULT", result)
      setNodeDataArray(result.response.nodeDataArray);
      setLinkDataArray(result.response.linkDataArray);
      setLoading(false)
    })
    .catch(e => {
      console.log(e);
    })
  };

  const router = useRouter();

  const aboutUsSubmission = () => {
    router.push('components/aboutus')
  }

  const navHeight = useBreakpointValue({ base: "3rem", md: "4rem" });

  const initDiagram = () => {
    const $ = go.GraphObject.make;
      const diagram =
      $(go.Diagram,
        {
          'undoManager.isEnabled': true,  
          'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
          model: new go.GraphLinksModel(
            {
              linkKeyProperty: 'key'  
            })
        });
  
  
    diagram.nodeTemplate =
      $(go.Node, 'Auto',  
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'RoundedRectangle',
          { name: 'SHAPE', fill: 'white', strokeWidth: 0 },
          new go.Binding('fill', 'color')),
        $(go.TextBlock,
          { margin: 8, editable: true },  
          new go.Binding('text').makeTwoWay()
        )
      );
    setGoDiagram(diagram)
    return diagram;
  }
  const downloadImage = () => {
    const downloadData = goDiagram.makeImageData({scale: 1})
    var a = document.createElement("a");
    a.href = downloadData //Image Base64 Goes here
    a.download = "MINDMAP_EXPORT.png"; //File name Here
    a.click(); //Downloaded file
  }

  const loadingSpinner = () => {
      return (
        <Spinner size='lg'/>
      )
    
  }

  return (
    <Box bg="blackAlpha.900" minH="100vh">
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
        <Button _hover={{bgGradient: 'linear(to-r, #007fff, #00dee6)', color: 'black', border: 'none'}} color='white' variant='outline' onClick={aboutUsSubmission}>About Us</Button> 
      </Flex>

      {/* Content */}
      <Flex flexDirection="column" alignItems="center" justifyContent="center" pt={16}>
        <Container maxW="3xl">
            <Flex justifyContent="center" textAlign="center" alignItems="center" flexDirection="column">
                <Heading size="2xl" bgGradient='linear(to-r, #007fff, #00dee6)' bgClip='text' mb={2}>Enter text to get started</Heading>
                <Text fontSize="lg" color="white" mt={3} mb={4}>We use cutting edge generative AI models to create the perfect mind map.</Text>
            </Flex>
            <Textarea 
                placeholder="Enter text content" 
                size="md"
                color="white"
                mt={6}
                value={text}
                onChange={handleTextChange}
                mb={4}
                minH="xs"
                variant="outline" 
                h="5rem"
            />
            <Stack direction='row'>
              <Button size="lg" w="100%" _hover={{bgGradient: 'linear(to-r, #007fff, #00dee6)', color: 'black', border: 'none'}} color='white' variant='outline' onClick={handleSubmission} isDisabled={loading || !text}>{loading ? (
              <Spinner size="lg" color="white" />
            ) : (
              'Generate'
            )}</Button> 
              <Button size='lg' _hover={{bgGradient: 'linear(to-r, #007fff, #00dee6)', color: 'black', border: 'none'}} color='white' variant='outline' onClick={downloadImage}>Download</Button>
            </Stack>

            <ReactDiagram style={{margin: '20px', borderRadius: '16', height: "500px", width: "60vw"}}classname="diagram"
              initDiagram={initDiagram}
              divClassName='diagram-component'
              nodeDataArray={nodeDataArray}
              linkDataArray={linkDataArray}
            />
        </Container>
      </Flex>
    </Box>
  );
}
