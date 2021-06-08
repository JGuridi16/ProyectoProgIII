import React, { useEffect, useState, useRef } from 'react';
import BaseTable from '../BaseTable';
import Card from 'react-bootstrap/Card';
import BaseListSelect from '../BaseSelect';

const MainPage = (props) => {
    const today = new Date();
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
    const onSelectChanged = () => {
        alert("Se cambio a la categoria");
    }
    return (
      <div>
        <Card className="p-3 my-4">
            <div>
                <h2> Bolsa de Empleos </h2>
            </div>
            <Card className="p-2 my-8">
                <div className="space-between-container">
                    <h5>Empleos recientes</h5>
                    <BaseListSelect
                        elements={categories}
                        name={'categories'}
                        handleChange={onSelectChanged}
                        title="Categorias"
                        column={3}
                    />
                </div>
                <BaseTable/>
            </Card>
        </Card>
      </div>
    );
  }

  export default MainPage;