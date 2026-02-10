import { Box, Heading, Text, Button, Stack, Container, SimpleGrid, Flex, VStack, HStack, Link } from "@chakra-ui/react";

export default function App() {
  return (
    <Box minH="100vh" bgGradient="linear(to-br, teal.900, purple.900, blue.900)" color="white">
      <Container maxW="6xl" py={10}>
        <Flex justify="space-between" align="center" mb={8}>
          <HStack gap={3} fontWeight="black" fontSize="2xl">
            <Text fontSize="3xl">🎄</Text>
            <Text bgGradient="linear(to-r, teal.300, pink.300)" bgClip="text">Zenlist</Text>
          </HStack>
          <HStack gap={3}>
            <Link href="/auth/signin" style={{ textDecoration: "none" }}>
              <Button variant="outline" colorScheme="whiteAlpha">Sign In</Button>
            </Link>
            <Link href="/auth/signup" style={{ textDecoration: "none" }}>
              <Button colorScheme="teal" variant="solid">Get Started</Button>
            </Link>
          </HStack>
        </Flex>
        <Stack direction={{ base: "column", lg: "row" }} gap={10} align="center" mb={12}>
          <VStack align="start" gap={6} maxW="xl">
            <Box px={4} py={2} borderRadius="full" borderColor="teal.400" borderWidth={1} bg="teal.400" opacity={0.1} fontSize="xs" fontWeight="semibold" textTransform="uppercase" color="teal.200">🎁 Gift Planning Reimagined</Box>
            <Heading as="h1" size="2xl" lineHeight="tight">
              <Text bgGradient="linear(to-r, teal.200, white, pink.200)" bgClip="text">Perfect gifts,</Text>
              <br />
              <Text bgGradient="linear(to-r, pink.200, white, teal.200)" bgClip="text">zero surprises.</Text>
            </Heading>
            <Text fontSize="lg" color="whiteAlpha.800">Organize family wishlists, mark purchases instantly, and keep surprises safe—all without spreadsheets or chaos.</Text>
            <HStack gap={4}>
              <Link href="/auth/signup" style={{ textDecoration: "none" }}>
                <Button colorScheme="teal" variant="solid">Start planning →</Button>
              </Link>
              <Link href="/auth/signin" style={{ textDecoration: "none" }}>
                <Button variant="outline" colorScheme="whiteAlpha">Sign in</Button>
              </Link>
            </HStack>
          </VStack>
          <Box display={{ base: "none", lg: "block" }} position="relative" h="420px">
            <Box position="absolute" left={6} top={4} w="64" borderRadius="3xl" borderColor="teal.400" borderWidth={1} bg="teal.400" opacity={0.1} p={6} color="white" shadow="2xl">
              <Text fontSize="3xl">👨‍👩‍👧‍👦</Text>
              <Heading mt={4} fontSize="lg" color="teal.100">Family Sync</Heading>
              <Text mt={1} fontSize="sm" color="teal.100" opacity={0.7}>One code, infinite wishlists.</Text>
            </Box>
            <Box position="absolute" left={20} top={24} w="72" borderRadius="3xl" borderColor="pink.400" borderWidth={1} bg="pink.400" opacity={0.1} p={7} color="white" shadow="2xl">
              <Text fontSize="4xl">🎁</Text>
              <Heading mt={4} fontSize="lg" color="pink.100">Smart Purchases</Heading>
              <Text mt={1} fontSize="sm" color="pink.100" opacity={0.7}>Mark gifts, keep secrets.</Text>
            </Box>
            <Box position="absolute" bottom={4} left={10} w="64" borderRadius="3xl" borderColor="blue.400" borderWidth={1} bg="blue.400" opacity={0.1} p={6} color="white" shadow="2xl">
              <Text fontSize="3xl">✨</Text>
              <Heading mt={4} fontSize="lg" color="blue.100">Beautiful Design</Heading>
              <Text mt={1} fontSize="sm" color="blue.100" opacity={0.7}>Simple, elegant, intuitive.</Text>
            </Box>
          </Box>
        </Stack>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={12}>
          <Box borderRadius="3xl" borderColor="teal.400" borderWidth={1} bg="teal.400" opacity={0.1} p={6} color="whiteAlpha.900" shadow="lg" transition="all 0.2s" _hover={{ transform: "translateY(-4px)" }}>
            <Text fontSize="3xl">👨‍👩‍👧‍👦</Text>
            <Heading mt={3} fontSize="lg">Instant Groups</Heading>
            <Text mt={2} fontSize="sm" color="whiteAlpha.700">Create or join with a single invite code.</Text>
          </Box>
          <Box borderRadius="3xl" borderColor="pink.400" borderWidth={1} bg="pink.400" opacity={0.1} p={6} color="whiteAlpha.900" shadow="lg" transition="all 0.2s" _hover={{ transform: "translateY(-4px)" }}>
            <Text fontSize="3xl">🎁</Text>
            <Heading mt={3} fontSize="lg">Smart Tracking</Heading>
            <Text mt={2} fontSize="sm" color="whiteAlpha.700">Mark purchases instantly, avoid duplicates.</Text>
          </Box>
          <Box borderRadius="3xl" borderColor="blue.400" borderWidth={1} bg="blue.400" opacity={0.1} p={6} color="whiteAlpha.900" shadow="lg" transition="all 0.2s" _hover={{ transform: "translateY(-4px)" }}>
            <Text fontSize="3xl">⚡</Text>
            <Heading mt={3} fontSize="lg">Self-Hosted</Heading>
            <Text mt={2} fontSize="sm" color="whiteAlpha.700">Your data stays on your server.</Text>
          </Box>
        </SimpleGrid>
        <Box mb={16} borderRadius="2.5rem" borderColor="whiteAlpha.200" borderWidth={1} bgGradient="linear(to-r, teal.500, whiteAlpha.200, pink.500)" p={10} textAlign="center" backdropFilter="blur(8px)">
          <Heading fontSize="3xl" fontWeight="black">Ready to simplify the holidays?</Heading>
          <Text mt={3} fontSize="sm" color="whiteAlpha.700">Stop worrying about duplicate gifts and manage your family's Christmas planning with elegance.</Text>
          <Link href="/auth/signup" style={{ textDecoration: "none" }}>
            <Button mt={6} colorScheme="teal" variant="solid" size="lg">Create your list today 🎄</Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
