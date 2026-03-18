Backend Entrance Test - Phan Quang Quốc
Part1 - Node.js Fresher Entrance Test
Q1 - JavaScript Async
Answer:
1. Start
   End
   Promise
   Timeout

2. Synchronous run first. Promise is microtask run  before setTimeout(macrotask)

Q2 – Node.js API Design
Answer:
1. API endpoints

Action             Method            Endpoint
Create Todo        POST              /todos
Get List           GET               /todos
Update             PUT               /todos/:id
Delete             DELETE            /todos/:id

2. Example Request (Create)

{
    "title": "Hello World",
    "completed": false
}

3. Example Response

{
    "id": 1,
    "title": "Hello World",
    "completed: false,
    "createdAt": "2026-03-17T10:00:00.000Z"
}

Q3 – Coding (Node.js)

Solution 1: forEach

function groupUsersByAge(users) {
    const result = {};
    users.forEach(user => {
        if(!result[user.age]) {
            result[user.age] = [];
        }
        result[user.age].push(user.name);
    });
    return result;
}

Solution 2: for loop

function groupUsersByAge(users) {
    const result = {};

    for (let user of users) {
        if (!result[user.age]) {
            result[user.age] = [];
        }
        result[user.age].push(user.name);
    }
    return result;
}

Q4 – Database Thinking
Answer:
1. Get the 10 newest users

SELECT * FROM users 
ORDER BY created_at DESC 
LIMIT 10;

2. Find User by email

SELECT * FROM users
WHERE email = 'user@example.com';

3. Count the total number of users.

SELECT COUNT(*) AS total FROM users ;

Q5 – Debug & Thinking
Answer:
1. db.query is async but doesn't use await.

2. Fix

app.get("/users", async (req, res) => {
 try {
    const users = await db.query("SELECT * FROM users");
    res.json(users);
 } catch (err) {
    res.status(500).json( {error: err.message });
 }
});

3. db.query() returns a Promise. If you don’t use await, it returns a Promise object, not the actual data. Express will send incorrect data → leading to bugs.

3.1 Optional
Solution(Backend): Join on SQL
SELECT p.*, u.name as author_name FROM post p
JOIN users u ON p.authorId = u.id;

Part 2 - Node.js Mini Project
Backend - Vercel : https://task-manager-xdw0.onrender.com/
FrontEnd - CloudeFlare : https://task-manager-bnp.pages.dev/

