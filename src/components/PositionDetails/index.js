import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { get } from '../../services';
import Form from 'react-bootstrap/Form';
import Label from 'react-bootstrap/Label';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const MainPage = (props) => {
    const [data, setData] = useState([]);
    const [position, setPosition] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            get('Position')
        ]).then(([resPosition]) => {
            setPosition(resPosition.data);
            setIsLoading(false);
        });
    }, []);
    return (
        <div>
            {isLoading || (
                <Card className="p-3 my-4">
                    <div>
                        <h2> Bolsa de Empleos </h2>
                    </div>
                    <Card className="p-2 my-8">
                        <Card>
                            <Form.Row>
                                <Label>{position.company}</Label>
                            </Form.Row>
                            <Form.Row>
                                <Label>{position.name}</Label>
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
                                data.length &&
                                <>
                                    <tbody>
                                        {
                                            position.aplicanJobs.map((applicant, index) =>
                                                <tr key={index}>
                                                    <td>{`${applicant.applicant.name} ${applicant.applicant.lastName}`}</td>
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
            )}
        </div>
    );
}

export default MainPage;