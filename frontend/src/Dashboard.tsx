import { Box, Heading, SimpleGrid, VStack, Text, Tag, Button } from "@chakra-ui/react";
import { useState } from "react";

type Member = {
  name: string;
  lists: string[];
};

const familyMembers: Member[] = [
  { name: "Alex", lists: ["Alex's Birthday", "Alex's Christmas"] },
  { name: "Jamie", lists: ["Jamie's Christmas"] },
  { name: "Taylor", lists: ["Taylor's Birthday", "Taylor's Christmas", "Taylor's Graduation"] },
  { name: "Morgan", lists: ["Morgan's Christmas"] },
];

export default function Dashboard() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  return (
    <Box maxW="4xl" mx="auto" mt={10} p={8} borderRadius="xl" bg="rgba(255,255,255,0.08)" boxShadow="lg">
      <Heading mb={6} color="white" fontSize="2xl" textAlign="center">Family Dashboard</Heading>
      {!selectedMember ? (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {familyMembers.map((member) => (
            <VStack key={member.name} bg="rgba(0,0,0,0.15)" borderRadius="lg" p={6} align="center" spacing={2} boxShadow="md">
              <Text fontWeight="bold" color="white" fontSize="lg">{member.name}</Text>
              <Tag colorScheme="teal" fontSize="sm">{member.lists.length} lists</Tag>
              <Button colorScheme="teal" size="sm" onClick={() => setSelectedMember(member)}>View Lists</Button>
            </VStack>
          ))}
        </SimpleGrid>
      ) : (
        <VStack spacing={4} align="center">
          <Heading color="white" fontSize="xl">{selectedMember.name}'s Lists</Heading>
          {selectedMember.lists.map((list) => (
            <Box key={list} bg="whiteAlpha.200" color="white" borderRadius="md" p={4} w="100%" textAlign="center">
              {list}
            </Box>
          ))}
          <Button colorScheme="teal" variant="outline" onClick={() => setSelectedMember(null)}>Back to Family</Button>
        </VStack>
      )}
    </Box>
  );
}
