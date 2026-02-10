import { Box, Heading, SimpleGrid, VStack, Text, Tag, Button, Input, HStack, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useLogto } from "@logto/react";

function Dashboard() {
  const { isAuthenticated, userInfo } = useLogto();
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newFamilyName, setNewFamilyName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated && userInfo?.sub) {
      // Create user in D1 if not exists
      fetch(`/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sub: userInfo.sub, email: userInfo.email })
      });
      setLoading(true);
      fetch(`/api/families?userId=${userInfo.sub}`)
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
  }, [isAuthenticated, userInfo]);

  const createFamily = async () => {
    if (!userInfo?.sub) return;
    setLoading(true);
    setError("");
    const res = await fetch(`/api/families`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newFamilyName, owner_id: userInfo.sub })
    });
    if (res.ok) {
      setNewFamilyName("");
      // Refresh families
      fetch(`/api/families?userId=${userInfo.sub}`)
        .then(res => res.json())
        .then(data => setFamilies(data));
    } else {
      setError("Failed to create family.");
    }
    setLoading(false);
  };

  const [joinFamilyId, setJoinFamilyId] = useState("");
  const joinFamily = async (familyId: number) => {
    if (!userInfo?.sub) return;
    setLoading(true);
    setError("");
    const res = await fetch(`/api/families/${familyId}/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userInfo.sub })
    });
    if (res.ok) {
      fetch(`/api/families?userId=${userInfo.sub}`)
        .then(res => res.json())
        .then(data => setFamilies(data));
    } else {
      setError("Failed to join family.");
    }
    setLoading(false);
  };

  const leaveFamily = async (familyId: number) => {
    if (!userInfo?.sub) return;
    setLoading(true);
    setError("");
    const res = await fetch(`/api/families/${familyId}/leave`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userInfo.sub })
    });
    if (res.ok) {
      fetch(`/api/families?userId=${userInfo.sub}`)
        .then(res => res.json())
        .then(data => setFamilies(data));
    } else {
      setError("Failed to leave family.");
    }
    setLoading(false);
  };

  const deleteFamily = async (familyId: number) => {
    if (!userInfo?.sub) return;
    setLoading(true);
    setError("");
    const res = await fetch(`/api/families/${familyId}`, {
      method: "DELETE"
    });
    if (res.ok) {
      fetch(`/api/families?userId=${userInfo.sub}`)
        .then(res => res.json())
        .then(data => setFamilies(data));
    } else {
      setError("Failed to delete family.");
    }
    setLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <Box maxW="4xl" mx="auto" mt={10} p={8} borderRadius="xl" bg="rgba(255,255,255,0.08)" boxShadow="lg">
        <Heading mb={6} color="white" fontSize="2xl" textAlign="center">Family Dashboard</Heading>
        <Box textAlign="center" color="whiteAlpha.800" fontSize="lg">
          <p>Please sign in to manage your families.</p>
        </Box>
      </Box>
    );
  }

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
                {fam.owner_id === userInfo?.sub && (
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
