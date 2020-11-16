!((d, w) => {
  d.addEventListener('DOMContentLoaded', () => {
    const isLast = ({ cursor, slides }) => cursor === slides.length - 1
    const isFirst = ({ cursor }) => cursor === 0
    // update model with action
    const update = (action, model) => {
      switch (action) {
        case 'next': {
          return {
            ...model,
            cursor: isLast(model) ? model.slides.length - 1 : model.cursor + 1
          }
        }
        case 'loop': {
          return {
            ...model,
            cursor: isLast(model) ? 0 : model.cursor + 1
          }
        }
        case 'loopback': {
          return {
            ...model,
            cursor: isFirst(model) ? model.slides.length - 1 : model.cursor - 1
          }
        }
        case 'prev':
          return {
            ...model,
            cursor: model.cursor === 0 ? 0 : model.cursor - 1
          }
        case 'first':
          return { ...model, cursor: 0 }
        case 'last':
          return { ...model, cursor: model.slides.length - 1 }
        default:
          return model
      }
    }

    // map keys
    const keyMap = new Map([
      ['13', 'next'], // enter
      ['27', 'first'], // esc
      ['shift+32', 'prev'], // shift + space
      ['32', 'next'], // space
      ['37', 'prev'], // left
      ['38', 'prev'], // up
      ['39', 'next'], // right
      ['40', 'next'], // down
      ['shift+71', 'last'], // G
      ['71', 'first'], // g
      ['74', 'next'], // j
      ['75', 'prev'] // k
    ])

    const _view = model => {
      // hide all slide except current one
      model.slides.forEach(
        (slide, i) => (slide.className = model.cursor === i ? '' : 'slide')
      )

      // update window title and url
      d.title = `${model.title} - ${model.cursor + 1}/${model.slides.length}`
      window.location.hash = `${model.cursor + 1}`

      // hide buttons on the first and last slides
      model.buttons.next.className = isLast(model) ? 'hide' : ''
      model.buttons.prev.className = isFirst(model) ? 'hide' : ''
    }

    const _update = action => {
      w.model = update(action, w.model)
      _view(w.model)
    }

    const _app = init => {
      // initiate window.model and render it
      w.model = init
      _view(w.model)

      // register keydown event listener
      d.addEventListener('keydown', e =>
        _update(keyMap.get(`${e.shiftKey ? 'shift+' : ''}${e.keyCode}`))
      )

      // set onclick event handlers
      // d.onclick = () => _update("loop");
      model.buttons.next.onclick = () => _update('next')
      model.buttons.prev.onclick = () => _update('prev')
    }

    _app({
      title: d.title,
      cursor: w.location.hash
        ? Number(w.location.hash.replace('#', '')) - 1
        : 0,
      slides: [].slice.call(d.querySelectorAll('.slide')),
      buttons: {
        next: d.getElementById('next'),
        prev: d.getElementById('prev')
      }
    }) // start with the first slide
  })
})(document, window)
