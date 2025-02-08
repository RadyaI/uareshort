# Yes, u are short

# API Documentation

## Setup Project

1. Clone repository:
   ```sh
   git clone https://github.com/RadyaI/uareshort.git
   cd uareshort
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Setup environment variables in `.env`:
   ```env
   DATABASE_URL=<your_database_url>
   JWT_SECRET=<your_secret_key>
   ```
4. Run database migration:
   ```sh
   npx prisma migrate dev
   ```
5. Start the server:
   ```sh
   npm run dev
   ```

---

## API Endpoints

### Auth

#### Register
- **Endpoint:** `POST /api/v1/auth/register`
- **Body:**
  ```json
  {
    "name": "Udin",
    "email": "udin@example.com",
    "role": "User or Admin",
    "password": "udin123"
  }
  ```

#### Login
- **Endpoint:** `POST /api/v1/auth/login`
- **Body:**
  ```json
  {
    "email": "udin@example.com",
    "password": "udin123"
  }
  ```

---

### Link Management

#### Get All Links
- **Endpoint:** `GET /api/v1/link`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <your_token>"
  }
  ```

#### Get Link by Shortcode
- **Endpoint:** `GET /api/v1/link/:shortcode`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <your_token>"
  }
  ```

#### Create Link
- **Endpoint:** `POST /api/v1/link`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <your_token>"
  }
  ```
- **Body:**
  ```json
  {
    "linkName": "Google",
    "originalUrl": "https://google.com",
    "customCode": "mygoogle"
  }
  ```

#### Update Link
- **Endpoint:** `PUT /api/v1/link/:shortcode`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <your_token>"
  }
  ```
- **Body:**
  ```json
  {
    "linkName": "Google Updated",
    "originalUrl": "https://google.com",
    "customCode": "updatedgoogle"
  }
  ```

#### Delete Link
- **Endpoint:** `DELETE /api/v1/link/:shortcode`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <your_token>"
  }
  ```

---

### Analytics

#### Get Analytics
- **Endpoint:** `GET /api/v1/analytic`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <your_token>"
  }
  ```

---

## Example API Call with Fetch

```js
fetch("https://yourapi.com/api/v1/link", {
  method: "GET",
  headers: {
    "Authorization": "Bearer your_token"
  }
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

---

### Made by [Radya](https://radya.fun)

