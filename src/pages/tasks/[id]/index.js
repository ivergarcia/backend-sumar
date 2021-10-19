import { useState } from 'react';
import { Grid, Button, Container, Confirm } from 'semantic-ui-react';
import Error from 'next/error';
import { useRouter } from 'next/router';

export default function TaskDetail({ task, error }) {

    const [confirm, setConfirm] = useState(false);
    const { query, push } = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const open = () => setConfirm(true);
    const close = () => setConfirm(false);

    const deleteTask = async () => {
       const { id } = query;
       try {
           await fetch(`http://localhost:3000/api/tasks/${id}`, {
               method: 'DELETE'
           });
       } catch (error) {
           console.log(error);
       }
    }

    const handleDelete = () => {
        setIsDeleting(true);
        deleteTask();
        close();
        push('/');
    }

    if( error && error.statusCode ) return <Error statusCode={error.statusCode} title={error.statusText} />
    return (
        <Grid
            centered 
            verticalAlign="middle" 
            columns="3" 
            style={{ height: '80vh'}}
        >
            <Grid.Row>
                <Grid.Column textAlign="center">
                    <h1>{ task.title }</h1>
                    <p>{ task.description }</p>
                    <Container>
                        <Button color="red" content="Delete" onClick={ open } loading={ isDeleting }/>
                    </Container>
                </Grid.Column>
            </Grid.Row>
            <Confirm
                header="Please confirm"
                content="Are you sure you want to delete"
                open={ confirm }
                onConfirm={ handleDelete }
                onCancel={ close }
            />
        </Grid>
    )
}

export const getServerSideProps = async ({ query: { id } }) => {

    const res = await fetch(`http://localhost:3000/api/tasks/${ id }`);
    if(res.status === 200) {
        const task = await res.json();
        return {
            props: {
                task
            }
        }
    }

    return {
      props: {
        error : {
            statusCode : res.status,
            statusText : "Invalid Id"
        }
      }
    };
  
  }