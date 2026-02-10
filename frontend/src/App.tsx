import { Box, Heading, Text, Button, Stack, Container, SimpleGrid, Flex, VStack, HStack } from "@chakra-ui/react";
import DashboardPreview from "./DashboardPreview";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
// import SignIn from "./SignIn";
import { Dashboard } from "./Dashboard";
import { LogtoProvider, useHandleSignInCallback } from "@logto/react";

const logtoConfig = {
  endpoint: "https://z8v2lq.logto.app/", // Replace with your Logto endpoint
  appId: "42fbffgjplkn7zwpvgj9v", // Correct Logto appId
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

function Callback() {
  const { isLoading } = useHandleSignInCallback(() => {
    window.location.replace("/dashboard");
  });
  if (isLoading) return <div>Redirecting...</div>;
  return null;
}

import { useLogto } from "@logto/react";
function LandingPage() {
  const navigate = useNavigate();
  const { signIn, isAuthenticated, signOut } = useLogto();
  return (
    <Box minH="100vh" bgGradient="linear(135deg, #2e026d 0%, #15162c 50%, #06b6d4 100%)" color="white">
      <Container maxW="6xl" py={10}>
        <Flex justify="space-between" align="center" mb={8}>
          <HStack gap={3} fontWeight="black" fontSize="2xl">
            <span style={{ display: 'flex', alignItems: 'center', height: '2em' }}><ListIcon /></span>
            <Text bgGradient="linear(to-r, #10b981, #06b6d4)" bgClip="text">Zenlist</Text>
          </HStack>
          <HStack gap={3}>
            {isAuthenticated ? (
              <Button variant="outline" colorScheme="whiteAlpha" onClick={() => signOut("https://zenlist.site/")}>Sign Out</Button>
            ) : (
              <Button colorScheme="teal" variant="solid" onClick={() => signIn("https://zenlist.site/callback")}>Sign In</Button>
            )}
            <Button colorScheme="teal" variant="outline" onClick={() => navigate("/dashboard")}>Dashboard</Button>
          </HStack>
        </Flex>
        <Stack direction={{ base: "column", lg: "row" }} gap={10} align="center" mb={12}>
          <VStack align="start" gap={6} maxW="xl">
            <Box px={4} py={2} borderRadius="full" borderColor="#10b981" borderWidth={1} bg="rgba(16,185,129,0.15)" fontSize="xs" fontWeight="semibold" textTransform="uppercase" color="#10b981">🎁 GIFT PLANNING REIMAGINED</Box>
            <Heading as="h1" size="2xl" lineHeight="tight">
              <Text bgGradient="linear(to-r, #10b981, #06b6d4, #a21caf)" bgClip="text" lineHeight={1.1} pb={1} pr={1} style={{display:'inline-block',marginBottom:'-0.1em'}}>Perfect gifts,</Text>
              <Text bgGradient="linear(to-r, #a21caf, #06b6d4, #10b981)" bgClip="text" lineHeight={1.1} pt={0} mt={0} style={{display:'inline-block',marginLeft:'0.1em'}}>zero surprises.</Text>
            </Heading>
            <Text fontSize="lg" color="whiteAlpha.800">Organize family wishlists, mark purchases instantly, and keep surprises safe—all without spreadsheets or chaos.</Text>
            <HStack gap={4}>
              <Button colorScheme="teal" variant="solid" onClick={() => navigate("/dashboard")}>Start planning →</Button>
              {!isAuthenticated && (
                <Button variant="outline" colorScheme="whiteAlpha" onClick={() => signIn("https://zenlist.site/callback")}>Sign in</Button>
              )}
            </HStack>
          </VStack>
          <Box display={{ base: "none", lg: "block" }} position="relative" h="420px">
            <Box position="absolute" left={0} top={0} w="340px" h="180px" display="flex" alignItems="flex-start" justifyContent="flex-start">
              <DashboardPreview />
            </Box>
          </Box>
        </Stack>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={12}>
          <Box borderRadius="3xl" borderColor="#10b981" borderWidth={1} bg="rgba(16,185,129,0.25)" p={6} color="white" shadow="lg" transition="all 0.2s" _hover={{ transform: "translateY(-4px)" }}>
            <Text fontSize="3xl">👨‍👩‍👧‍👦</Text>
            <Heading mt={3} fontSize="lg" color="white">Instant Groups</Heading>
            <Text mt={2} fontSize="sm" color="white">Create or join family and friend wishlists in seconds.</Text>
          </Box>
          <Box borderRadius="3xl" borderColor="#a21caf" borderWidth={1} bg="rgba(162,28,175,0.25)" p={6} color="white" shadow="lg" transition="all 0.2s" _hover={{ transform: "translateY(-4px)" }}>
            <Text fontSize="3xl">🎁</Text>
            <Heading mt={3} fontSize="lg" color="white">Gift Progress</Heading>
            <Text mt={2} fontSize="sm" color="white">Track what’s bought, claimed, or still a surprise.</Text>
          </Box>
          <Box borderRadius="3xl" borderColor="#06b6d4" borderWidth={1} bg="rgba(6,182,212,0.25)" p={6} color="white" shadow="lg" transition="all 0.2s" _hover={{ transform: "translateY(-4px)" }}>
            <Text fontSize="3xl">✨</Text>
            <Heading mt={3} fontSize="lg" color="white">Effortless Sharing</Heading>
            <Text mt={2} fontSize="sm" color="white">Share lists securely—no logins or spreadsheets needed.</Text>
          </Box>
        </SimpleGrid>
        <Box mb={16} borderRadius="2.5rem" borderColor="whiteAlpha.200" borderWidth={1} bgGradient="linear(to-r, #10b981, #06b6d4, #a21caf)" p={10} textAlign="center" backdropFilter="blur(8px)">
          <Heading fontSize="3xl" fontWeight="black">Ready to simplify the holidays?</Heading>
          <Text mt={3} fontSize="sm" color="whiteAlpha.700">Stop worrying about duplicate gifts and manage your family's Christmas planning with elegance.</Text>
          <Button mt={6} colorScheme="teal" variant="solid" size="lg" onClick={() => navigate("/dashboard")}>Create your list today</Button>
        </Box>
      </Container>
    </Box>
  );
}
