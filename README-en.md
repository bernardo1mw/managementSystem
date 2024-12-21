**Customer, Product, and Order Management System Project**  

**Description**  
This project is a comprehensive application that includes a backend developed with NestJS and a frontend built with Next.js. It manages customers (legal entities), products, and orders, utilizing Docker for containerization and PostgreSQL as the database.  

---

**Technologies Used**  

**Backend**  
- Node.js with NestJS  
- PostgreSQL as the database  
- TypeORM for database interaction  
- Containerization with Docker  

**Frontend**  
- Next.js with App Router  
- Material-UI for styling  

---

**Features**  

**Customers (Legal Entities)**  
- Customer listing screen with fields: ID, Company Name, CNPJ, and Email.  
- Button to access the customer registration screen.  
- Integration with the public API [https://www.cnpj.ws](https://www.cnpj.ws) for automatic data filling.  

**Products**  
- Product listing screen with options to edit and delete.  
- Product registration screen with image upload functionality.  
- Product editing screen.  
- Deletion confirmation via modal.  

**Orders**  
- Order listing screen with an option to delete orders.  
- Order creation screen allowing:  
  - Linking customers to orders.  
  - Adding products to orders.  
  - Setting quantities per product.  
- Deletion confirmation via modal.  

**Authentication**  
- Protected routes for system access.  
- User login and registration using Context Provider.  

---

**Setup and Execution**  

**Requirements**  
- Docker and Docker Compose installed.  

**Execution Steps**  
1. Clone the repository:  
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```  
2. Configure the `.env` file:  
   Create a `.env` file in the backend root directory with the following content:  
   ```env
   DATABASE_URL=postgres://postgres:postgres@postgres_db:5432/app_db  
   JWT_SECRET=<your-secret-key>
   ```  
3. Start the containers with Docker Compose:  
   ```bash
   cd backend/  
   docker-compose up -d --build
   ```  
4. Run and access the frontend:  
   ```bash
   cd frontend/  
   npm run build  
   npm run start
   ```  
5. Open your browser and navigate to [http://localhost:3002](http://localhost:3002).  

---

**Initialization Scripts**  
The `init.sql` file will automatically execute during container startup to create the necessary tables in PostgreSQL.  

---

**Future Improvements**  
- Implementation of tests.  
- Addition of OpenID Connect-based authentication.  
- Integration with an image upload service (e.g., S3 or similar).  
- Structured logs for monitoring.  
