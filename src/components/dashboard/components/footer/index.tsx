import { Flex } from "@mantine/core";

const Footer = () => {
  return (
    <Flex justify={"space-between"} p="1rem" mt={"-0.7rem"}>
      <Flex gap={"2rem"}>
        <div>Install</div>
        <div>Integrate with your existing system</div>
        <div>Customize</div>
        <div>Talk to us</div>
      </Flex>
      <Flex style={{ fontWeight: 600 }}>&copy; 2024 NEN International</Flex>
    </Flex>
  );
};

export default Footer;
