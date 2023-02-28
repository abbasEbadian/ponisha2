document.onreadystatechange = function () {
    var emblaNode = document.querySelector('.embla')
    const prevButtonNode = emblaNode.querySelector('.embla__prev')
    const nextButtonNode = emblaNode.querySelector('.embla__next')
    var options = { 
        loop: false,
        direction: "rtl",
        align: 'start',
        containScroll: 'trimSnaps',
        slidesToScroll: 2
    }
    var embla = EmblaCarousel(emblaNode, options)
    prevButtonNode.addEventListener('click', embla.scrollPrev, false)
    nextButtonNode.addEventListener('click', embla.scrollNext, false)
}