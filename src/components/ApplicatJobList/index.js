import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { get } from '../../services';

const MainPage = (props) => {
    const today = new Date();
    const [user,setUser] = useState({});
    const [position,setPosition] = useState({});

    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            get('Position'), get(`User/${props.userId}`)
        ]).then(([resPosition, resUser]) => {
            setPosition(resPosition.data);
            setUser(resUser.data);
        });
    }, []);
    
    return (
      <div>
        <Card className="p-3 my-4">
            <div>
                <h2> Bolsa de Empleos </h2>
            </div>
            <Card className="p-2 my-8">
                <Card>
                    <Form.Row>
                            <Label>{user[name] + ' ' + user[lastName]}</Label>
                    </Form.Row>
                    <Form.Row>
                            <Label>{user[email]}</Label>
                    </Form.Row>
                </Card>
                <Table>
                <thead>
                    <tr>
                        <th>Puesto</th>
                        <th>Empresa</th>
                        <th>Numero de Aplicantes</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                {
                    setData.length > 0 &&
                    <>
                        <tbody>
                            {
                                position.map((position, index) => 
                                    <tr key={index}>
                                        <td>{ position.name }</td>
                                        <td>{ position.company }</td>
                                        <td>{ position.aplicanJobs.length }</td>
                                        <td>
                                            <NavLink
                                                to={"/postionDetails/"+position.id}
                                            >
                                                <Button variant="info" onClick={} size="sm">Ver aplicantes</Button>{' '}
                                            </NavLink>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </> 
                }
            </Table>
            </Card>
        </Card>
      </div>
    );
  }

  export default MainPage;