import React, { useState } from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DateRangePicker } from 'react-date-range'

const DateSlider = ({ onDateChange, onFilterChange }) => {
  
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  })

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection
    setDateRange(ranges.selection)

    if (startDate && endDate) {
      onDateChange(startDate, endDate)
      onFilterChange(startDate, endDate)
    }
  }

  const handleClearFilter = () => {
    const clearedRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }

    setDateRange(clearedRange)
    onDateChange(null, null)
    onFilterChange(null, null)
  }

  return (
    <>
      <h4 className="mb-3">Filter Bookings By Date</h4>
      <DateRangePicker
        ranges={[dateRange]}
        onChange={handleSelect}
        className="mb-4"
        moveRangeOnFirstSelection={false}
      />
      <button className="btn btn-secondary mt-2" onClick={handleClearFilter}>
        Clear Filter
      </button>
    </>
  )
}

export default DateSlider

