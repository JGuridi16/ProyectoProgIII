import React, { useEffect, useState, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import BaseListSelect from '../BaseSelect';
import { Form } from 'react-bootstrap';
import { Formik, ErrorMessage } from 'formik';
import Col from 'react-bootstrap/Col';
import { useHistory } from "react-router-dom";
import { get, post} from '../../services';

let yup = require('yup');


const PostJob = () => {
    
    const history = useHistory();
    const [categories, setCategories] = useState([]);
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
        name: '',
        categoryId: '',
        description: '',
        company: '',
        contractType: 1,
        logo: '',
        url: '',
        location: '',
        companyEmail: '',
        posterId: 1
    });
    const [basicSchema, setBasicSchema] = useState({
        name: yup.string().required('El campo Nombre de Puesto es requerido'),
        categoryId: yup.number().required('El campo Categoria es requerido'),
        description: yup.string().required('El campo Descripcion es requerido'),
        company: yup.string().required('El campo Nombre de Compañia es requerido'),
        //companyType: yup.number().required('El campo Tipo de Empresa es requerido'),
        logo: yup.string().required('El campo Logo es requerido'),
        location: yup.string().required('El campo Ubicacion es requerido'),
        companyEmail: yup.string().required('El campo Correo Electronico es requerido')
    });
    const updateFormik = (schema) => setFormikSchema(() => {
        return yup.object(schema);
    });
    useEffect(() => {
        (async function mounted() {
            var response = await get('Category');
            setCategories(response.data);
            updateFormik(basicSchema);
        })();
    }, []);
    const onFormSubmitted = async (values) => {
        console.log(JSON.stringify(values));
        castProperties(values);
        await post('Position',values);
        history.push('/');
    }

    const castProperties = (values) => {
        values.categoryId = Number(values.categoryId);
        values.posterId = 1;
        values.contractType = Number(values.contractType);
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
                        errors,
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <Card className="p-3 mb-4">
                                <div className="mb-35 space-between-container">
                                    <h2 className="is-bold">
                                        Crear puesto de trabajo
                                    </h2>
                                </div>
                                <Card className="p-3 my-4">
                                    <Form.Row className="my-3">
                                        <Form.Group as={Col} md="6" controlId="name">
                                            <Form.Label> <b> Nombre del Puesto </b> </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                value={values.name}
                                                onChange={handleChange}
                                                isValid={touched.name && !errors.name}
                                                isInvalid={!!errors.name}
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
                                    <Form.Group as={Col} md="12" controlId="description">
                                        <Form.Label> <b> Descripción del Puesto </b> </Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            name="description"
                                            value={values.description}
                                            onChange={handleChange}
                                            isValid={touched.description && !errors.description}
                                            isInvalid={!!errors.description}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.description}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    </Form.Row>
                                </Card>
                                <Card className="p-3 my-4">
                                    <Form.Row className="my-3">
                                    <Form.Group as={Col} md="6" controlId="company">
                                        <Form.Label> <b> Nombre de la Compañía * </b> </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="company"
                                            value={values.company}
                                            onChange={handleChange}
                                            isValid={touched.company && !errors.company}
                                            isInvalid={!!errors.company}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.company}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    
                                    <BaseListSelect
                                        values={values}
                                        elements={enterprises}
                                        name={"contractType"}
                                        handleChange={handleChange}
                                        touched={touched}
                                        errors={errors}
                                        title="Tipo de Compañia"
                                        column={6}
                                    />

                                    <Form.Group
                                            as={Col}
                                            md={6}
                                            controlId="logo"
                                        >
                                            <Form.Label>
                                                <b> Logo (URL) </b>
                                            </Form.Label>
                                            <Form.Control
                                            type="text"
                                            name="logo"
                                            value={values.logo}
                                            onChange={handleChange}
                                            isValid={touched.logo && !errors.logo}
                                            isInvalid={!!errors.logo}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} md="6" controlId="url">
                                        <Form.Label> <b> Pagina Web </b> </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="url"
                                            value={values.url}
                                            onChange={handleChange}
                                            isValid={touched.url && !errors.url}
                                            isInvalid={!!errors.url}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.url}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} md="6" controlId="location">
                                        <Form.Label> <b> Ubicacion </b> </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="location"
                                            value={values.location}
                                            onChange={handleChange}
                                            isValid={touched.location && !errors.location}
                                            isInvalid={!!errors.location}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.location}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} md="6" controlId="companyEmail">
                                        <Form.Label> <b> Email </b> </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="companyEmail"
                                            value={values.companyEmail}
                                            onChange={handleChange}
                                            isValid={touched.companyEmail && !errors.companyEmail}
                                            isInvalid={!!errors.companyEmail}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.companyEmail}
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