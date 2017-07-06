import React, { Component } from 'react';
import { Container, Header, Title, Button, Left, Right, Body, Icon } from 'react-native';

export default class HeaderChat extends Component {
    render() {
    const { leftIcon, rightIcon, title } =  this.props
    return (
        <Container>
            <Header>
                <Left>
                    <Button transparent>
                        <Icon name={leftIcon} />
                    </Button>
                </Left>
                <Body>
                    <Title>{title}</Title>
                </Body>
            </Header>
        </Container>
        )
    }
}