import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";

const BaseTable = () => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([
        {
            position: 'Gerente',
            enterprise: 'Altice',
            location: '27 febrero SD DN'
        }
    ]);

    useEffect(() => {
        (async function mounted() {

        })();
        return function cleanup() {
        };
    }, [])

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
                    setData.length > 0 &&
                    <>
                        <tbody>
                            {
                                data.map((job, index) =>
                                    <tr key={index}>
                                        <td>{job.position}</td>
                                        <td>{job.enterprise}</td>
                                        <td>{job.location}</td>
                                        <td>
                                            <Button className="bg-danger text-white" size="sm" 
                                            onClick={() => history.push("/applyjob")}>
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