import { useState } from "react";
import { TextInput, Paper, Button, Textarea, Center, Modal, Loader } from '@mantine/core';

const AddTask = (props) => {
  const {onAdd, classes} = props;
  const [text, setText] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(false);

  // Submit Task
  const onSubmit = async () => {
    if (!text || !notes || notes==='' || text==='') {
      setError(true);
      return;
    }
    await onAdd({ text, notes });
    setText("");
    setNotes("");
  };

  return (
    <>
      <Paper className={classes.wrapperAddTask}>
        <TextInput 
            className={classes.marginElements}
            placeholder="Add Task"
            label="Task"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Textarea
            className={classes.marginElements}
            placeholder="Notes"
            label="Add Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <Center>
            <Button className={classes.marginElements} color="blue" onClick={()=> onSubmit()}>
              Save Task
            </Button>
          </Center>
      </Paper>
      <Modal
        withCloseButton={false}
        centered 
        opened={error}
        onClose={() => setError(false)}
        >
          <Center>Please input value</Center>
      </Modal>
    </>
  );
};

export default AddTask;
