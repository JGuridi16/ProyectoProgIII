import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { get } from '../../services';

const MainPage = (props) => {
    const today = new Date();
    const [user,setUser] = useState({});
    const [position,setPosition] = useState({});

    useEffect(() => {
        (async function mounted() {
            setIsLoading(true);
            Promise.all([
                get('Position'), get(`User/${props.userId}`)
            ]).then(([resPosition, resUser]) => {
                setPosition(resPosition.data);
                setUser(resUser.data);
            });
        })();
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
                            <Label>{position[company]}</Label>
                    </Form.Row>
                    <Form.Row>
                            <Label>{position[name]}</Label>
                    </Form.Row>
                </Card>
                <Table>
                <thead>
                    <tr>
                        <th>Aplicantes</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                {
                    setData.length > 0 &&
                    <>
                        <tbody>
                            {
                                position.aplicanJobs.map((applicant, index) => 
                                    <tr key={index}>
                                        <td>{ `${applicant.applicant.name} ${applicant.applicant.lastName}` }</td>
                                        <td>
                                            <NavLink
                                                to={applicant.applicant.documentUrl}
                                            >
                                                <Button variant="info" size="sm">Ver aplicantes</Button>{' '}
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