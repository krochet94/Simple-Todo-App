import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, writeBatch, deleteField } from "firebase/firestore";
import { Paper, createStyles, Loader, Modal, Center } from '@mantine/core';
import Header from '../components/Header';
import AddTask from '../components/AddTask';
import FilterSort from '../components/FilterSort';
import Task from '../components/Task';
import DeleteTask from '../components/DeleteTask';
import UpdateTask from '../components/UpdateTask';
import Footer from '../components/Footer';

const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    maxWidth: 600,
    width: '95%',
    height: 'auto',
    display: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 100,
    marginBottom: 100,
    padding: 30
  },
  wrapperAddTask: {
    width: '90%',
    display: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
    height: '100%',
    backgroundColor: '#F4F4F4'
  },
  wrapperFilterSort: {
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
    height: '100%',
    backgroundColor: '#F4F4F4'
  },
  wrapperBox: {
    width: '90%',
    display: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
    height: '100%',
    backgroundColor: '#F4F4F4'
  },
  marginElements: {
    margin: 10
  },
  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    marginBottom: 20,
  },
  socialIcons:{
    fontSize: '20px',
    display: 'inline',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icons: {
    display: 'inline',
    marginLeft: '5px',
    marginRight: '5px'
  }
}));


export default function Home() {
  const [todos, setTodos] = useState();
  const [todosArr, setTodosArr] = useState();
  const [filteredTodosArr, setFilteredTodosArr] = useState();
  const [id, setId] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [sortVal, setSortVal] = useState('asc');
  const [searchVal, setSearchVal] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const { classes } = useStyles();

  const getTodoList = async () => {
    const todoList = (await getDoc(doc(db, "task-tracker", "tasks"))).data();
    setTodos(todoList);
    let arrTemp= Object.values(todoList).map(({text})=> text)
    setTodosArr(arrTemp);
    let arrTempRef = [];
    let obj = {...todoList}
    arrTemp.map(data => {
      Object.entries(obj).map(([key, val])=>{
        if (val.text === data) {
          arrTempRef.push({key: key, text: val.text, notes: val.notes});
          delete obj[key];
        }
      })
    });
    setFilteredTodosArr(arrTempRef)
    console.log(todoList);
    setLoading(false);
  }

  const onAdd = async (data) => {
    try{
      setShowAdd(false);
      setLoading(true);
      const date = Date.now();
      const batch = writeBatch(db);
      batch.update(doc(db, "task-tracker", "tasks"), {
        [`${date}.text`]: data.text,
        [`${date}.notes`]: data.notes,
      });
      await batch.commit();
    } catch {
      setError(true);
      setErrorMessage('Add task failed')
    } finally{
      await getTodoList();
    }
  }

  const deleteTask = async () => {
    try{
      setShowDelete(false);
      setLoading(true);
      if (id) {
        const batch = writeBatch(db);
        batch.update(doc(db, "task-tracker", "tasks"), {
          [id]: deleteField()
        });
        await batch.commit();
      }
    } catch(e) {
      setError(true);
      setErrorMessage('Delete task failed');
      console.log(e);
    } finally{
      setId('');
      await getTodoList();
    }
  }

  const updateTask = async () => {
    if (!id.text || !id.notes || id.notes==='' || id.text==='') {
      setError(true);
      setErrorMessage('Please input value');
      return;
    }
    try{
      setShowUpdate(false);
      setLoading(true);
      const batch = writeBatch(db);
      batch.update(doc(db, "task-tracker", "tasks"), {
        [`${id.value}.text`]: id.text,
        [`${id.value}.notes`]: id.notes,
      });
      await batch.commit();
    } catch {
      setError(true);
      setErrorMessage('Update task failed')
    } finally{
      await getTodoList();
    }
  }

  const sort = () => {
    let arrayTodo = [...todosArr];
    let tempObj = {...todos};
    let filterArr= [];
    if (sortVal === 'asc')arrayTodo.sort();
    else if (sortVal === 'desc') arrayTodo.sort().reverse();
    arrayTodo.map(data => {
      Object.entries(tempObj).map(([key, val])=>{
        if (val.text === data) {
          filterArr.push({key: key, text: val.text, notes: val.notes});
          delete tempObj[key];
        }
      })
    });
    setFilteredTodosArr(filterArr);
  }

  const onSearch = (e) => {
    setSearchVal(e);
    let arrTemp = []
    let regex = new RegExp(e.toLowerCase(),"g");
    Object.values(todos).map(({text})=>{
      let match = (text.toLowerCase()).match(regex);
      if (match !== null) {
        arrTemp.push(text);
        return;
      }
    })
    setTodosArr(arrTemp);
    let arrTempRef = [];
    let obj = {...todos}
    arrTemp.map(data => {
      Object.entries(obj).map(([key, val])=>{
        if (val.text === data) {
          arrTempRef.push({key: key, text: val.text, notes: val.notes});
          delete obj[key];
        }
      })
    });
    setFilteredTodosArr(arrTempRef);
  }

  useEffect(() => {
    setLoading(true)
    getTodoList();
  }, []);

  return (
    <>
      <Head>
        <title>Simple Todo App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Paper className={classes.wrapper}>
        {loading ? <Loader className={classes.loader}/> : 
        (<>
          <Header showAdd={showAdd} setShowAdd={setShowAdd}/>
          <FilterSort classes={classes} sortVal={sortVal} setSortVal={setSortVal} sort={sort} searchVal={searchVal} onSearch={onSearch}/>
          {filteredTodosArr && filteredTodosArr.map((data) => {
            return (<Task classes={classes} text={data.text} notes={data.notes} key={data.key} value={data.key} setId={setId} setShowDelete={setShowDelete} setShowUpdate={setShowUpdate}/>);
          })}
        </>
        )}
        <Footer classes={classes}/>
      </Paper>
      <Modal
        opened={showAdd}
        onClose={() => setShowAdd(false)}
        title="Add Task"
        centered
      >
        <AddTask classes={classes} onAdd={onAdd}/>
      </Modal>
      <Modal
        opened={showDelete}
        onClose={() => setShowDelete(false)}
        title="Delete Task"
        centered
      >
        <DeleteTask classes={classes} setShowDelete={setShowDelete} deleteTask={deleteTask}/>
      </Modal>
      <Modal
        opened={showUpdate}
        onClose={() => setShowUpdate(false)}
        title="Update Task"
        centered
      >
        <UpdateTask classes={classes} setShowUpdate={setShowUpdate} updateTask={updateTask} val={id} setVal={setId}/>
      </Modal>
      <Modal
        withCloseButton={false}
        centered 
        opened={error}
        onClose={() => setError(false)}
        >
          <Center>{errorMessage}</Center>
      </Modal>
    </>
  )
}
