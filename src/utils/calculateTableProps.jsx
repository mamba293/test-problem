export function calculateTableProps({ width, length, selectedList, selectedPipe, frameType, config, data }) {
  // Вычисляем площадь конструкции
  const area = parseFloat(width) * parseFloat(length)

  // Расчет количества листов покрытия
  const sheetWidth = parseFloat(selectedList?.width || 1) // ширина одного листа
  const sheetsNeeded = Math.ceil(area / sheetWidth)       // сколько листов нужно на всю площадь
  const sheetTotal = sheetsNeeded * selectedList?.price   // общая стоимость листов

  // Расчет параметров трубы
  const pipeWidthMM = parseFloat(selectedPipe?.width) // толщина трубы в мм
  const frameStep = config.find(item => item.type === 'frame' && item.key === frameType)?.step || 1 // шаг каркаса
  const frameStepM = parseFloat(frameStep)            // шаг каркаса в метрах

  // Полезная ширина и длина (учитывая толщину трубы по краям)
  const usableWidth = parseFloat(width) - (pipeWidthMM / 1000)
  const usableLength = parseFloat(length) - (pipeWidthMM / 1000)

  // Количество вертикальных и горизонтальных труб
  const verticalCount = Math.floor(usableWidth / frameStepM) + 1
  const horizontalCount = Math.floor(usableLength / frameStepM) + 1

  // Общая длина труб (вертикальные и горизонтальные)
  const verticalLength = verticalCount * parseFloat(length)
  const horizontalLength = horizontalCount * parseFloat(width)
  const pipeTotalLength = verticalLength + horizontalLength
  const pipeTotal = pipeTotalLength * selectedPipe?.price // стоимость труб

  // Расчет саморезов по материалу покрытия
  const fixConfig = config.find(item => item.type === 'fix' && item.key === selectedList?.material)
  const fixPerSqM = fixConfig?.value || 10 // количество саморезов на 1 м²
  const fixTotalCount = Math.ceil(area * fixPerSqM) // общее количество саморезов

  // Расчет стоимости саморезов
  const fixPrice = data.find(item => item.type === 'fix')?.price || 1
  const fixTotal = fixTotalCount * fixPrice

  // Общая сумма всех материалов
  const totalSum = sheetTotal + pipeTotal + fixTotal

  // Финальный результат расчета
  return {
    sheet: selectedList.name,
    pipe: selectedPipe.name,
    width,
    length,
    area,
    sheetCount: sheetsNeeded,
    sheetTotal,
    pipeTotalLength,
    pipeTotal,
    fixTotalCount,
    fixTotal,
    totalSum,
    cellSize: `${(usableWidth / (verticalCount - 1)).toFixed(2)} x ${(usableLength / (horizontalCount - 1)).toFixed(2)}`
  }
}
