import Papa from 'papaparse'

const createOrGetNode = async (driver, label, props) => {
  const getProps = () => props.map((p, i) => `\`${p.key}\`: $prop${i}`)
  const findNode = `MATCH (n:\`${label}\` {${getProps()}}) RETURN id(n) AS id`
  const createNode = `CREATE (n:\`${label}\` {${getProps()}}) RETURN id(n) AS id`

  const cypherProps = {}
  props.forEach((p, i) => cypherProps[`prop${i}`] = p.value)

  const session1 = driver.session()
  const id1 = await session1.readTransaction(tx => {
    const result = tx.run(findNode, cypherProps)
    if (result.records && result.records.length > 0) {
      return result.records[0].get('id')
    } else {
      return null
    }
  })
  session1.close()

  if (id1 !== null) {
    return id1
  }

  const session2 = driver.session()
  const id2 = await session2.writeTransaction(tx => {
    const result = tx.run(createNode, cypherProps)
    if (result.records && result.records.length > 0) {
      return result.records[0].get('id')
    } else {
      return null
    }
  })
  session2.close()

  return id2
}

const createRelationship = (session, from, to) => {



}

const onRow = (row, driver, propKeys, order, nodes) => {
  const getReordered = (data, i) => {
    return data[order[i]]
  }

  let prevId = null
  nodes.forEach(node => {
    const props = []
    for (let i = node.from; i < node.to; i++) {
      props.push({
        key: getReordered(propKeys, i),
        value: getReordered(row, i)
      })
    }

    const id = createOrGetNode(driver, getReordered(propKeys, node.from), props)

    if (prevId !== null) {
      createRelationship(driver, prevId, id)
    }

    prevId = id
  })
}

const cleanValue = val => {
  if (typeof val === 'string') {
    val = val.trim()
    let start, end
    for (start = 0; val[start] === '"' || val[start] === ' '; start++);
    for (end = val.length - 1; val[end] === '"' || val[end] === ' '; end--);
    return val.substr(start, end - start + 1)  
  } else {
    return val
  }
}

export const startParsing = (file, driver, hasHeaders, order, nodes, onStep, onComplete) => {

  // Setting chunk size so the progrssbar moves
  if (file.size < 100 * 1024) {
    Papa.LocalChunkSize = 1024
  } else if (file.size < 1024 * 1024) {
    Papa.LocalChunkSize = 10 * 1024
  } else if (file.size < 50 * 1024 * 1024) {
    Papa.LocalChunkSize = 100 * 1024
  }

  let currentChunk = 0
  let propKeys

  Papa.parse(file, {
    header: false,
    dynamicTyping: true,

    chunk: (results, parser) => {
      if (currentChunk === 0) {
        if (hasHeaders) {
          propKeys = results.data[0].slice().map(v => cleanValue(v))
        } else {
          propKeys = results.data[0].map((_, i) => `Column ${i + 1}`)
        }
      }

      const actualData = currentChunk === 0 && hasHeaders
        ? results.data.slice(1)
        : results.data

      const cleanedData = actualData.map(row => row.map(v => cleanValue(v)))
  
      cleanedData.forEach(row => onRow(row, driver, propKeys, order, nodes))

      onStep({
        data: results.data.slice(currentChunk === 0 && hasHeaders ? 1 : 0),
        progress: currentChunk * Papa.LocalChunkSize / file.size
      })

      currentChunk++
    },

    complete: () => {
      onComplete()
    }
  })
}

