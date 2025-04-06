export async function fetchInitialData() {
    const [dataRes, configRes] = await Promise.all([
      fetch('/data/data.json'),
      fetch('/data/config.json')
    ])
    const [data, config] = await Promise.all([
      dataRes.json(),
      configRes.json()
    ])
  
    return { data, config }
}