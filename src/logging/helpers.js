

const missingArgument = `  Missing Argument:`

const missingParameters = (parameter, type) => {
  if (parameter && type) {
    return console.log(`${missingArgument} please pass ${parameter} value if using ${type}`)
  }
  return console.log(`${missingArgument} please pass ${parameter}`)
}


module.exports = {
  missingParameters
}
