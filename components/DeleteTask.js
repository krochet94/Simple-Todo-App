import { Text, Paper, Button, Flex } from '@mantine/core';

const DeleteTask = (props) => {
    const {deleteTask, classes, setShowDelete} = props;
  return (
      <Paper className={classes.wrapperAddTask}>
        <Text fz="xl" className={classes.marginElements}>Are you sure you want to delete?</Text>
        <Flex
            className={classes.marginElements}   
            justify="space-around"
            direction="row"
            wrap="wrap">
                <Button
                    color="red"
                    onClick={()=>deleteTask()}
                >
                    Yes
                </Button>
                <Button
                    color="dark"
                    onClick={()=>setShowDelete(false)}
                >
                    Cancel
                </Button>
        </Flex>
      </Paper>
  );
};

export default DeleteTask;
