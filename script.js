function toggleLoginForm() {
  const form = document.getElementById("loginForm");
  form.style.display = form.style.display === "none" || form.style.display === "" ? "block" : "none";
}

function submitLogin() {
  const id = document.getElementById("loginId").value;
  const pass = document.getElementById("loginPassword").value;
  if (id && pass) {
    alert(`Welcome, ${id}!`);
    document.getElementById("loginForm").style.display = "none";
  } else {
    alert("Please enter both ID and Password.");
  }
}

const sliderImages = [
  "https://media.istockphoto.com/id/1443030610/photo/young-woman-holding-a-plate-with-a-tasty-burger.jpg?s=612x612&w=0&k=20&c=VAZgRv0C8wNKJkv8TLwqB_NKJKkbEVUEplSRHsh7QsQ=",
  "https://img.freepik.com/premium-photo/happy-funny-young-woman-with-hamburger-eating-fast-food-cafe_338491-3261.jpg",
  "https://img.freepik.com/free-photo/view-from-tanned-womans-stylish-outfits-talking-enjoying-tasty-food-street-cafe_197531-18196.jpg",
  "https://images.squarespace-cdn.com/content/v1/5f9decf1e529e27a4705d448/1744911507826-6VLP8L30R3TMGT21I4ZF/MacBook+Pro+-+29banner-25.png?format=2500w"
];

let currentImageIndex = 0;
const sliderImageElement = document.getElementById("sliderImage");

function slideImage(direction) {
  currentImageIndex += direction;
  if (currentImageIndex >= sliderImages.length) currentImageIndex = 0;
  if (currentImageIndex < 0) currentImageIndex = sliderImages.length - 1;
  sliderImageElement.src = sliderImages[currentImageIndex];
  sliderImageElement.alt = `Restaurant image ${currentImageIndex + 1}`;
}

let autoSlideInterval;
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        slideImage(1);
    }, 3000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

window.onload = startAutoSlide;

const imageSliderContainer = document.querySelector('.image-slider');
imageSliderContainer.addEventListener('mouseenter', stopAutoSlide);
imageSliderContainer.addEventListener('mouseleave', startAutoSlide);


function toggleSidebar() {
  document.getElementById("sidebar").style.left = "0";
  document.getElementById("overlay").style.display = "block";
}

function closeSidebar() {
  document.getElementById("sidebar").style.left = "-260px";
  document.getElementById("overlay").style.display = "none";
}

function closeSidebarAndScroll(targetId) {
  document.getElementById("sidebar").style.left = "-260px";
  document.getElementById("overlay").style.display = "none";

  setTimeout(() => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  }, 50);
}

// Cart 
let cart = {}; 

function updateQuantity(buttonElement, change) {
  const menuItem = buttonElement.closest('.menu-item');
  const quantitySpan = menuItem.querySelector('.quantity');
  let currentQuantity = parseInt(quantitySpan.textContent);

  currentQuantity = Math.max(0, currentQuantity + change); // Ensure quantity doesn't go below 0
  quantitySpan.textContent = currentQuantity;
}

function addToCart(buttonElement) {
  const menuItem = buttonElement.closest('.menu-item');
  const itemName = menuItem.dataset.itemName;
  const itemPrice = parseFloat(menuItem.dataset.itemPrice);
  const quantity = parseInt(menuItem.querySelector('.quantity').textContent);

  if (quantity > 0) {
    if (cart[itemName]) {
      cart[itemName].quantity += quantity;
    } else {
      cart[itemName] = { quantity: quantity, price: itemPrice };
    }
    alert(`${quantity} ${itemName}(s) added to cart!`);
  } else {
    alert(`Please select a quantity for ${itemName}.`);
  }
  updateCartDisplay();
  // Reset quantity after adding to cart
  menuItem.querySelector('.quantity').textContent = 0;
}

function removeItemFromCart(itemName) {
    if (confirm(`Are you sure you want to remove ${itemName} from your cart?`)) {
        delete cart[itemName];
        updateCartDisplay();
    }
}

function updateCartDisplay() {
  const cartItemsDiv = document.getElementById("cart-items");
  const cartTotalSpan = document.getElementById("cart-total");
  let total = 0;
  cartItemsDiv.innerHTML = ""; // Clear current display

  if (Object.keys(cart).length === 0) {
    cartItemsDiv.innerHTML = "<p style='text-align: center;'>Your cart is empty.</p>";
  } else {
    for (const item in cart) {
      const itemData = cart[item];
      const itemTotalPrice = itemData.quantity * itemData.price;
      total += itemTotalPrice;

      const p = document.createElement("p");
      p.innerHTML = `${item} x ${itemData.quantity} - ₹${itemTotalPrice.toFixed(2)} <button class="remove-item-btn" onclick="removeItemFromCart('${item}')">Remove</button>`;
      cartItemsDiv.appendChild(p);
    }
  }
  cartTotalSpan.textContent = total.toFixed(2);
}

function confirmOrder() {
  if (Object.keys(cart).length === 0) {
    alert("Your cart is empty. Please add some items to order.");
    return;
  }

  let orderSummary = "Your Order:\n\n";
  let totalAmount = 0;
  for (const item in cart) {
    const itemData = cart[item];
    const itemTotal = itemData.quantity * itemData.price;
    orderSummary += `${item} x ${itemData.quantity} = ₹${itemTotal.toFixed(2)}\n`;
    totalAmount += itemTotal;
  }
  orderSummary += `\nTotal: ₹${totalAmount.toFixed(2)}\n\n`;
  orderSummary += "Thank you for your order! We'll process it shortly. Enjoy your MEALBITE!";

  alert(orderSummary);
  cart = {}; // Clear cart after order
  updateCartDisplay(); // Update display to show empty cart
  // Optional: Add a more specific message after confirming an order
  document.getElementById("cart-items").innerHTML = "<p style='text-align: center; color: #555;'>Your order has been placed successfully! Your cart is now empty.</p>";
}


// Chatbot 
function toggleChatbot() {
  const chatbotBox = document.getElementById("chatbot-box");
  chatbotBox.style.display = chatbotBox.style.display === "none" || chatbotBox.style.display === "" ? "flex" : "none";
  if (chatbotBox.style.display === "flex") {
    addBotMessage("Hello! Welcome to MEALBITE Junction. How can I help you today?");
  }
}

function addMessage(message, type) {
  const messagesDiv = document.getElementById("chatbot-messages");
  const messageElement = document.createElement("div");
  messageElement.classList.add("chat-message", `${type}-message`);
  messageElement.innerHTML = message; // message can conatin
  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to bottom
}

function addUserMessage(message) {
  addMessage(message, "user");
}

function addBotMessage(message) {
  addMessage(message, "bot");
}

function handleChatInput(event) {
  if (event.key === "Enter") {
    const inputField = document.getElementById("chatbot-input");
    const userMessage = inputField.value.trim();
    if (userMessage) {
      addUserMessage(userMessage);
      processUserMessage(userMessage);
      inputField.value = "";
    }
  }
}

function processUserMessage(message) {
    const lowerCaseMessage = message.toLowerCase();
    let botResponse = "I'm sorry, I don't understand that. Please try asking about our menu, ordering, or contact information. You can also ask about specific item prices or our delivery hours!";

    if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi") || lowerCaseMessage.includes("hey")) {
        botResponse = "Hi there! Welcome to MEALBITE Junction! How can I help you today?";
    } else if (lowerCaseMessage.includes("menu")) {
        botResponse = "Absolutely! You can explore our delicious menu by scrolling down to the 'Our Specials' and 'Beverages & Snacks' sections, or simply click on '📋 Menu' in the sidebar to jump there directly. What are you craving?";
    } else if (lowerCaseMessage.includes("order") || lowerCaseMessage.includes("cart")) {
        botResponse = "To place an order, first select the quantity for your desired items on the menu, then click 'Add to Cart'. Once you're done, scroll up to the '🛒 Your Cart' section to review your selections and confirm your order!";
    } else if (lowerCaseMessage.includes("contact") || lowerCaseMessage.includes("reach us") || lowerCaseMessage.includes("phone") || lowerCaseMessage.includes("email")) {
        botResponse = "You can easily reach us! Send us an email at **mealbite@example.com** or give us a call at **1800-0000-200**. All our contact details are also available in the '📞 Contact Us' section.";
    } else if (lowerCaseMessage.includes("address") || lowerCaseMessage.includes("location")) {
        botResponse = "We are an online-only delivery restaurant! This means we focus on bringing fresh and delicious food directly to your doorstep, so we don't have a physical dining location.";
    } else if (lowerCaseMessage.includes("timing") || lowerCaseMessage.includes("hours") || lowerCaseMessage.includes("open")) {
        botResponse = "We're open and ready to serve you from **9 AM to 10 PM every day**! Feel free to place your order anytime within these hours.";
    } else if (lowerCaseMessage.includes("delivery")) {
        botResponse = "Yes, we do! We offer **quick and reliable home delivery**. Just place your order on our website, and we'll bring it to you.";
    } else if (lowerCaseMessage.includes("payment") || lowerCaseMessage.includes("pay")) {
        botResponse = "We offer several convenient payment options: **credit/debit cards, net banking, and all major UPI apps** are accepted.";
    } else if (lowerCaseMessage.includes("chicken tacos") || lowerCaseMessage.includes("tacos")) {
        botResponse = "Our delicious Chicken Tacos are a must-try at **₹399**! Perfect for a hearty meal.";
    } else if (lowerCaseMessage.includes("paneer butter masala") || lowerCaseMessage.includes("paneer")) {
        botResponse = "Our rich Paneer Butter Masala is a vegetarian delight, priced at **₹299**. Enjoy it with some fresh bread!";
    } else if (lowerCaseMessage.includes("chicken biryani") || lowerCaseMessage.includes("biryani")) {
        botResponse = "Craving a flavorful meal? Our Chicken Biryani is available for **₹249**!";
    } else if (lowerCaseMessage.includes("caesar salad") || lowerCaseMessage.includes("salad")) {
        botResponse = "Our fresh Caesar Salad is a light and healthy option at just **₹49**.";
    } else if (lowerCaseMessage.includes("soft drink") || lowerCaseMessage.includes("soda")) {
        botResponse = "Quench your thirst with a Soft Drink for just **₹29**!";
    } else if (lowerCaseMessage.includes("pizza")) {
        botResponse = "Our Classic Cheese Pizza is a fan favorite at **₹69**!";
    } else if (lowerCaseMessage.includes("coffee")) {
        botResponse = "Need a pick-me-up? Our Hot Coffee is only **₹59**.";
    } else if (lowerCaseMessage.includes("tea")) {
        botResponse = "A comforting cup of Tea is available for **₹39**.";
    } else if (lowerCaseMessage.includes("juice")) {
        botResponse = "Refresh yourself with our Fresh Juice for **₹79**.";
    } else if (lowerCaseMessage.includes("samosa")) {
        botResponse = "Grab a crispy Samosa for just **₹29**!";
    } else if (lowerCaseMessage.includes("momos")) {
        botResponse = "Our delicious Steamed Momos are priced at **₹99**.";
    } else if (lowerCaseMessage.includes("chowmin") || lowerCaseMessage.includes("noodles")) {
        botResponse = "Enjoy our flavorful Chowmin noodles for **₹119**.";
    } else if (lowerCaseMessage.includes("chat") || lowerCaseMessage.includes("chaat")) {
        botResponse = "Spice up your day with our tasty Aloo Chat for **₹69**.";
    } else if (lowerCaseMessage.includes("burger")) {
        botResponse = "Our satisfying Burger is available for **₹119**.";
    } else if (lowerCaseMessage.includes("dahi bara") || lowerCaseMessage.includes("dahi vada")) {
        botResponse = "Cool down with our refreshing Dahi Bara for **₹79**.";
    } else if (lowerCaseMessage.includes("thanks") || lowerCaseMessage.includes("thank you")) {
        botResponse = "You're most welcome! Enjoy your meal, and let me know if you need anything else.";
    } else if (lowerCaseMessage.includes("bye") || lowerCaseMessage.includes("goodbye")) {
        botResponse = "Goodbye! Hope to see your order soon. Have a great day!";
    }

    setTimeout(() => addBotMessage(botResponse), 500); // Simulate typing delay
}