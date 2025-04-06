import { Table, Card } from 'react-bootstrap'

export default function ProductTable({ cart }) {
  return (
    <>
      <h4 className="mb-4">Результаты расчётов</h4>
      {cart.map((item, index) => (
        <Card key={index} className="mb-4 shadow-sm">
          <Card.Header className="bg-primary text-white">
            <strong>Расчёт #{index + 1}</strong>
          </Card.Header>
          <Card.Body>
            <p><strong>Площадь:</strong> {item.area} м²</p>
            <p><strong>Размер ячейки:</strong> {item.cellSize} м</p>

            <Table striped bordered hover responsive size="sm" className="mt-3">
              <thead className="table-secondary">
                <tr>
                  <th>Наименование</th>
                  <th>Ед.</th>
                  <th>Кол-во</th>
                  <th>Сумма (₽)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{item.sheet}</td>
                  <td>м²</td>
                  <td>{item.sheetCount}</td>
                  <td>{item.sheetTotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>{item.pipe}</td>
                  <td>мп</td>
                  <td>{item.pipeTotalLength.toFixed(2)}</td>
                  <td>{item.pipeTotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Саморез</td>
                  <td>шт</td>
                  <td>{item.fixTotalCount}</td>
                  <td>{item.fixTotal.toFixed(2)}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="text-end"><strong>Итого:</strong></td>
                  <td><strong>{item.totalSum.toFixed(2)}</strong></td>
                </tr>
              </tfoot>
            </Table>
          </Card.Body>
        </Card>
      ))}
    </>
  )
}
