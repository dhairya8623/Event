const form = document.getElementById('eventForm');
    const cards = document.getElementById('eventCards');
    const modal = document.getElementById('successModal');

    let events = JSON.parse(localStorage.getItem('events')) || [
      { title: "Opening Keynote", time: "09:00", speaker: "Mr. Arvind Kumar", description: "Kick-off and future insights." },
      { title: "AI & ML", time: "10:30", speaker: "Dr. Radhika Sharma", description: "Understanding AI and Machine Learning." },
      { title: "Lunch Break", time: "13:00", speaker: "-", description: "Enjoy networking and refreshments." },
      { title: "Cloud Computing", time: "14:00", speaker: "Ms. Neha Gupta", description: "Exploring the future of cloud tech." },
      { title: "Closing Talk", time: "17:00", speaker: "Mr. Sandeep Reddy", description: "Wrapping up with inspiration." }
    ];

    function saveEvents() {
      localStorage.setItem('events', JSON.stringify(events));
    }



// function renderCards() {
//   cards.innerHTML = "";
//   events.forEach((ev, index) => {
//     const card = document.createElement("div");
//     card.className = "card";

//     card.innerHTML = `
//       <h3>${ev.title}</h3>
//       <p><strong>Time:</strong> ${ev.time}</p>
//       <p><strong>Speaker:</strong> ${ev.speaker}</p>
//       <button class="edit" onclick="editEvent(${index})">Edit</button>
//       <button class="delete" onclick="deleteEvent(${index})">Delete</button>
//       <button class="view" onclick="viewEvent(${index})">View</button>
//     `;

//     cards.appendChild(card);
//   });
// }

function renderCards() {
  cards.innerHTML = "";
  events.forEach((ev, index) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${ev.title}</h3>
      <p><strong>Time:</strong> ${ev.time}</p>
      <p><strong>Speaker:</strong> ${ev.speaker}</p>
      ${ev.image ? `<img src="${ev.image}" alt="Event Image" style="width: 100%; height: auto; border-radius: 8px; margin-top: 10px;">` : ""}
      <button class="edit" onclick="editEvent(${index})">Edit</button>
      <button class="delete" onclick="deleteEvent(${index})">Delete</button>
      <button class="view" onclick="viewEvent(${index})">View</button>
    `;

    cards.appendChild(card);
  });
}



// 
function editEvent(index) {
  const ev = events[index];
  form.title.value = ev.title;
  form.time.value = ev.time;
  form.speaker.value = ev.speaker;
  form.description.value = ev.description;
  form.setAttribute("data-editing", index);
  form.scrollIntoView({ behavior: "smooth" });
}

function deleteEvent(index) {
  if (confirm("Are you sure you want to delete this event?")) {
    events.splice(index, 1);
    saveEvents();
    renderCards();
  }
}

function viewEvent(index) {
  localStorage.setItem("selectedEvent", index);
  window.location.href = "event.html";  // Redirect to the detailed page
}



    function closeSuccessModal() {
      modal.style.display = "none";
    }



//     form.onsubmit = e => {
//   e.preventDefault();

//   const updatedEvent = {
//     title: form.title.value,
//     time: form.time.value,
//     speaker: form.speaker.value,
//     description: form.description.value,
//   };

//   const editingIndex = form.getAttribute("data-editing");

//   if (editingIndex !== null) {
//     events[editingIndex] = updatedEvent;
//     form.removeAttribute("data-editing");
//   } else {
//     events.push(updatedEvent);
//     modal.style.display = "flex";
//   }

//   saveEvents();
//   renderCards();
//   form.reset();
// };

form.onsubmit = e => {
  e.preventDefault();

  const eventImage = form.eventImage.files[0];  // Get the selected file
  let imageUrl = "";

  if (eventImage) {
    const reader = new FileReader();
    reader.onload = function(event) {
      imageUrl = event.target.result;
      saveEventData(imageUrl);
    };
    reader.readAsDataURL(eventImage);  // Convert the image to base64
  } else {
    saveEventData(imageUrl);  // If no image, save without it
  }
};

function saveEventData(imageUrl) {
  const updatedEvent = {
    title: form.title.value,
    time: form.time.value,
    speaker: form.speaker.value,
    description: form.description.value,
    image: imageUrl,  // Store image URL (base64 string)
  };

  const editingIndex = form.getAttribute("data-editing");

  if (editingIndex !== null) {
    events[editingIndex] = updatedEvent;
    form.removeAttribute("data-editing");
  } else {
    events.push(updatedEvent);
    modal.style.display = "flex";
  }

  saveEvents();
  renderCards();
  form.reset();
}


    renderCards();


    // Dark Mode
const toggleBtn = document.getElementById("toggleDark");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
  document.body.classList.add("dark");
}

toggleBtn.onclick = () => {
  document.body.classList.toggle("dark");
  const theme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);
};