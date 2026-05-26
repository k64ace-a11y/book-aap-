const books = [
  { id: 1, title: "The Python Journey", author: "A. Developer", price: 19.99 },
  { id: 2, title: "Data Science Essentials", author: "B. Analyst", price: 24.99 },
  { id: 3, title: "Web Design with Flask", author: "C. Engineer", price: 17.5 },
  { id: 4, title: "Machine Learning Basics", author: "D. Scientist", price: 29.99 },
  { id: 5, title: "Digital Marketing Guide", author: "E. Marketer", price: 15.49 },
];

const orders = [];
const bookGrid = document.getElementById("book-grid");
const orderList = document.getElementById("order-list");
const emptyOrders = document.getElementById("empty-orders");
const notifications = document.getElementById("notifications");

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function renderBooks() {
  bookGrid.innerHTML = books
    .map(
      (book) => `
        <article class="book-card">
          <h3>${book.title}</h3>
          <p class="author">by ${book.author}</p>
          <p class="price">${formatPrice(book.price)}</p>
          <form class="book-form" data-book-id="${book.id}">
            <label>
              Name
              <input type="text" name="customer_name" placeholder="Your name" required />
            </label>
            <label>
              Email
              <input type="email" name="customer_email" placeholder="Your email" required />
            </label>
            <label>
              Qty
              <input type="number" name="quantity" value="1" min="1" required />
            </label>
            <button type="submit">Order Now</button>
          </form>
        </article>
      `
    )
    .join("");

  document.querySelectorAll(".book-form").forEach((form) => {
    form.addEventListener("submit", handleOrderSubmit);
  });
}

function showNotification(message, type = "success") {
  const element = document.createElement("div");
  element.className = `notification ${type}`;
  element.textContent = message;
  notifications.appendChild(element);
  setTimeout(() => element.remove(), 4500);
}

function renderOrders() {
  if (orders.length === 0) {
    orderList.innerHTML = "";
    emptyOrders.style.display = "block";
    return;
  }

  emptyOrders.style.display = "none";
  orderList.innerHTML = orders
    .map(
      (order) => `
        <li>
          <strong>${order.customer_name}</strong> ordered ${order.quantity} x <em>${order.book_title}</em> for ${formatPrice(order.total)}.
        </li>
      `
    )
    .join("");
}

function handleOrderSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const bookId = Number(form.dataset.bookId);
  const book = books.find((entry) => entry.id === bookId);
  const customerName = form.customer_name.value.trim();
  const customerEmail = form.customer_email.value.trim();
  const quantity = Number(form.quantity.value);

  if (!customerName || !customerEmail) {
    showNotification("Please enter your name and email.", "error");
    return;
  }

  const order = {
    book_title: book.title,
    customer_name: customerName,
    customer_email: customerEmail,
    quantity,
    total: book.price * quantity,
  };

  orders.unshift(order);
  renderOrders();
  form.reset();
  showNotification(`Order placed for ${quantity} x ${book.title}!`);
}

renderBooks();
renderOrders();
