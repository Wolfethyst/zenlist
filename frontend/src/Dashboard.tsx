import { Box, Heading, SimpleGrid, VStack, Text, Tag, Button, Input, HStack, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";

function Dashboard({ user }: { user: { email: string } }) {
  // For demo, use email as user id. In production, use a real user id from backend.
  const userId = user.email;
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newFamilyName, setNewFamilyName] = useState("");
  const [error, setError] = useState("");
  const [joinFamilyId, setJoinFamilyId] = useState("");

  useEffect(() => {
    if (userId) {
      setLoading(true);
      fetch(`/api/families?userId=${encodeURIComponent(userId)}`)
        .then(res => res.json())
        .then(data => {
          setFamilies(data);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load families.");
          setLoading(false);
        });
    }
  }, [userId]);

  const createFamily = async () => {
    if (!userId) return;
    setLoading(true);
    setError("");
    const res = await fetch(`/api/families`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newFamilyName, owner_id: userId })
    });
    if (res.ok) {
      setNewFamilyName("");
      fetch(`/api/families?userId=${encodeURIComponent(userId)}`)
        .then(res => res.json())
        .then(data => setFamilies(data));
    } else {
      setError("Failed to create family.");
    }
    setLoading(false);
  };

  const joinFamily = async (familyId: number) => {
    if (!userId) return;
    setLoading(true);
    setError("");
    const res = await fetch(`/api/families/${familyId}/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId })
    });
    if (res.ok) {
      fetch(`/api/families?userId=${encodeURIComponent(userId)}`)
        .then(res => res.json())
        .then(data => setFamilies(data));
    } else {
      setError("Failed to join family.");
    }
    setLoading(false);
  };

  const leaveFamily = async (familyId: number) => {
    if (!userId) return;
    setLoading(true);
    setError("");
    const res = await fetch(`/api/families/${familyId}/leave`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId })
    });
    if (res.ok) {
      fetch(`/api/families?userId=${encodeURIComponent(userId)}`)
        .then(res => res.json())
        .then(data => setFamilies(data));
    } else {
      setError("Failed to leave family.");
    }
    setLoading(false);
  };

  const deleteFamily = async (familyId: number) => {
    if (!userId) return;
    setLoading(true);
    setError("");
    const res = await fetch(`/api/families/${familyId}`, {
      method: "DELETE"
    });
    if (res.ok) {
      fetch(`/api/families?userId=${encodeURIComponent(userId)}`)
        .then(res => res.json())
        .then(data => setFamilies(data));
    } else {
      setError("Failed to delete family.");
    }
    setLoading(false);
  };

  return (
    <Box maxW="4xl" mx="auto" mt={10} p={8} borderRadius="xl" bg="rgba(255,255,255,0.08)" boxShadow="lg">
      <Heading mb={6} color="white" fontSize="2xl" textAlign="center">Family Dashboard</Heading>
      {error && <Text color="red.300" mb={4}>{error}</Text>}
      {loading && <Spinner color="teal.300" mb={4} />}
      <Box mb={6}>
        <HStack>
          <Input placeholder="New family name" value={newFamilyName} onChange={e => setNewFamilyName(e.target.value)} color="white" bg="rgba(255,255,255,0.12)" />
          <Button colorScheme="teal" onClick={createFamily} isDisabled={!newFamilyName}>Create Family</Button>
        </HStack>
      </Box>
      {families.length === 0 ? (
        <Box>
          <Text color="whiteAlpha.800">No families yet. Create or join a family to get started!</Text>
          <HStack mt={4}>
            <Input placeholder="Enter Family ID to join" value={joinFamilyId} onChange={e => setJoinFamilyId(e.target.value)} color="white" bg="rgba(255,255,255,0.12)" />
            <Button colorScheme="teal" onClick={() => joinFamily(Number(joinFamilyId))} isDisabled={!joinFamilyId}>Join Family</Button>
          </HStack>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {families.map((fam: any) => (
            <VStack key={fam.id} bg="rgba(0,0,0,0.15)" borderRadius="lg" p={6} align="center" spacing={2} boxShadow="md">
              <Text fontWeight="bold" color="white" fontSize="lg">{fam.name}</Text>
              <Tag colorScheme="teal" fontSize="sm">Family ID: {fam.id}</Tag>
              <HStack>
                <Button colorScheme="teal" size="sm" onClick={() => leaveFamily(fam.id)}>Leave</Button>
                {/* Only allow delete if user is owner */}
                {fam.owner_id === userId && (
                  <Button colorScheme="red" size="sm" onClick={() => deleteFamily(fam.id)}>Delete</Button>
                )}
              </HStack>
            </VStack>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}

export default Dashboard;
