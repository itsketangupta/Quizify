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

async function saveEmail() {
  const email = document.getElementById("email").value;

  console.log("Button clicked"); // 👈 add this

  await fetch("/api/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  });

  alert("Saved 🚀");
}
