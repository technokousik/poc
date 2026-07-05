I like that you chose the simpler approach. For a beginner/intermediate interview project, it's easier to understand and explain, which is more important than using every advanced pattern.

Before we start Phase 3

I want to slightly modify the scope to save you time while still making the project look professional.

Instead of:

Product CRUD
Cart
Orders

We'll build it in this order:

Phase 3A (45 min)
✅ Product Model
✅ Product CRUD
✅ Product Search
✅ Product Pagination

↓

Phase 3B (25 min)
✅ Cart Model
✅ Add to Cart
✅ Get Cart
✅ Remove Cart Item

↓

Phase 3C (20 min)
✅ Order Model
✅ Place Order
✅ Order History

↓

Phase 3D (10 min)
✅ Connect everything with JWT

This is much easier to debug.

Product Model

I recommend not making a separate Category collection.

Instead,

category: "Laptop"

is enough.

Much easier.

Product Schema
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    },

    category:{
        type:String,
        required:true
    },

    brand:{
        type:String
    },

    stock:{
        type:Number,
        default:0
    },

    image:{
        type:String
    },

    rating:{
        type:Number,
        default:4
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Product",productSchema);
Product APIs
GET /products

GET /products/:id

POST /products

PUT /products/:id

DELETE /products/:id
Product Controller

We'll implement

Create Product

↓

Get All Products

↓

Get Product By Id

↓

Update Product

↓

Delete Product

Each function will be only around 15–20 lines.

Very interview friendly.

Cart Model

Simple.

user

products[]

totalPrice

No complex calculations.

Schema

{
    user,

    items:[
        {
            product,
            quantity
        }
    ],

    totalPrice
}
Cart APIs
POST /cart

GET /cart

DELETE /cart/:productId

That's enough.

Order Model
user

products

shippingAddress

paymentMethod

totalAmount

status

Status

Pending

Processing

Delivered

Enough.

Order APIs
POST /orders

GET /orders

No update order yet.

Admin dashboard can update later.

Product Search

Instead of creating another endpoint,

use query params.

Example

GET /products?search=laptop

Controller

const keyword=req.query.search

Then

name contains laptop

Done.

Pagination

Also

GET /products?page=1

5 products/page.

Interviewers like pagination.

Database

After Phase 3 your MongoDB will look like

shopsphere

↓

users

products

carts

orders

Exactly what we need.

One Suggestion (Important)

I don't recommend sending all the code for Phase 3 in one response.

Why?

Phase 3 includes:

3 Models
3 Controllers
3 Route files
CRUD logic
JWT integration

That's roughly 500–700 lines of code. It won't fit in a single response, and if it does, it becomes hard to follow and debug.

Here's the plan I recommend

We'll complete Phase 3 in 4 focused parts, and each part will be fully working before moving to the next:

Part 1: Product Module (Model + Controller + Routes + CRUD + Search + Pagination)
Part 2: Cart Module (Model + Controller + Routes)
Part 3: Order Module (Model + Controller + Routes)
Part 4: Test everything with Postman, connect JWT protection, and verify the complete flow.

This approach is how you'd build it in a real project, and it makes troubleshooting much easier.

We'll start with the Product module first, since everything else (cart and orders) depends on products existing in the database.





-------------------------------------------------------------------------------------------------------------------
Absolutely! Since we've completed Auth + Product Module, I'll give you all the Postman/Thunder Client requests, including the URL, HTTP method, body, and headers.

🔐 AUTH APIs
1. Register User

POST

http://localhost:5000/api/auth/register
Body (JSON)
{
  "name": "Sudeshna Das",
  "email": "sudeshna@gmail.com",
  "password": "Password@123"
}
Expected Response
{
  "success": true,
  "message": "Registration Successful",
  "token": "eyJhbGc...",
  "user": {
    "_id": "...",
    "name": "Sudeshna Das",
    "email": "sudeshna@gmail.com",
    "role": "customer"
  }
}
2. Register Admin (For Testing Only)

Instead of creating another API,

Register normally

{
  "name": "Admin",
  "email": "admin@gmail.com",
  "password": "Admin@123"
}

Then open MongoDB Compass

shopsphere

↓

users

↓

Edit Document

↓

role

↓

customer

↓

admin

Save.

Now login again.

3. Login

POST

http://localhost:5000/api/auth/login
Body
{
  "email": "admin@gmail.com",
  "password": "Admin@123"
}

Copy the JWT token from the response.

4. Profile

GET

http://localhost:5000/api/auth/profile

Headers

Authorization

Bearer YOUR_JWT_TOKEN

No Body.

📦 PRODUCT APIs
1. Create Product (Admin Only)

POST

http://localhost:5000/api/products

Headers

Authorization

Bearer YOUR_ADMIN_TOKEN
Body
Laptop
{
  "name": "MacBook Air M4",
  "description": "Apple M4 Chip Laptop",
  "price": 99999,
  "category": "Laptop",
  "brand": "Apple",
  "image": "https://dummyimage.com/macbook.jpg",
  "stock": 20
}
Mobile
{
  "name": "Samsung Galaxy S25",
  "description": "Flagship Android Phone",
  "price": 74999,
  "category": "Mobile",
  "brand": "Samsung",
  "image": "https://dummyimage.com/s25.jpg",
  "stock": 30
}
Headphones
{
  "name": "Sony WH-1000XM6",
  "description": "Noise Cancelling Headphones",
  "price": 32999,
  "category": "Accessories",
  "brand": "Sony",
  "image": "https://dummyimage.com/sony.jpg",
  "stock": 15
}
Keyboard
{
  "name": "Logitech MX Keys",
  "description": "Wireless Keyboard",
  "price": 9999,
  "category": "Accessories",
  "brand": "Logitech",
  "image": "https://dummyimage.com/keyboard.jpg",
  "stock": 50
}
Mouse
{
  "name": "Logitech MX Master 3S",
  "description": "Wireless Mouse",
  "price": 7999,
  "category": "Accessories",
  "brand": "Logitech",
  "image": "https://dummyimage.com/mouse.jpg",
  "stock": 40
}
2. Get All Products

GET

http://localhost:5000/api/products

No Body.

3. Search Products
GET

http://localhost:5000/api/products?search=apple

or

GET

http://localhost:5000/api/products?search=logitech

No Body.

4. Pagination
GET

http://localhost:5000/api/products?page=1

Second page

GET

http://localhost:5000/api/products?page=2
5. Search + Pagination
GET

http://localhost:5000/api/products?search=sony&page=1
6. Get Product By ID

Copy any Product ID

Example

68703bb1db81...

Use

GET

http://localhost:5000/api/products/68703bb1db81...
7. Update Product

PUT

http://localhost:5000/api/products/PRODUCT_ID

Headers

Authorization

Bearer ADMIN_TOKEN
Body
{
  "price": 87999,
  "stock": 18
}

Another Example

{
  "price": 65999,
  "category": "Gaming Laptop"
}
8. Delete Product

DELETE

http://localhost:5000/api/products/PRODUCT_ID

Headers

Authorization

Bearer ADMIN_TOKEN

No Body.

Testing RBAC
Customer tries to Create Product

Login using customer account.

Copy token.

Call

POST /products

You'll receive

{
  "success": false,
  "message": "Access Denied! Admin only."
}

Perfect.

Current API Summary
Method	API	Protected	Admin
POST	/api/auth/register	❌	❌
POST	/api/auth/login	❌	❌
GET	/api/auth/profile	✅	❌
GET	/api/products	❌	❌
GET	/api/products/:id	❌	❌
POST	/api/products	✅	✅
PUT	/api/products/:id	✅	✅
DELETE	/api/products/:id	✅	✅




Bonus: Create Sample Products Quickly

To properly test search and pagination, create about 10–12 products across different categories:

Product	Category
MacBook Air M4	Laptop
Dell XPS 13	Laptop
Lenovo ThinkPad	Laptop
Samsung Galaxy S25	Mobile
iPhone 17	Mobile
Google Pixel 10	Mobile
Sony WH-1000XM6	Accessories
Logitech MX Keys	Accessories
Logitech MX Master 3S	Accessories
Apple Watch Series 11	Wearables