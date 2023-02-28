var already_defined = false

document.onreadystatechange = function () {
  reels()
  main()
  acc()

  const open_search = document.querySelector(".ampstart-navbar-trigger")
  const search = document.querySelector("#search-overlay")
  const close = document.querySelector(".search-overlay-close-button")
  open_search && open_search.addEventListener('click', function () {
    search.classList.add('visible')
  })
  close && close.addEventListener('click', function () {
    search.classList.remove('visible')
  })
  caro()



}
function caro() {
  if (already_defined) return
  already_defined = true
  var is_playing = true
  const modal = document.querySelector('#carouselExampleIndicators')
  new bootstrap.Carousel(modal, {
    interval: 3000,
    ride: true
  })

  $(".icons .bi-pause").on('click', (e) => {
    const that = e.target
    $(modal).carousel("pause")
    $(that).addClass("d-none")
    $(that).next().removeClass('d-none')
    is_playing = !is_playing
  })
  $(".icons .bi-play").on('click', (e) => {
    const that = e.target
    $(modal).carousel("cycle")
    $(that).addClass("d-none")
    $(that).prev().removeClass('d-none')

    is_playing = !is_playing
  })
  $(".overlay .close").click(function (e) {
    $(".modal-dialog .overlay").addClass('d-none')
  })
  $(".bi-send-fill").click(function (e) {
    $(".modal-dialog .overlay").removeClass('d-none')
  })
}
function close() {
  $(".modal-dialog .overlay").addClass('d-none')
}
function reels() {
  const emblaNode = document.querySelector('.embla')
  const prevButtonNode = emblaNode.querySelector('.embla__prev')
  const nextButtonNode = emblaNode.querySelector('.embla__next')
  const options = {
    loop: false,
    direction: "rtl",
    align: 'start',
    containScroll: 'trimSnaps',
    slidesToScroll: 2
  }
  const embla = EmblaCarousel(emblaNode, options)
  prevButtonNode.addEventListener('click', embla.scrollPrev, false)
  nextButtonNode.addEventListener('click', embla.scrollNext, false)
}
const TWEEN_FACTOR = 4.2

const numberWithinRange = (number, min, max) =>
  Math.min(Math.max(number, min), max)

const calculateTweenValuesOpacity = (emblaApi) => {
  const engine = emblaApi.internalEngine()
  const scrollProgress = emblaApi.scrollProgress()

  return emblaApi.scrollSnapList().map((scrollSnap, index) => {
    if (!emblaApi.slidesInView().includes(index)) return 0
    let diffToTarget = scrollSnap - scrollProgress

    if (engine.options.loop) {
      engine.slideLooper.loopPoints.forEach((loopItem) => {
        const target = loopItem.target().get()
        if (index === loopItem.index && target !== 0) {
          const sign = Math.sign(target)
          if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
          if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
        }
      })
    }
    const tweenValue = 1 - Math.abs(diffToTarget * TWEEN_FACTOR)
    return numberWithinRange(tweenValue, 0, 1)
  })
}

const setupTweenOpacity = (emblaApi) => {
  const tweenNodes = emblaApi.slideNodes()

  const applyTweenOpacity = () => {
    const tweenValues = calculateTweenValuesOpacity(emblaApi)
    tweenValues.forEach((tweenValue, index) => {
      tweenNodes[index].style.opacity = (tweenValue + 0.4).toString()
    })
  }

  const removeTweenOpacity = () => {
    tweenNodes.forEach((slide) => slide.removeAttribute('style'))
  }

  return {
    applyTweenOpacity,
    removeTweenOpacity,
  }
}


function main() {
  var emblaNode = document.querySelector('.embla2')
  const prevButtonNode = emblaNode.querySelector('.embla__prev')
  const nextButtonNode = emblaNode.querySelector('.embla__next')
  const options = {
    loop: false,
    direction: "rtl",
  }
  const embla = EmblaCarousel(emblaNode, options)
  prevButtonNode.addEventListener('click', embla.scrollPrev, false)
  nextButtonNode.addEventListener('click', embla.scrollNext, false)

  const { applyTweenOpacity, removeTweenOpacity } = setupTweenOpacity(embla)

  embla
    .on('init', applyTweenOpacity)
    .on('scroll', applyTweenOpacity)
    .on('reInit', applyTweenOpacity)
    .on('destroy', removeTweenOpacity)
}
const generate = (data, parent) => {

  const items = data["items"]
  const _i = items[0]["land-see-category"][0]["story-slide"]["0"]["story-post"]

  // [0]["land-see-category"][0]["story-slide"]["story-post"]
  console.log(_i)
  for (let item of _i) {
    const image = item["image"][0]["src"]
    const classes = item["post-classes"]
    const title = item["post-title"]
    const a = `<div class='embla__slide'>
                <div class='item '>
                    <img src="${image}" alt=''/>
                    <span>${title}</span>
                </div>
            </div>
        `
    console.log(parent)
    parent.children[0].insertAdjacentHTML("beforeend", a);
  }
}
const acc = async () => {
  var d1 = await fetch('./data/love.json')
  d1 = await d1.json()
  var d2 = await fetch('./data/hair.json')
  d2 = await d2.json()
  var d3 = await fetch('./data/makeup.json')
  d3 = await d3.json()

  var embs = [].slice.call(document.querySelectorAll(".embla3"));
  const parent1 = embs[0]
  const parent2 = embs[1]
  const parent3 = embs[2]
  console.log(embs)
  generate(d1, parent1)
  generate(d2, parent2)
  generate(d3, parent3)

  const options = {
    loop: false,
    direction: "rtl",
    align: 'start',
    containScroll: 'trimSnaps',
    slidesToScroll: 2
  }
  const accs = [].slice.call(document.querySelectorAll(".accordion-collapse"))
  accs.map(a => {
    a.classList.add("show")
  })
  embs.map(function (emb) {
    EmblaCarousel(emb, options)
  })
  accs.map(a => {
    a.classList.remove('show')
  })

}