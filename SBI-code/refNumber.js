const currentDate = new Date();

// Get the day, month, and year components
const day = currentDate.getDate().toString().padStart(2, '0');
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Note: Months are zero-based, so we add 1
const year = currentDate.getFullYear().toString();

// Get the hour, minute, and second components
const hours = currentDate.getHours().toString().padStart(2, '0');
const minutes = currentDate.getMinutes().toString().padStart(2, '0');
const seconds = currentDate.getSeconds().toString().padStart(2, '0');

// Create the DDMMYYYYHHMMSS formatted date
const formattedDate = `${day}${month}${year}${hours}${minutes}${seconds}`;

// Add the "YBAPIREQ" prefix
const referenceNumber = `YBAPIREQ${formattedDate}`;

console.log(referenceNumber);
