import { Button, Paper, TextInput, Radio, Loader } from '@mantine/core';
import { FaSearch } from "react-icons/fa";

const FilterSort = (props) => {
    const { classes, sortVal, setSortVal, sort, searchVal, onSearch } = props;

    return (
    <Paper className={classes.wrapperFilterSort}>
        <TextInput className={classes.marginElements} 
            label="Search" 
            placeholder="Input keywords here" 
            rightSection={<FaSearch fontSize={'15px'} />}
            value={searchVal}
            onChange={(e) => {onSearch(e.target.value)}}
        />
        <Radio.Group
            className={classes.marginElements}
            value={sortVal}
            onChange={setSortVal}
            orientation="vertical"
            description="Select value"
            >
            <Radio value="asc" label="A-Z"/>
            <Radio value="desc" label="Z-A" />
        </Radio.Group>
        <Button className={classes.marginElements} color="dark" onClick={()=> sort()}>
            Sort
        </Button>
      </Paper>
    );
  };

export default FilterSort;