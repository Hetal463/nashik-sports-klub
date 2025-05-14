document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bookingForm');
  const timeSelect = document.getElementById('time');
  const dateInput = document.getElementById('date');
  const facilitySelect = document.getElementById('facility');

  async function disableBookedSlots() {
    const res = await fetch('https://nashik-sports-klub.onrender.com/api/bookings');
    const bookings = await res.json();
    const selectedDate = dateInput.value;
    const selectedFacility = facilitySelect.value;

    [...timeSelect.options].forEach(opt => opt.disabled = false);

    bookings.forEach(b => {
      if (b.date === selectedDate && b.facility === selectedFacility) {
        const option = [...timeSelect.options].find(o => o.value === b.time);
        if (option) option.disabled = true;
      }
    });
  }

  dateInput.addEventListener('change', disableBookedSlots);
  facilitySelect.addEventListener('change', disableBookedSlots);

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const date = dateInput.value;
      const time = timeSelect.value;
      const facility = facilitySelect.value;
      const address = "Nasik Sports Klub, ABC Road, Nashik";

      const booking = { name, phone, date, time, facility };

      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
      });

      const result = await res.json();
      const msg = document.getElementById('responseMessage');
      msg.textContent = result.message || 'Error!';
      msg.style.color = res.ok ? 'green' : 'red';

      if (res.ok) {
        form.reset();
        disableBookedSlots();

        // ✅ WhatsApp message fallback
        const whatsappMsg = `✅ Booking Confirmed!\nName: ${name}\nFacility: ${facility}\nDate: ${date}\nTime: ${time}\n📍 Address: ${address}`;
        const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMsg)}`;
        window.open(waLink, '_blank'); // open WhatsApp link in new tab
      }
    });
  }
});
