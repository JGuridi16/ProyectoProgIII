import React, { useEffect, useState, useRef } from 'react';
import BaseTable from '../BaseTable';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import BaseListSelect from '../BaseSelect';
import { Form } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import Col from 'react-bootstrap/Col';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';

let yup = require('yup');


const PostJob = () => {
    const [categories, setCategories] = useState([
        {
            id : 1,
            value: "Informatica"
        },
        {
            id : 2,
            value: "Ganaderia"
        }
    ]);
    const [enterprises, setEnterprises] = useState([
        {
            id : 1,
            value: "Solvex"
        },
        {
            id : 2,
            value: "Argentum"
        },
        {
            id : 3,
            value: "Claro"
        },
        {
            id : 4,
            value: "Altice"
        }
    ]);
    const formRef = useRef();
    const [formikSchema, setFormikSchema] = useState({});
    const [formContent, setFormContent] = useState({
        postName: '',
        postDescription: '',
        categoryId: '',
        enterpriseId: ''
    });
    const [basicSchema, setBasicSchema] = useState({
        postName: yup.string().required('El campo Nombre de Puesto es requerido'),
        postDescription: yup.string().required('El campo Descripción de Puesto es requerido'),
        categoryId: yup.string().required('El campo Categoria es requerido'),
        enterpriseId: yup.string().required('El campo Empresa es requerido')
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
        alert("Se guardo el puesto de trabajo categoria");
    }
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
                        errors
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <Card className="p-3 mb-4">
                                <div className="mb-35 space-between-container">
                                    <h2 className="is-bold">
                                        Crear puesto de trabajo
                                    </h2>
                                </div>
                                <Form.Row>
                                    <Form.Group as={Col} md="6" controlId="postName">
                                        <Form.Label> <b> Nombre del Puesto </b> </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="postName"
                                            value={values.postName}
                                            onChange={handleChange}
                                            isValid={touched.postName && !errors.postName}
                                            isInvalid={!!errors.name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.postName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="12" controlId="postDescription">
                                        <Form.Label> <b> Descripción del Puesto </b> </Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            name="postDescription"
                                            value={values.postDescription}
                                            onChange={handleChange}
                                            isValid={touched.postDescription && !errors.postDescription}
                                            isInvalid={!!errors.name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.postDescription}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <BaseListSelect
                                        values={values}
                                        elements={categories}
                                        name={"categoryId"}
                                        handleChange={handleChange}
                                        touched={touched}
                                        errors={errors}
                                        title="Categoria"
                                        column={6}
                                    />
                                    <BaseListSelect
                                        values={values}
                                        elements={enterprises}
                                        name={"enterpriseId"}
                                        handleChange={handleChange}
                                        touched={touched}
                                        errors={errors}
                                        title="Empresa"
                                        column={6}
                                    />
                                </Form.Row>
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