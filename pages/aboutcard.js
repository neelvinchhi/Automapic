import {Heading, CardHeader, CardBody, CardFooter, Text, Card, Avatar } from '@chakra-ui/react';

export function AboutCard(name, image, contribution) {
    return (
        <Card bgColor={'whiteAlpha.300'} color='white' minWidth='175px' maxWidth='175px' >
                <CardHeader>
                <Avatar src={image} mt='2' mb='2'/>
                <Heading size='md' mb='2'>{name}</Heading>
                <Text>{contribution}</Text>
                </CardHeader>
        </Card>
    )
};