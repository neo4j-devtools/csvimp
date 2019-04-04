import Papa from 'papaparse'

const createOrGetNode = (driver, label, props) => {
  const getProps = () => props.map((p, i) => `\`${p.key}\`: $prop${i}`)
  const findNode = `MATCH (n:\`${label}\` {${getProps()}}) RETURN id(n) AS id`
  const createNode = `CREATE (n:\`${label}\` {${getProps()}}) RETURN id(n) AS id`

  const cypherParams = {}
  props.forEach((p, i) => cypherParams[`prop${i}`] = p.value)

  //console.log(JSON.stringify(cypherParams))

  return new Promise((resolve, reject) => {
    let session = driver.session()
    session.readTransaction(tx => tx.run(findNode, cypherParams))
      .then(result => {
        session.close()
        if (result.records && result.records.length > 0) {
          resolve(result.records[0].get('id'))
        } else {
          let session2 = driver.session()
          session2.writeTransaction(tx => tx.run(createNode, cypherParams))
            .then(result => {
              session2.close()
              resolve(result.records[0].get('id'))
            })
        }
      })
  })
}

const createRelationship = (driver, from, to) => {
  const create = 'MATCH (m), (n) WHERE id(m) = $id1 AND id(n) = $id2 CREATE (n)-[:REL]->(m)'
  const cypherParams = {
    id1: from,
    id2: to
  }

  let session = driver.session()
  return session.writeTransaction(tx => tx.run(create, cypherParams))
    .then(result => {
      session.close()
    })
}

const processRow = (row, driver, propKeys, order, nodes) => {
  const getReordered = (data, i) => {
    return data[order[i]]
  }

  let promises = []
  let prev = null

  nodes.forEach(node => {
    const props = []
    for (let i = node.from; i < node.to; i++) {
      props.push({
        key: getReordered(propKeys, i),
        value: getReordered(row, i)
      })
    }

    const current = createOrGetNode(driver, getReordered(propKeys, node.from), props)
    promises.push(current)

    if (prev !== null) {
      const rel = Promise.all([prev, current])
        .then(ids => createRelationship(driver, ids[0], ids[1]))
      promises.push(rel)
    }

    prev = current
  })

  return Promise.all(promises)
}

const MaxJobs = 10
const inFlight = []
const queue = []
const onRow = (row, driver, propKeys, order, nodes) => {
  const checkQueue = () => {
    if (inFlight.length < MaxJobs && queue.length > 0) {
      const { row, driver, propKeys, order, nodes } = queue.pop()
      const promise = processRow(row, driver, propKeys, order, nodes)
      inFlight.push(promise)
      promise.then(r => {
        inFlight.splice(inFlight.findIndex(v => v === promise), 1)
        checkQueue()
      })
    }
  }

  if (row.length === order.length) {
    const newJob = {row, driver, propKeys, order, nodes}
    queue.push(newJob)
    checkQueue()
  }
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
//        data: results.data.slice(currentChunk === 0 && hasHeaders ? 1 : 0),
        progress: currentChunk * Papa.LocalChunkSize / file.size
      })

      currentChunk++
    },

    complete: () => {
      onComplete()
    }
  })
}

