import { Grid, Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { useState } from 'react';

const SumadorFormPage = () => {

    const [values, setValues] = useState({
        valor1: 0,
        valor2: 0
    });

    const [result, setResult] = useState(0);

    const [errors, setErrors] = useState({
        valor1: "",
        valor2: ""
    });

    const validate = () => {
        const errors = {};

        if(!values.valor1) errors.valor1 = "valor1 es requerido";

        if(!values.valor2) errors.valor2 = "valor2 es requerido";

        return errors;
    }

    const createOperations = async () => {
        // try {
        //     await fetch('http://localhost:3000/api/operations', {
        //         method: 'POST',
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify(values)
        //     });
        // } catch (error) {
        //     console.log(error);
        // }
        axios.post('http://localhost:3000/api/operations', values)
          .then((response) => {
            setResult(response.data['sumar']);
          })
          .catch((error) => {
            console.log(error);
          });
    }

    const handlerSubmitted = async (e) => {
        e.preventDefault();
        let errors = validate();

        if(Object.keys(errors).length) return setErrors(errors);
        await createOperations();
        e.target.reset();
    }

    const handlerChanged = (e) => setValues({ ...values, [e.target.name]: e.target.value });
    return (
        <Grid 
            centered 
            verticalAlign="middle" 
            columns="3" 
            style={{ height: '80vh'}}
        >
            <Grid.Row>
                <Grid.Column textAlign="center">
                    <h1>Sumar</h1>
                    <Form onSubmit={ handlerSubmitted}>
                        <Form.Input 
                            placeholder="valor 1" 
                            label="numero" 
                            name="valor1" 
                            onChange={ handlerChanged }
                            error={ errors.valor1 ? {content: errors.valor1, pointing: "below"} : null}
                        />
                        <Form.Input 
                            placeholder="valor 2" 
                            label="numero" 
                            name="valor2" 
                            onChange={ handlerChanged }
                            error={ errors.valor1 ? {content: errors.valor2, pointing: "below"} : null}
                        />

                        <Button primary content="Submit" />
                    </Form>
                    <h2>El resultado es: { result }</h2>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default SumadorFormPage;