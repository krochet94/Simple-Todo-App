import { Button, Flex } from '@mantine/core';

const Header = (props) => {
    const { showAdd, setShowAdd } = props;
    return (
      <Flex   
        justify="space-between"
        direction="row"
        wrap="wrap"
        style={{paddingLeft: 30, paddingRight: 30, paddingBottom: 20}}
      >
        <h1>Simple To Do App</h1>
        <Button
            color="blue"
            onClick={()=>setShowAdd(!showAdd)}
          >
            Add
        </Button>
      </Flex>
    );
  };

export default Header;