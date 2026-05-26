from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)
app.secret_key = "find-my-book-secret"

books = [
    {"id": 1, "title": "The Python Journey", "author": "A. Developer", "price": 19.99},
    {"id": 2, "title": "Data Science Essentials", "author": "B. Analyst", "price": 24.99},
    {"id": 3, "title": "Web Design with Flask", "author": "C. Engineer", "price": 17.5},
    {"id": 4, "title": "Machine Learning Basics", "author": "D. Scientist", "price": 29.99},
    {"id": 5, "title": "Digital Marketing Guide", "author": "E. Marketer", "price": 15.49},
]

orders = []


@app.route("/")
def home():
    return render_template("index.html", books=books, orders=orders)


@app.route("/order", methods=["POST"])
def order_book():
    book_id = int(request.form.get("book_id", 0))
    customer_name = request.form.get("customer_name", "").strip()
    customer_email = request.form.get("customer_email", "").strip()
    quantity = int(request.form.get("quantity", 1))

    if not customer_name or not customer_email:
        flash("Please enter your name and email to place an order.", "error")
        return redirect(url_for("home"))

    book = next((book for book in books if book["id"] == book_id), None)
    if not book:
        flash("Selected book was not found. Please choose a valid book.", "error")
        return redirect(url_for("home"))

    order = {
        "customer_name": customer_name,
        "customer_email": customer_email,
        "book_title": book["title"],
        "quantity": quantity,
        "total": quantity * book["price"],
    }
    orders.append(order)
    flash(f"Order placed for {quantity} x {book['title']}!", "success")
    return redirect(url_for("home"))


if __name__ == "__main__":
    app.run(debug=True, port=5000)
