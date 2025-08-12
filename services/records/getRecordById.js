import recordData from '../../data/records.json' with { type: 'json' }

const getRecordById = (id) => {
  console.log(id)
  return recordData.records.find((record) => record.id === id)
}

export default getRecordById
