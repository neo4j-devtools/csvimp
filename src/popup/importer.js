import Papa from 'papaparse'

export const startParsing = (file, driver, hasHeaders, onStep, onComplete) => {
  let currentChunk = 0

  console.log('äaaaaaaa')

  // Setting chunk size so the progrssbar moves
  if (file.size < 100 * 1024) {
    Papa.LocalChunkSize = 1024
  } else if (file.size < 1024 * 1024) {
    Papa.LocalChunkSize = 10 * 1024
  } else if (file.size < 50 * 1024 * 1024) {
    Papa.LocalChunkSize = 100 * 1024
  }


  Papa.parse(file, {
    header: false,
    dynamicTyping: true,

    chunk: (results, parser) => {
      console.log("Row data:", results.data)
      console.log("Row errors:", results.errors)

      onStep({
        data: results.data.slice(currentChunk === 0 && hasHeaders ? 1 : 0),
        progress: currentChunk * Papa.LocalChunkSize / file.size
      })

      currentChunk++
    },

    complete: () => {
      onComplete()
    }

    /*
    step: (result) => {
      // do stuff with result
      console.log('step', result)
    },
    */      

    /*
    complete: (results, file) => {
      let data = results.data

      if (!hasHeaders) {
        data = [
          data[0].map((_, i) => `Column ${i + 1}`),
          ...data
        ]
      }

      console.log('setting preview', data)
      dispatch(setPreview(data))
      if (resetEditor) {
        dispatch(reset(data[0].length))
      }
    }
    */
  })
}

