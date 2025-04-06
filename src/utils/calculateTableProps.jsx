export function calculateTableProps({ width, length, selectedList, selectedPipe, frameType, config, data }) {
  const area = parseFloat(width) * parseFloat(length)

  const sheetWidth = parseFloat(selectedList?.width || 1)
  const sheetsNeeded = Math.ceil(area / sheetWidth)
  const sheetTotal = sheetsNeeded * selectedList?.price

  const pipeWidthMM = parseFloat(selectedPipe?.width)
  const frameStep = config.find(item => item.type === 'frame' && item.key === frameType)?.step || 1
  const frameStepM = parseFloat(frameStep)

  const usableWidth = parseFloat(width) - (pipeWidthMM / 1000)
  const usableLength = parseFloat(length) - (pipeWidthMM / 1000)

  const verticalCount = Math.floor(usableWidth / frameStepM) + 1 
  const horizontalCount = Math.floor(usableLength / frameStepM) + 1

  const verticalLength = verticalCount * parseFloat(length)
  const horizontalLength = horizontalCount * parseFloat(width)

  const pipeTotalLength = verticalLength + horizontalLength
  const pipeTotal = pipeTotalLength * selectedPipe?.price

  const fixConfig = config.find(item => item.type === 'fix' && item.key === selectedList?.material)
  const fixPerSqM = fixConfig?.value || 10
  const fixTotalCount = Math.ceil(area * fixPerSqM)

  const fixPrice = data.find(item => item.type === 'fix')?.price || 1
  const fixTotal = fixTotalCount * fixPrice

  const totalSum = sheetTotal + pipeTotal + fixTotal

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
