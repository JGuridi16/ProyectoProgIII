import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";

const BaseTable = ({data}) => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>Posición</th>
                        <th>Empresa</th>
                        <th>Ubicación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                {
                    <>
                        <tbody>
                            {
                                data.map((job, index) =>
                                    <tr key={index}>
                                        <td>{job.name}</td>
                                        <td>{job.company}</td>
                                        <td>{job.location}</td>
                                        <td>
                                            <Button className="bg-danger text-white" size="sm" 
                                            onClick={() => history.push("/applyjob/" + job.id)}>
                                                Aplicar</Button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </>
                }
            </Table>
        </>
    );
};

export default BaseTable;