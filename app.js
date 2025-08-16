const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

document.getElementById("contactForm").addEventListener("submit", async function (e) {
  // Prevent default form submission
  e.preventDefault();
  
  // Get form and status elements
  const form = e.target;
  const status = document.getElementById("formStatus");
  
  // Show sending status
  status.textContent = "Sending...";
  
  try {
    // Send form data to Formspree
    const response = await fetch("https://formspree.io/f/mzzvwqon", {
      method: "POST",
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    });
    
    // Check if submission was successful
    if (response.ok) {
      status.textContent = "Message sent successfully!";
      form.reset(); // Clear the form
    } else {
      throw new Error("Failed to send message");
    }
  } catch (error) {
    status.textContent = "Error sending message. Please try again.";
    console.error("Error:", error);
  }
});