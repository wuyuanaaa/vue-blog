function rn(from, to) {
  return ~~(Math.random() * (to - from + 1)) + from
}

function rs() {
  return arguments[rn(1, arguments.length) - 1]
}

export default function cloudShadows(max) {
  const ret = []
  for (let i = 0; i < max; ++i) {
    ret.push(`
      ${rn(1, 100)}vw ${rn(1, 100)}vh ${rn(20, 40)}vmin ${rn(1, 20)}vmin
      ${rs('#11cbd7', '#c6f1e7', '#f0fff3', '#ff622b')}
    `)
  }
  return ret.join(',')
}

// ${ rs('#11cbd7', '#c6f1e7', '#f0fff3', '#fa4659') }
