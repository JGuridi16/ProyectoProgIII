import React, { useEffect, useState, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Form } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import Col from 'react-bootstrap/Col';
import DragDropFileInline from '../DragDropFileInLine'; 
import { get } from '../../services';

let yup = require('yup');


const PostJob = (props) => {
    const formRef = useRef();
    const [formikSchema, setFormikSchema] = useState({});
    const [hasUrl, setHasUrl] = useState(true);
    const [position, setPosition] = useState({
        logo: 'https://i0.wp.com/hipertextual.com/wp-content/uploads/2019/05/hipertextual-avengers-endgame-futuro-capitan-america-2019781893-scaled.jpg?fit=1200%2C750&ssl=1',
        company: 'Capitan Maricon',
        description: 'El método find no transforma el array desde el cual es llamado, pero la función proporcionada en callback sí. En ese caso, los elementos procesados por find son establecidos antes de la primera invocación de callback. Por lo tanto:',
        location: 'en mi casa',
        url: 'www.facebook.com',
        email: 'abreugabriel237@gmail.com'
    });
    const [formContent, setFormContent] = useState({
        file: ''
    });
    const [basicSchema, setBasicSchema] = useState({
        file: yup.string().required('Debe seleccionar un archivo'),
    });
    const updateFormik = (schema) => setFormikSchema(() => {
        return yup.object(schema);
    });
    useEffect(() => {
        (async function mounted() {
            updateFormik(basicSchema);

        })();
    }, []);
    const onFormSubmitted = () => {
        
    }

    const openLink = (url) =>{
        window.open(url, "_blank");
    }

    const [contractTypes, setContractTypes] = useState([]);

    const fileRef = useRef({});
    return (
            <>
                <Formik
                innerRef={formRef}
                validationSchema={formikSchema}
                onSubmit={onFormSubmitted}
                initialValues={formContent}
                enableReinitialize={true}
                validateOnChange={false}
                validateOnBlur={false}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        touched,
                        errors,
                        setFieldValue
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <Card className="p-3 mb-4">
                                <div className="mb-35 space-between-container">
                                    <div className="mb-35 space-container">
                                        <Image width="96" height="65" src={position.logo} rounded />
                                        <h2 className="is-bold">
                                            <b>{position.company}</b>
                                        </h2>
                                    </div>
                                    <Form.Label> <b> Tipo de contrato: </b>  Klk </Form.Label>
                                </div>
                                <Card className="p-3 my-4">
                                    <Form.Row className="my-3">
                                    <Form.Group as={Col} md="12" controlId="postDescription">
                                        
                                        <Form.Label>
                                                <b> Descripcion de Puesto </b>
                                        </Form.Label>
                                        <p> {position.description} </p>
                                        
                                        <Form.Label>
                                                <b> Ubicación </b>
                                            </Form.Label>
                                        <p> {position.location} </p>
                                        <Form.Label>
                                                <b> Como Aplicar </b>
                                            </Form.Label>
                                                <p> 
                                                    Enviar un correo directo a {position.email} o entre la pagina web: <a onClick={() => openLink(position.url) }>Click Aqui</a>
                                                </p>
                                                
                                            
                                    </Form.Group>
                                    </Form.Row>
                                </Card>
                                <Card className="p-3 my-4">
                                    <Form.Row className="my-3">
                                    <Form.Group
                                            as={Col}
                                            md={6}
                                            controlId="file"
                                        >
                                            <Form.Label>
                                                <b> Añadir Curriculum Vitae </b>
                                            </Form.Label>
                                            <DragDropFileInline
                                                id="file"
                                                name="file"
                                                innerRef={fileRef}
                                                errors={errors}
                                                touched={touched}
                                                setFieldValue={setFieldValue}
                                            />
                                    </Form.Group>

                                    
                                    </Form.Row>
                                </Card>
                                <Form.Group className="my-3 d-flex justify-content-end align-items-end" as={Col} md="12">
                                    <Button size="md" type="submit">Guardar</Button>
                                </Form.Group>
                            </Card>
                        </Form>
                    )}
                </Formik>
        </>
    );
  }

  export default PostJob;