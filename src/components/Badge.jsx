import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

function Badge({ status }) {
  return (
    <Flex
      p="9px"
      h={"26px"}
      borderRadius={"40px"}
      justifyContent={"center"}
      alignItems={"center"}
      backgroundColor={status === 'active' ? '#DCFCE7' : '#FEF9C3'}
    >
      <Box background={status === 'active' ? "#22C55E" : "#FACC15"} w={"8px"} h={"8px"} borderRadius={"50%"} mr={"8px"}>
      </Box>
      <Text textTransform={"capitalize"} fontSize={"12px"} fontWeight={700} color={status === 'active' ? "#14532D" : "#713F12"} >
        {status}
      </Text>
    </Flex>
  )
}

export default Badge