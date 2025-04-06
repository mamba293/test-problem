import { Form, Button } from 'react-bootstrap';
import {useState} from 'react';


export default function ProductForm({data, config, onSubmit}) {
    const [selectedList, setSelectedList] = useState(null);
    const [selectedPipe, setSelectedPipe] = useState(null);
    const [width, setWidth] = useState('');
    const [length, setLength] = useState('');
    const [frameType, setFrameType] = useState('');

    const getName = (list) => {
      return `${list.name}, материал ${list.material === "metal" ? "металл" : "пластик"}`
    }
    
    return (
    <>
        <h4>Ввод данных</h4>
        <Form>
            <Form.Group className="mb-3">
              <Form.Label>Материал покрытия</Form.Label>
              <Form.Select
                value={selectedList?.name}
                onChange={e => setSelectedList(data.find(item => item.name === e.target.value))}
              >
                {selectedList === null && <option value="">Выберите материал</option>}
                {data.filter(item => item.type === 'list').map(list => (
                  <option key={list.name} value={list.name}>{getName(list)}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Труба</Form.Label>
              <Form.Select
                value={selectedPipe?.name}
                onChange={e => setSelectedPipe(data.find(item => item.name === e.target.value))}
              >
                {selectedPipe === null && <option value="">Выберите трубу</option>}
                {data.filter(item => item.type === 'pipe').map(pipe => (
                  <option key={pipe.name} value={pipe.name}>{pipe.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ширина (м)</Form.Label>
              <Form.Control
                type="number"
                value={width}
                onChange={e => setWidth(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Длина (м)</Form.Label>
              <Form.Control
                type="number"
                value={length}
                onChange={e => setLength(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Прочность</Form.Label>
              <div>
                {config.filter(item => item.type === 'frame').map(frame => (
                  <Form.Check
                    inline
                    type="radio"
                    key={frame.key}
                    label={frame.name}
                    checked={frameType === frame.key}
                    onChange={() => setFrameType(frame.key)}
                  />
                ))}
              </div>
            </Form.Group>

            <Button
              onClick={() =>
                onSubmit({
                  width,
                  length,
                  selectedList,
                  selectedPipe,
                  frameType
                })
              }
            >
              Добавить в расчёт
            </Button>
          </Form>
    </>
    )
}