import { Box, Heading, Text, VStack, HStack, Tag, SimpleGrid, Divider } from "@chakra-ui/react";

const familyMembers = [
  { name: "Alex", role: "Parent" },
  { name: "Jamie", role: "Parent" },
  { name: "Taylor", role: "Child" },
  { name: "Morgan", role: "Child" },
];

const gifts = [
  { item: "LEGO Set", status: "Purchased", by: "Alex" },
  { item: "Headphones", status: "Purchased", by: "Jamie" },
  { item: "Book", status: "", by: null },
];

export default function DashboardPreview() {
  return (
    <Box bg="rgba(255,255,255,0.08)" borderRadius="2xl" p={8} boxShadow="xl" maxW="lg" mx="auto" display="flex" flexDirection="column" alignItems="center">
      <Heading fontSize="xl" mb={4} color="white" textAlign="center">Family Members</Heading>
      <HStack spacing={6} mb={6} justify="center">
        {familyMembers.map((member) => (
          <VStack key={member.name} spacing={1} align="center">
            <Text fontWeight="bold" color="white" fontSize="md">{member.name}</Text>
            <Tag colorScheme="teal" fontSize="xs">{member.role}</Tag>
          </VStack>
        ))}
      </HStack>
      <Divider borderColor="whiteAlpha.400" mb={6} />
      <Heading fontSize="xl" mb={4} color="white" textAlign="center">Gift List</Heading>
      <SimpleGrid columns={1} spacing={3} w="100%">
        {gifts.map((gift) => (
          <Box key={gift.item} bg="rgba(0,0,0,0.15)" borderRadius="lg" p={4} display="flex" alignItems="center" justifyContent="space-between">
            <Text color="white" fontWeight="semibold">{gift.item}</Text>
            <HStack>
              {gift.status === "Purchased" && <Tag colorScheme="green" fontSize="xs">Purchased</Tag>}
              {gift.by && gift.status === "Purchased" && <Text color="whiteAlpha.700" fontSize="xs">by {gift.by}</Text>}
            </HStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
