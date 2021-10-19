import { Grid, Form, Button } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const TaskFormPage = () => {

    const [newTask, setNewTask] = useState({
        title: "",
        description: ""
    });

    const [errors, setErrors] = useState({
        title: "",
        description: ""
    });

    const { query, push } = useRouter();

    const getTask = async () => {
        const { id } = query;
        const res = await fetch(`http://localhost:3000/api/tasks/${id}`);
        const task = await res.json();
        setNewTask({
            title: task.title,
            description: task.description
        });
    }

    useEffect(() => {
        if(query.id) getTask();
    }, []);

    const validate = () => {
        const errors = {};

        if(!newTask.title) errors.title = "titulo es requerido";

        if(!newTask.description) errors.description = "Descripción es requerido";

        return errors;
    }

    const handlerSubmitted = async (e) => {
        e.preventDefault();
        let errors = validate();

        if(Object.keys(errors).length) return setErrors(errors);

        if( query.id ) await updateTask();

        await  createTask();
        push("/");
    }

    const updateTask = async () => {
        try {
            await fetch(`http://localhost:3000/api/tasks/${query.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask)
            });
        } catch (error) {
            console.log(error);
        }
    }

    const createTask = async () => {
        try {
            await fetch('http://localhost:3000/api/tasks', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask)
            });
        } catch (error) {
            console.log(error);
        }
    }

    const handlerChanged = (e) => setNewTask({ ...newTask, [e.target.name]: e.target.value });

    return (
        <Grid 
            centered 
            verticalAlign="middle" 
            columns="3" 
            style={{ height: '80vh'}}
        >
            <Grid.Row>
                <Grid.Column textAlign="center">
                <h1>{ query.id ? 'Edit Task' : 'Create Task'}</h1>
                <Form onSubmit={ handlerSubmitted}>
                    <Form.Input 
                        placeholder="title" 
                        label="title" 
                        name="title" 
                        onChange={ handlerChanged }
                        error={ errors.title ? {content: errors.title, pointing: "below"} : null}
                        value={ newTask.title }
                    />
                    <Form.TextArea 
                        label="description" 
                        placeholder="description" 
                        name="description" 
                        onChange={ handlerChanged }
                        error={ errors.description ? {content: errors.description, pointing: "below"} : null}
                        value={ newTask.description }
                    />

                    <Button primary content="Submit" />
                </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default TaskFormPage;