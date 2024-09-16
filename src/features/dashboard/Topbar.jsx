import { Box, Flex, Image, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'
import BackArrowIcon from '../../components/icons/BackArrowIcon'
import SearchIcon from '../../components/icons/SearchIcon'
import NotificationIcon from '../../components/icons/NotificationIcon'
import { useNavigate } from 'react-router-dom'

function Topbar({ title }) {
  const navigate = useNavigate();

  return (
    <Flex h={"109px"} p={"32px"} alignItems="center">
      <Flex  width="100%" alignItems="center" gap={"16px"} >
        <Box cursor={"pointer"} onClick={() => navigate(-1)}>
          <BackArrowIcon />
        </Box>
        <Text as={"h3"} fontSize={32} fontWeight={700}>{title}</Text>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <SearchIcon />
          </InputLeftElement>
          <Input w={"284px"} placeholder='Search' border={"1px solid grey"} />
        </InputGroup>
      </Flex>

      <Flex alignItems="center" gap={"16px"}>
        <NotificationIcon />
        <Image cursor={"pointer"} src={`${import.meta.env.PUBLIC_URL}/images/UserCircle.png`} alt='User Profile Image' />
      </Flex>
    </Flex>
  )
}

export default Topbar