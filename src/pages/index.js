import { Container, Card, Grid, Button } from 'semantic-ui-react';
import { useRouter } from 'next/router';

export default function HomePage({ tasks }) {

  const router = useRouter();

  if( tasks.length === 0 ) {
    return (
      <Grid centered verticalAlign="middle" columns="1" style={{ height: '80vh'}}>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1>There are not tasks yet</h1>
            <img src="https://img.freepik.com/free-vector/no-data-illustration-concept_108061-573.jpg?size=338&ext=jpg" alt="No tasks yet" />
            <div>
              <Button primary content="Create a new task" onClick={ () => router.push('/tasks/new')} />
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return (
    <Container style={{ padding: '20px'}}>
      <Card.Group itemsPerRow={ 4 }>
        {
          tasks.map((task) => (
            <Card key={ task._id }>
              <Card.Content textAlign="center">
                <Card.Header>{task.title}</Card.Header>
                <Card.Description>{task.description}</Card.Description>
              </Card.Content>
              <Card.Content extra textAlign="center">
                <div className='ui two buttons'>
                  <Button primary content="View" onClick={ () => router.push(`/tasks/${task._id}`)}/>
                  <Button color="green" content="Edit" onClick={ () => router.push(`/tasks/${task._id}/edit`)}/>
                </div>
              </Card.Content>
            </Card>
          ))
        }
      </Card.Group>
    </Container>
  )
}

export const getServerSideProps = async (ctx) => {

  const res = await fetch('http://localhost:3000/api/tasks');
  const tasks = await res.json();
  return {
    props: {
      tasks
    }
  };

}
