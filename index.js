function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    const employee = {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee;
}

function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(record => createEmployeeRecord(record));
}

function createTimeInEvent(employeeRecord, dateStamp) {
    const hourDate = dateStamp.split(' ')
    const timeIn = {
        type: "TimeIn",
        hour: parseInt(hourDate[1], 10),
        date: hourDate[0]
    }
    employeeRecord.timeInEvents.push(timeIn)
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    const hourDate = dateStamp.split(' ')
    const timeOut = {
        type: "TimeOut",
        hour: parseInt(hourDate[1], 10),
        date: hourDate[0]
    }
    employeeRecord.timeOutEvents.push(timeOut)
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    let timeIn;
    let timeOut;
    employeeRecord.timeInEvents.forEach(element => {
        if(element.date === date){
          timeIn = element.hour
        }})
      employeeRecord.timeOutEvents.forEach(element => {
        if(element.date === date){
          timeOut = element.hour
        }})
    let hours = (timeOut - timeIn) / 100
    return hours
  }

function wagesEarnedOnDate(employeeRecord, date) {
    let hours = hoursWorkedOnDate(employeeRecord, date)
    let wage = employeeRecord.payPerHour
    let wagesEarned = hours * wage
    return wagesEarned
}

function allWagesFor(employeeRecord) {
    const allDates = []
    const allWages = []
    employeeRecord.timeInEvents.forEach(element => allDates.push(element.date))
    allDates.forEach(element => allWages.push(wagesEarnedOnDate(employeeRecord, element)))
    return allWages.reduce((accumulator, value) => accumulator + value)
}

function calculatePayroll(employeeRecords) {
    const payroll = []
    employeeRecords.forEach(employee => payroll.push(allWagesFor(employee)))
    return payroll.reduce((accumulator, value) => accumulator + value)
}