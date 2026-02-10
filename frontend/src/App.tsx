import { Box, Heading, Text, Button, Stack, Container, SimpleGrid, Flex, VStack, HStack } from "@chakra-ui/react";
import DashboardPreview from "./DashboardPreview";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import SignIn from "./SignIn";
import Dashboard from "./Dashboard";
import { LogtoProvider, useHandleSignInCallback } from "@logto/react";

const logtoConfig = {
  endpoint: "https://z8v2lq.logto.app/", // Replace with your Logto endpoint
  appId: "42bffgiplkzn7zwpvgi9v", // Replace with your Logto appId
};
// Minimal list SVG icon
const ListIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <circle cx="4" cy="6" r="1.5" />
    <circle cx="4" cy="12" r="1.5" />
    <circle cx="4" cy="18" r="1.5" />
  </svg>
);

export default function App() {
  return (
    <LogtoProvider config={logtoConfig}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/callback" element={<Callback />} />
        </Routes>
      </Router>
    </LogtoProvider>
  );
}

function Callback() {
  const { isLoading } = useHandleSignInCallback(() => {
    window.location.replace("/dashboard");
  });
  if (isLoading) return <div>Redirecting...</div>;
  return null;
}

function LandingPage() {
  const navigate = useNavigate();
  return (
    <Box minH="100vh" bgGradient="linear(to-br, teal.900, purple.900, blue.900)" color="white">
      <Container maxW="6xl" py={10}>
        <Flex justify="space-between" align="center" mb={8}>
          <HStack gap={3} fontWeight="black" fontSize="2xl">
            <span style={{ display: 'flex', alignItems: 'center', height: '2em' }}><ListIcon /></span>
            <Text bgGradient="linear(to-r, teal.300, pink.300)" bgClip="text">Zenlist</Text>
          </HStack>
          <HStack gap={3}>
            <Button variant="outline" colorScheme="whiteAlpha" onClick={() => navigate("/signin")}>Sign In</Button>
            <Button colorScheme="teal" variant="solid" onClick={() => navigate("/dashboard")}>Get Started</Button>
          </HStack>
        </Flex>
        <Stack direction={{ base: "column", lg: "row" }} gap={10} align="center" mb={12}>
          <VStack align="start" gap={6} maxW="xl">
            <Box px={4} py={2} borderRadius="full" borderColor="teal.400" borderWidth={1} bg="rgba(45, 212, 191, 0.7)" fontSize="xs" fontWeight="semibold" textTransform="uppercase" color="teal.200">🎁 GIFT PLANNING REIMAGINED</Box>
            <Heading as="h1" size="2xl" lineHeight="tight">
              <Text bgGradient="linear(to-r, teal.200, white, pink.200)" bgClip="text" lineHeight={1.1} pb={1} pr={1} style={{display:'inline-block',marginBottom:'-0.1em'}}>Perfect gifts,</Text>
              <Text bgGradient="linear(to-r, pink.200, white, teal.200)" bgClip="text" lineHeight={1.1} pt={0} mt={0} style={{display:'inline-block',marginLeft:'0.1em'}}>zero surprises.</Text>
            </Heading>
            <Text fontSize="lg" color="whiteAlpha.800">Organize family wishlists, mark purchases instantly, and keep surprises safe—all without spreadsheets or chaos.</Text>
            <HStack gap={4}>
              <Button colorScheme="teal" variant="solid" onClick={() => navigate("/dashboard")}>Start planning →</Button>
              <Button variant="outline" colorScheme="whiteAlpha" onClick={() => navigate("/signin")}>Sign in</Button>
            </HStack>
          </VStack>
          <Box display={{ base: "none", lg: "block" }} position="relative" h="420px">
            <Box position="absolute" left={0} top={0} w="340px" h="180px" display="flex" alignItems="flex-start" justifyContent="flex-start">
              <DashboardPreview />
            </Box>
          </Box>
        </Stack>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={12}>
          <Box borderRadius="3xl" borderColor="teal.400" borderWidth={1} bg="rgba(45, 212, 191, 0.7)" p={6} color="white" shadow="lg" transition="all 0.2s" _hover={{ transform: "translateY(-4px)" }}>
            <Text fontSize="3xl">👨‍👩‍👧‍👦</Text>
            <Heading mt={3} fontSize="lg" color="white">Instant Groups</Heading>
            <Text mt={2} fontSize="sm" color="white">Create or join family and friend wishlists in seconds.</Text>
          </Box>
          <Box borderRadius="3xl" borderColor="pink.400" borderWidth={1} bg="rgba(244, 114, 182, 0.7)" p={6} color="white" shadow="lg" transition="all 0.2s" _hover={{ transform: "translateY(-4px)" }}>
            <Text fontSize="3xl">🎁</Text>
            <Heading mt={3} fontSize="lg" color="white">Gift Progress</Heading>
            <Text mt={2} fontSize="sm" color="white">Track what’s bought, claimed, or still a surprise.</Text>
          </Box>
          <Box borderRadius="3xl" borderColor="blue.400" borderWidth={1} bg="rgba(96, 165, 250, 0.7)" p={6} color="white" shadow="lg" transition="all 0.2s" _hover={{ transform: "translateY(-4px)" }}>
            <Text fontSize="3xl">✨</Text>
            <Heading mt={3} fontSize="lg" color="white">Effortless Sharing</Heading>
            <Text mt={2} fontSize="sm" color="white">Share lists securely—no logins or spreadsheets needed.</Text>
          </Box>
        </SimpleGrid>
        <Box mb={16} borderRadius="2.5rem" borderColor="whiteAlpha.200" borderWidth={1} bgGradient="linear(to-r, teal.500, whiteAlpha.200, pink.500)" p={10} textAlign="center" backdropFilter="blur(8px)">
          <Heading fontSize="3xl" fontWeight="black">Ready to simplify the holidays?</Heading>
          <Text mt={3} fontSize="sm" color="whiteAlpha.700">Stop worrying about duplicate gifts and manage your family's Christmas planning with elegance.</Text>
          <Button mt={6} colorScheme="teal" variant="solid" size="lg" onClick={() => navigate("/auth/signup")}><span style={{ display: 'inline-flex', alignItems: 'center', marginRight: 8 }}><ListIcon /></span>Create your list today</Button>
        </Box>
      </Container>
    </Box>
  );
}
