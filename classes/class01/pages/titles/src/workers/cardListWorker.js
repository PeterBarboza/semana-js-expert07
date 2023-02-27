onmessage = ({ data }) => {
  console.log('activating blocking operation...', data.maxItems)
  console.time('blocking-op')
  
  let counter = 0

  for (; counter < data.maxItems; counter++) console.log('.')

  console.timeEnd('blocking-op')

  postMessage(
    { response: "ok", data: counter }
  )
}