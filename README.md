# Portfolio Website

This is a personal portfolio website that showcases my skills, projects, education, and services. The website is built using modern web technologies and features a contact form that uses Node.js and MongoDB to store messages sent by users.

## Features
- Responsive and modern UI/UX design.
- Animated elements using AOS (Animate On Scroll) library.
- A contact form that stores user messages in MongoDB.
- Integration with social media links.
- Display of skills, education, and completed projects.

## Technologies Used
### Front-End:
- HTML5
- CSS3
- JavaScript (ES6+)
- React.js
- Next.js
- Tailwind CSS
- Bootstrap
- AOS (Animate On Scroll)

### Back-End:
- Node.js
- Express.js
- MongoDB (for storing contact messages)

## Installation and Setup
To run this project locally, follow these steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mahmoudfattah/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MongoDB**
   - Ensure MongoDB is installed and running locally or provide a connection string for a cloud database (e.g., MongoDB Atlas).
   - Create a `.env` file in the root directory and add the following:
     ```env
     MONGO_URI=your_mongodb_connection_string
     PORT=5000
     ```

4. **Start the server**
   ```bash
   node server.js
   ```

5. **Run the front-end**
   If using Next.js:
   ```bash
   npm run dev
   ```
   If using a static HTML/CSS/JS setup, simply open `index.html` in a browser.

## Contact Form Functionality
The contact form allows users to send messages, which are stored in MongoDB. The backend uses Node.js and Express.js to handle form submissions.

### API Endpoint
- `POST /api/contact` - Saves user messages to the database.

## Live Demo
You can check the live demo [here](https://yourwebsite.com).

## Author
**Mahmoud Fattah**
- GitHub: [Mahmoudfattah](https://github.com/Mahmoudfattah)
- LinkedIn: [Profile](https://linkedin.com/in/yourprofile)

## License
This project is licensed under the MIT License.

