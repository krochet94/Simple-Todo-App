import { Box, Flex } from '@mantine/core';
import { FaTrash, FaEdit } from "react-icons/fa";

const Task = (props) => {
    const { value, text, notes, classes, setId, setShowDelete, setShowUpdate} = props;
  return (
    <>
        <Box className={classes.wrapperBox}>
            <Flex   
                justify="space-between"
                direction="row"
                wrap="wrap">
                <div>
                    <h3>{text}</h3>
                    <h5>{notes}</h5>
                </div>
                <div>
                    <FaEdit color='blue' fontSize={'20px'} cursor='pointer' onClick={()=>{
                        setShowUpdate(true);
                        setId({value: value, text: text, notes: notes});
                    }}/><span>    </span>
                    <FaTrash color='red' fontSize={'18px'}  cursor='pointer' onClick={()=>{
                        setShowDelete(true);
                        setId(value);
                    }}/>
                </div>
            </Flex>
        </Box>
    </>
  );
};

export default Task;
