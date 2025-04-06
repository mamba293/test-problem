import { useState, useEffect } from 'react'
import { Container, Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import ProductForm from './components/ProductForm'
import ProductTable from './components/ProductTable'

import {fetchInitialData} from './action';
import {calculateResult} from './utils/calculateResult'

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

  const handleAddToCart = ({ width, length, selectedList, selectedPipe, frameType }) => {
    console.log({ width, length, selectedList, selectedPipe, frameType })
    const newItem = calculateResult({
      width,
      length,
      selectedList,
      selectedPipe,
      frameType,
      config,
      data
    })
    console.log(newItem)
    setCart([...cart, newItem])
  }
  

  if (!config) return <div>Loading...</div>

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col md={4} className="border-end pe-4">
          <div className="form-section">
            <ProductForm data={data} config={config} handler={handleAddToCart} />
          </div>
        </Col>

        <Col md={4} className="border-end pe-4">
          <div className="table-section">
            <ProductTable cart={cart} />
          </div>
        </Col>

       {/*возможно лучше было сделать как модальное окно*/}
        <Col md={4} className="ps-4">
          <div className="cart-section">
            <h3>Корзина</h3>
            {/* Дополнительное содержимое корзины */}
          </div>
        </Col>
      </Row>
    </Container>
  )
}
