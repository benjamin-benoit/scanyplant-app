import React from 'react';
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import { View } from 'react-native';


export default function LoginScreen({ navigation }) {

    return (
        <View>
            <Card>
                <Card.Content>
                    <Title>Card title</Title>
                    <Paragraph>Card content</Paragraph>
                </Card.Content>

                <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Login</Button>
                </Card.Actions>
            </Card>
            <Button
                onPress={() => navigation.navigate('Register')}>
                Register
            </Button>
        </View>
    );
}
