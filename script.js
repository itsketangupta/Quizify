const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".faq-content");

let openState = {};

tabs.forEach(tab => {
  tab.addEventListener("click", () => {

    tabs.forEach(t => t.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));

    tab.classList.add("active");

    const activeContent = document.getElementById(tab.dataset.tab);
    activeContent.classList.add("active");

    const items = activeContent.querySelectorAll(".faq-item");
    items.forEach((item, index) => {
      if (openState[tab.dataset.tab + index]) {
        item.classList.add("active");
      }
    });
  });
});

document.querySelectorAll(".faq-item").forEach((item, index) => {
  item.addEventListener("click", () => {

    const parentId = item.closest(".faq-content").id;
    const key = parentId + index;

    item.classList.toggle("active");

    if (item.classList.contains("active")) {
      openState[key] = true;
    } else {
      delete openState[key];
    }
  });
});

function showForm() {
  document.getElementById("form").style.display = "block";

  document.getElementById("Sign_up").style.display = "none";
}

let emails = [];

async function handleEmail() {
  const input = document.getElementById("email");
  const msg = document.getElementById("msg");
  const email = input.value.trim();

  if (!email.endsWith("@gmail.com")) {
    input.classList.add("shake");
    input.style.border = "1px solid red";
    msg.innerText = "Only Gmail allowed!";
    msg.style.color = "red";

    setTimeout(() => input.classList.remove("shake"), 400);
    return;
  }

  if (emails.includes(email)) {
    msg.innerText = "You already joined the waitlist!";
    msg.style.color = "orange";
    return;
  }

  try {
    const res = await fetch("/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    if (res.ok) {
      emails.push(email);
      msg.innerText = "Added successfully 🎉";
      msg.style.color = "green";
      input.value = "";
    } else {
      msg.innerText = "Error, try again!";
      msg.style.color = "red";
    }

  } catch (err) {
    msg.innerText = "Server error!";
    msg.style.color = "red";
  }
}