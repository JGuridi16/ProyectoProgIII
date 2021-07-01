import React, { useEffect, useState, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import BaseListSelect from '../BaseSelect';
import { Form } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import Col from 'react-bootstrap/Col';
import DragDropFileInline from '../DragDropFileInLine'; 

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
                                    <h2 className="is-bold">
                                        Aplicar a puesto de trabajo
                                    </h2>
                                </div>
                                <Card className="p-3 my-4">
                                    <Form.Row className="my-3">
                                        <Form.Group as={Col} md="6" controlId="postName">
                                            <Form.Label> <b> {position[company]} </b> </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="postName"
                                                value={values.postName}
                                                onChange={handleChange}
                                                isValid={touched.postName && !errors.postName}
                                                isInvalid={!!errors.postName}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.postName}
                                            </Form.Control.Feedback>
                                        </Form.Group>
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
                                    <Form.Group as={Col} md="12" controlId="postDescription">
                                        <Form.Label> <b> Descripción del Puesto </b> </Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            name="postDescription"
                                            value={values.postDescription}
                                            onChange={handleChange}
                                            isValid={touched.postDescription && !errors.postDescription}
                                            isInvalid={!!errors.postDescription}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.postDescription}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="12" controlId="howToApply">
                                        <Form.Label> <b> Como aplicar </b> </Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            name="howToApply"
                                            value={values.howToApply}
                                            onChange={handleChange}
                                            isValid={touched.howToApply && !errors.howToApply}
                                            isInvalid={!!errors.howToApply}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.howToApply}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    </Form.Row>
                                </Card>
                                <Card className="p-3 my-4">
                                    <Form.Row className="my-3">
                                    <Form.Group as={Col} md="6" controlId="companyName">
                                        <Form.Label> <b> Nombre de la Compañía * </b> </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="companyName"
                                            value={values.companyName}
                                            onChange={handleChange}
                                            isValid={touched.companyName && !errors.companyName}
                                            isInvalid={!!errors.companyName}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.companyName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    
                                    <BaseListSelect
                                        values={values}
                                        elements={enterprises}
                                        name={"companyType"}
                                        handleChange={handleChange}
                                        touched={touched}
                                        errors={errors}
                                        title="Tipo de Compañia"
                                        column={6}
                                    />

                                    <Form.Group
                                            as={Col}
                                            md={6}
                                            controlId="companyLogo"
                                        >
                                            <Form.Label>
                                                <b> Logo </b>
                                            </Form.Label>
                                            <DragDropFileInline
                                                id="companyLogo"
                                                name="companyLogo"
                                                innerRef={fileRef}
                                                errors={errors}
                                                touched={touched}
                                                setFieldValue={setFieldValue}
                                            />
                                    </Form.Group>

                                    <Form.Group as={Col} md="6" controlId="companyUrl">
                                        <Form.Label> <b> Pagina Web </b> </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="companyUrl"
                                            value={values.companyUrl}
                                            onChange={handleChange}
                                            isValid={touched.companyUrl && !errors.companyUrl}
                                            isInvalid={!!errors.companyUrl}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.companyUrl}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} md="6" controlId="companyLocation">
                                        <Form.Label> <b> Ubicacion </b> </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="companyLocation"
                                            value={values.companyLocation}
                                            onChange={handleChange}
                                            isValid={touched.companyLocation && !errors.companyLocation}
                                            isInvalid={!!errors.companyLocation}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.companyLocation}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} md="6" controlId="userEmail">
                                        <Form.Label> <b> Email </b> </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="userEmail"
                                            value={values.userEmail}
                                            onChange={handleChange}
                                            isValid={touched.userEmail && !errors.userEmail}
                                            isInvalid={!!errors.userEmail}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.userEmail}
                                        </Form.Control.Feedback>
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