import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';


const BaseListSelect = ({ column, defaults = { show: true, value: '', display: 'Seleccione' }, title, name, handleChange, elements }) => {

    return (
        <>
            <Form.Group
                as={Col}
                md={column}
                controlId={name}
            >
                <Form.Label>
                    <b> {title} </b>
                </Form.Label>
                <Form.Control
                    as="select"
                    name={name}
                    onChange={handleChange}
                >
                    {defaults.show ?
                        (<option value={defaults.value}>{defaults.display}</option>)
                        : (<></>)
                    }
                    {elements.map(
                        (element) => (
                            <option
                                key={element.id}
                                value={element.id}
                            >
                                {element.name}
                            </option>
                        )
                    )}
                </Form.Control>
            </Form.Group>
        </>
    );
};


export default BaseListSelect;