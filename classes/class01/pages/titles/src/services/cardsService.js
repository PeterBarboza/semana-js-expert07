export default class CardService {
  #database = []
  #dbUrl = ''
  #cardListWorker
  constructor({ dbUrl, cardListWorker }) {
    this.#dbUrl = dbUrl
    this.#cardListWorker = cardListWorker
  }
  async loadCards() {
    const response = await fetch(this.#dbUrl)
    this.#database = await response.json()
  }

  filterTitles(keyword) {
    const titles = this.#database
      .filter(({ title }) => !!keyword ? title.toLowerCase().includes(keyword.toLowerCase()) : true)

    if (keyword) {
      //CÓDIGO MOVIDO PARA DENTRO DO WORKER (cardListWorker.js)
      //   console.log('activating blocking operation...')
      //   console.time('blocking-op')
      //   // blocking function
      //   // 1e5 = 100.000
      //   for (let counter = 0; counter < 1e3; counter++) console.log('.')
      //   console.timeEnd('blocking-op')
      
      //O código abaixo executa a função que foi movida para o worker
      this.#cardListWorker.postMessage({ maxItems: 1e3 })
    }

    const cards = titles.map(item => {
      return {
        background: item.imageUrl,
        display_background: "//external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fhdqwalls.com%2Fdownload%2Finterstellar-gargantua-u4-1920x1080.jpg&f=1&nofb=1",
        title: item.title,
        description: item.description,
        show_id: item.show_id,
        duration: item.duration
      }
    })
    return cards
  }
}