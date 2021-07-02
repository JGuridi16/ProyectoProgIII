import React, { useEffect, useState, useRef } from 'react';
import BaseTable from '../BaseTable';
import Card from 'react-bootstrap/Card';
import BaseListSelect from '../BaseSelect';
import { get } from '../../services';

const MainPage = (props) => {
    
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]); 
    const [categories, setCategories] = useState([]);
    const onSelectChanged = (event) => {
        if(event.target.value){
            setFilteredData(data.filter(x => x.categoryId === Number(event.target.value)));
        }
        else{
            setFilteredData(data);
        }
        
    }

    useEffect(() => {
        (async function mounted() {
         var response = await get('Category');
         setCategories(response.data);
         var response2 = await get('Position');
         setData(response2.data);
        })();
        return function cleanup() {
        };
    }, [])

    useEffect(() => {
        setFilteredData(data);
    }, [data])

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
                <BaseTable
                data = {filteredData}
                />
            </Card>
        </Card>
      </div>
    );
  }

  export default MainPage;