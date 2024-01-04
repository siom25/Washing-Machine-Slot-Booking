document.addEventListener('DOMContentLoaded', function() {
  const bookedSlots = JSON.parse(localStorage.getItem('bookedSlots')) || [];
  renderBookedSlots(bookedSlots);
  removeBookedSlotsFromDropdown(bookedSlots);

  const dateInput = document.getElementById('date');
  const today = new Date();
  dateInput.setAttribute('min', formatDate(today));

  const twoDaysAhead = new Date();
  twoDaysAhead.setDate(twoDaysAhead.getDate() + 2);
  dateInput.setAttribute('max', formatDate(twoDaysAhead));
});

document.getElementById('bookingForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const roomNumber = document.getElementById('roomNumber').value;
  const prnLast3Digits = document.getElementById('prnLast3Digits').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  const bookedSlot = { name, roomNumber, prnLast3Digits, date, time };

  const bookedSlots = JSON.parse(localStorage.getItem('bookedSlots')) || [];
  bookedSlots.unshift(bookedSlot); // Add latest booking at the beginning
  localStorage.setItem('bookedSlots', JSON.stringify(bookedSlots));

  renderBookedSlots(bookedSlots);
  removeBookedSlotFromDropdown(time);

  document.getElementById('name').value = '';
  document.getElementById('roomNumber').value = '';
  document.getElementById('prnLast3Digits').value = '';
  document.getElementById('date').value = '';
});

function renderBookedSlots(bookedSlots) {
  const bookedSlotsList = document.getElementById('bookedSlotsList');
  bookedSlotsList.innerHTML = '';

  bookedSlots.forEach(slot => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <div>Name: ${slot.name}</div>
      <div>Room Number: ${slot.roomNumber}</div>
      <div>PRN Last 3 Digits: ${slot.prnLast3Digits}</div>
      <div>Date: ${slot.date}</div>
      <div>Time Slot: ${slot.time}</div>
    `;
    bookedSlotsList.appendChild(listItem);
  });
}

function removeBookedSlotsFromDropdown(bookedSlots) {
  bookedSlots.forEach(slot => {
    removeBookedSlotFromDropdown(slot.time);
  });
}

function removeBookedSlotFromDropdown(time) {
  const dropdownOptions = document.getElementById('time').options;
  for (let i = 0; i < dropdownOptions.length; i++) {
    if (dropdownOptions[i].value === time) {
      dropdownOptions[i].remove();
      break;
    }
  }
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
