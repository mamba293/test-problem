export async function fetchInitialData() {
  try {
    const [dataRes, configRes] = await Promise.all([
      fetch('/data/data.json'),
      fetch('/data/config.json')
    ]);

    if (!dataRes.ok) {
      throw new Error(`Ошибка загрузки data.json: ${dataRes.status} ${dataRes.statusText}`);
    }
    if (!configRes.ok) {
      throw new Error(`Ошибка загрузки config.json: ${configRes.status} ${configRes.statusText}`);
    }

    const [data, config] = await Promise.all([
      dataRes.json(),
      configRes.json()
    ]);

    return { data, config };
  } catch (error) {
    console.error('Ошибка при получении данных:', error.message);
    return { data: [], config: [], error: error.message };
  }
}
