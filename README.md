# Travel Journal Web Application

## The Travel Journal Web Application is a full-stack React-based web application designed to serve as a personalized travel diary. The app allows users to document their travel experiences, explore cities and countries, and interact with their travel data in an engaging and user-friendly interface.

![Alt text](/public/worldWise.png "Travel Journal Web Application")

## Key Features:

# User Authentication:

- The app incorporates user authentication, allowing users to log in securely with a fake authentication context.

- Authenticated users gain access to personalized features and data storage.

# Interactive Map:

- The application features an interactive map using the React Leaflet library, displaying markers for each city in the user's travel journal.
- Users can click on map markers to view city details and navigate to the city's Wikipedia page.

# Dynamic Routing:

- Utilizing React Router, the app supports dynamic routing, enabling users to access specific pages such as the home page, pricing, product information, and user login.

# Lazy Loading:

- The app implements lazy loading for improved performance, loading components only when needed, and incorporating a spinner for a seamless user experience.

# Data Persistence:

- The app employs local storage for data persistence, ensuring that user travel data is saved even after closing and reopening the application.

# Protected Routes:

- The application incorporates protected routes, ensuring that certain pages are accessible only to authenticated users. Unauthorized users are redirected to the login page.

# Form Integration:

- Users can add new entries to their travel journal using a form that automatically populates location details based on the user's geolocation or map click.

# Context API Usage:

- The React Context API is employed to manage global state, facilitating seamless communication between components and enhancing the scalability of the application.

## Technologies Used:

- React (Hooks, Context API, Lazy Loading)
- React Router
- React Leaflet for interactive maps
- Custom hooks for geolocation and URL position parsing
- Local storage for data persistence
- CSS Modules for styling

## Skills Demonstrated:

- Frontend development using React, including state management and routing.
- Integration of third-party libraries for interactive maps.
- Implementation of user authentication and protected routes.
- Effective use of lazy loading for improved performance.
- Utilization of custom hooks for geolocation and URL handling.
- Data persistence and storage management using local storage.
- Responsive and visually appealing UI design with CSS Modules.

### 🎉 Shoutout to Jonas Schmedtmann! 🚀

A big thank you to Jonas Schmedtmann for being an inspiring and dedicated teacher! Your expertise and passion for web development have been instrumental in shaping the skills and knowledge of your students, including the creator of this amazing Travel Journal Web Application.
#JonasSchmedtmann #WebDevelopmentMentor #Inspiration
(https://www.udemy.com/user/jonasschmedtmann/)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
