import { Menu, Container, Button } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const Navbar = () => {

    const router = useRouter();

    return (
        <Menu inverted borderless attached>
            <Container>
                <Menu.Item>
                    <Link href="/">
                        <img src="/favicon.ico" alt="logo" />
                    </Link>
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Button primary size="mini" content="New Task" onClick={ () => router.push("/tasks/new")} />
                    </Menu.Item>
                    <Menu.Item>
                        <Button primary size="mini" content="Sumar" onClick={ () => router.push("/operations/new")} />
                    </Menu.Item>
                </Menu.Menu>
            </Container>
        </Menu>
    )
}
