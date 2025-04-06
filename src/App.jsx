import { useState, useEffect } from 'react'
import { Container, Row, Col} from 'react-bootstrap'


import ProductForm from './components/ProductForm'
import ProductTable from './components/ProductTable'

import {fetchInitialData} from './action';
import {calculateTableProps} from './utils/calculateTableProps'

export default function App() {
  const [data, setData] = useState([])
  const [config, setConfig] = useState(null)
  const [cart, setCart] = useState([])

  //вынес логику actions в отдельный файл
  useEffect(() => {
    fetchInitialData().then(({ data, config }) => {
      setData(data)
      setConfig(config)
    })
  }, [])

  const handleAddToTable = ({ width, length, selectedList, selectedPipe, frameType }) => {
    const newItem = calculateTableProps({
      width,
      length,
      selectedList,
      selectedPipe,
      frameType,
      config,
      data
    })
    setCart([...cart, newItem])
  }

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col md={4} className="border-end pe-4">
          <div className="form-section">
            <ProductForm data={data} config={config} handler={handleAddToTable} />
          </div>
        </Col>

        {/*Результаты подсчетов*/}
        <Col md={4} className="border-end pe-4">
          <div className="table-section">
            <ProductTable cart={cart} />
          </div>
        </Col>

        <Col md={4} className="ps-4">
          <div className="cart-section">
            <h3>Корзина</h3>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
