import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import "./DragAndDropFile.css";

const DragAndDropFileInline = ({ id = '', name = '', text = '', innerRef, errors, touched, setFieldValue = () => { } }) => {
    const [componentText, setComponentText] = useState(text);

    if (!innerRef) {
        console.warn('File input is not being referenced to a useRef object');
    }

    const isValidFile = (file) => {
        const validTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif',
            'image/x-icon',
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        return validTypes.indexOf(file.type) !== -1;
    };

    const handleFileChange = (e) => {
        e.persist();
        const file = e.target.files[0];
        const fileRef = innerRef.current;
        if (isValidFile(file)) {
            fileRef[name] = file;
            setFieldValue(name, file);
            setComponentText(file.name);
        }
        else {
            setFieldValue(name, '');
            setComponentText('Archivo no valido');
            delete fileRef[name];
        }
    };

    return (
        <div className="mb-3 d-flex align-content-end">
            <Form.File id={id} custom>
                <Form.File.Input
                    onChange={handleFileChange}
                    isValid={
                        touched[name] &&
                        !errors[name]
                    }
                    isInvalid={!!errors[name]}
                />
                <Form.File.Label data-browse="Subir archivo">
                    {componentText}
                </Form.File.Label>
                <Form.Control.Feedback type="invalid">{errors[name]}</Form.Control.Feedback>
            </Form.File>
        </div>
    );
};

export default DragAndDropFileInline;
