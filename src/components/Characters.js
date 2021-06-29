import React, { useState, useEffect } from 'react'
import { Container, Row, Button, Card, ListGroup, Form  } from 'react-bootstrap';

export const Characters = () => {

    const [ character, setCharacter ] = useState([]);

    const [ detail, setDetail ] = useState({});

    const [ input, setInput ] = useState("");

    useEffect(() => {
        getCharacters().then(results =>{setCharacter(results)})
        return () => {
            
        }
    }, [])

    const getCharacters = async (value='') => {
        const url = 'https://rickandmortyapi.com/api/character/';
        const res = await fetch(url);
        const data = await res.json();
        //console.log(data);
        const results = data.results;
        // const {results} = data;
        if(value !== '') {
            return results.filter((char) => char.name.toLowerCase().includes(value));
        }else {
            return results;
        }
    }

    const handleClick = (element) => {
        setDetail(element);
    }

    const handleChange = (e) => {
        setInput(e.target.value);
        setDetail([]);
    }

    const handleSubmit = (e) => {    
        e.preventDefault();
        const value = input.toLowerCase();
        getCharacters(value).then(results =>{setCharacter(results)})
    }

    return (
        <Container fluid>
            <Row className="align-items-center">
                <div className="col-6">
                    <h1>Personajes Rick and Morty</h1>
                </div>
                <div className="col-6">
                    <Form
                        onSubmit={handleSubmit}
                    >
                        <Row className="justify-content-between">
                            <div className="col-6">
                                <Form.Control 
                                    type="text"
                                    placeholder="Buscar"
                                    name="search"
                                    value={input}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-6">
                                <Button
                                    type="submit"
                                    variamt="success"
                                >Buscar</Button>
                            </div>
                        </Row>
                    </Form>
                </div>
            </Row>
            
            {
                // Se realizo un condicional ternario 
                detail.name ?
                <Row className="justify-content-center">
                    <Card style={{ width: '18rem' }} className="mx-2 my-2">
                        <Card.Img 
                            variant = "top"
                            src= {detail.image}
                            className= "mt-2"
                        />
                        <Card.Body>
                            <Card.Title>
                                {detail.name}
                            </Card.Title>
                        </Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Especie: {detail.species}</ListGroup.Item>
                            <ListGroup.Item>Género: {detail.gender}</ListGroup.Item>
                            <ListGroup.Item>Origen: {detail.origin.name}</ListGroup.Item>
                            <ListGroup.Item>Estado: {detail.status}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Row>
                : null
            }
                <Row>
            {
                character.map(char => (
                    <Card 
                        key={char.id}
                        style={{ width: '18rem' }} 
                        className="mx-2 my-2"
                    >
                    <Card.Img 
                        variant = "top"
                        src= {char.image}
                        className= "mt-2"
                    />
                    <Card.Body>
                        <Card.Title>
                            {char.name}
                        </Card.Title>
                    </Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Género: {char.gender}</ListGroup.Item>
                        <ListGroup.Item>Origen: {char.origin.name}</ListGroup.Item>
                        <ListGroup.Item>Estado: {char.status}</ListGroup.Item>
                    </ListGroup>
                    <Button 
                        variant="primary"
                        onClick={()=>{handleClick(char)}}
                        className= "mb-2"
                    >
                        Detalles
                    </Button>
                </Card>
                ))
            }
                </Row>
        </Container>
    )
}
