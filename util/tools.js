const doesADateRangeOverlap = (dbDateRanges, startDate, endDate) => {
  return !!dbDateRanges.find(range => {
    return !(
      (startDate < range.from && endDate < range.from) ||
      (endDate > range.to && startDate > range.to)
    )
  })
}

module.exports = {
  doesADateRangeOverlap
}
