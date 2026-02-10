import { useState } from "react";
import { Box, Button, Input, VStack, Heading, Text } from "@chakra-ui/react";

export default function AuthForm({ onAuth }: { onAuth: (user: { email: string }) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "signup") {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });
        if (!res.ok) {
          const msg = await res.text();
          setError(msg || "Signup failed");
        } else {
          onAuth({ email });
        }
      } else {
        // TODO: Implement sign-in logic
        setError("Sign-in not yet implemented");
      }
    } catch (e) {
      setError("Network error");
    }
    setLoading(false);
  };

  return (
    <Box maxW="sm" mx="auto" mt={10} p={8} borderRadius="xl" bg="rgba(255,255,255,0.08)" boxShadow="lg">
      <Heading mb={6} color="white" fontSize="2xl" textAlign="center">
        {mode === "signup" ? "Sign Up" : "Sign In"}
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            color="white"
            bg="rgba(255,255,255,0.12)"
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            color="white"
            bg="rgba(255,255,255,0.12)"
          />
          {error && <Text color="red.300">{error}</Text>}
          <Button type="submit" colorScheme="teal" isLoading={loading}>
            {mode === "signup" ? "Sign Up" : "Sign In"}
          </Button>
          <Button
            variant="link"
            colorScheme="teal"
            onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
          >
            {mode === "signup" ? "Already have an account? Sign In" : "Need an account? Sign Up"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
