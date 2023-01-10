import { useState } from "react";
import { TextInput, Paper, Button, Textarea, Flex } from '@mantine/core';

const UpdateTask = (props) => {
  const {onUpdate, classes, setShowUpdate, updateTask, val, setVal} = props;
  const [error, setError] = useState(false);

  return (
    <>
      <Paper className={classes.wrapperAddTask}>
        <TextInput 
            className={classes.marginElements}
            placeholder="Update Task"
            label="Task"
            value={val.text}
            onChange={(e) => setVal({ ...val, text: e.target.value})}
          />
          <Textarea
            className={classes.marginElements}
            placeholder="Notes"
            label="Update Notes"
            value={val.notes}
            onChange={(e) => setVal({ ...val, notes: e.target.value})}
          />
          <Flex
            className={classes.marginElements}   
            justify="space-around"
            direction="row"
            wrap="wrap">
                <Button
                    color="blue"
                    onClick={()=>updateTask()}
                >
                    Save Task
                </Button>
                <Button
                    color="dark"
                    onClick={()=>setShowUpdate(false)}
                >
                    Cancel
                </Button>
        </Flex>
        </Paper>
    </>
  );
};

export default UpdateTask;
