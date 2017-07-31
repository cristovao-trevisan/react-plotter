const getFromLut = (lut, n, offset = 0) => {
  let output = lut.slice(offset, offset + n)
  while (output.length < n) {
    output = output.concat(lut.slice(0, n - output.length))
  }
  return output
}

const makeReturn = (lut, useCounter) => {
  let count = 0
  if (!useCounter) return (n) => getFromLut(lut, n)
  return (n) => {
    let output = getFromLut(lut, n, count)
    count = (count + n) % lut.length
    return output
  }
}

const Sinewave = (size, f, fs, amplitude = 1, useCounter = true) => {
  let lut = []
  for (let i = 0; i < size; i++) {
    lut.push(amplitude * Math.sin(2 * Math.PI * f / fs * i))
  }
  return makeReturn(lut, useCounter)
}

const Squarewave = (size, f, fs, amplitude = 1, useCounter = true) => {
  let lut = []
  const T = fs / f
  for (let i = 0; i < size; i++) {
    lut.push((i % T) > (T / 2) ? -amplitude : amplitude)
  }
  return makeReturn(lut, useCounter)
}

const Trianglewave = (size, f, fs, amplitude = 1, useCounter = true) => {
  let lut = []
  const T = fs / f
  for (let i = 0; i < size; i++) {
    let index = (i + T / 4) % T
    lut.push(
      (index) < (T / 2)
      ? (-1 + 4 * index / T) * amplitude
      : (+3 - 4 * index / T) * amplitude
    )
  }
  return makeReturn(lut, useCounter)
}

const Sawtoothwave = (size, f, fs, amplitude = 1, inverted = false, useCounter = true) => {
  let lut = []
  const T = fs / f
  const inv = inverted ? -1 : 1
  for (let i = 0; i < size; i++) {
    lut.push((-1 + 2 * (i % T) / T) * amplitude * inv)
  }
  return makeReturn(lut, useCounter)
}

module.exports = {
  Sinewave,
  Squarewave,
  Trianglewave,
  Sawtoothwave
}
