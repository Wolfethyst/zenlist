import { Box, Heading, Input, Button, FormControl, FormLabel, VStack } from "@chakra-ui/react";

import { useLogto } from "@logto/react";

export default function SignIn() {
  const { signIn, signOut, isAuthenticated } = useLogto();
  return (
    <Box maxW="sm" mx="auto" mt={20} p={8} borderRadius="xl" bg="rgba(255,255,255,0.08)" boxShadow="lg">
      <Heading mb={6} color="white" fontSize="2xl" textAlign="center">Sign In</Heading>
      <VStack spacing={4}>
        {isAuthenticated ? (
          <Button colorScheme="teal" width="100%" onClick={() => signOut("https://zenlist.site/")}>Sign Out</Button>
        ) : (
          <Button colorScheme="teal" width="100%" onClick={() => signIn("https://zenlist.site/callback")}>Sign In with Logto</Button>
        )}
      </VStack>
    </Box>
  );
}
