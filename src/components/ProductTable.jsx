import { Table} from 'react-bootstrap'

export default function ProductTable({cart}){
    return (
        <>
        <h4>Результаты</h4>
          {cart.map((item, index) => (
            <div key={index} className="mb-4 p-3 border rounded">
              <h5>Расчет #{index + 1}</h5>
              <p>Площадь: {item.area} м²</p>
              <p>Размер ячейки: {item.cellSize} м</p>
              <Table striped bordered size="sm">
                <thead>
                  <tr>
                    <th>Наименование</th>
                    <th>ед.</th>
                    <th>кол-во</th>
                    <th>сумма</th>
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
              </Table>
              <strong>Итого: {item.totalSum.toFixed(2)}</strong>
            </div>
          ))}
        </>
    )
}