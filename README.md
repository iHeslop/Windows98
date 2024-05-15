# Windows 98 Replica

**Live Demo:** https://windows98-replica.onrender.com/

## Snippets

- A view of the OS desktop

  ![alt text](<screenshots/Screenshot 2024-05-15 140434.png>)

- Showing an open start menu and applications sub-menu

  ![alt text](<screenshots/Screenshot 2024-05-15 140458.png>)

- Examples of all applications open

  ![alt text](<screenshots/Screenshot 2024-05-15 140529.png>)

---

## Description / Requirements

This is a simple replica of the Windows 98 Operating System, with a functional start menu, submenu's and 3 different applications integrated into the system. You can open and close windows and move them around your screen. The project uses HTML, SCSS and JavaScript, with a big emphasis on styling and UI/UX design.

With this project, the plan was to practice and implement how to:

- Use HTML and SCSS efficiently
- Implement SCSS queries, mixins and overall file structure.
- Correctly index active windows within the viewport.
- Implement error-free applications that function smoothly and well
- Create a functional start menu with selective submenus.
- Design a good interactive UI/UX that accurately replicates the original Windows 98.

The goal of this project is to have students explore and consolidate their understandings of HTML, CSS and JavaScript.
This project will require you to replicate the layout and format of a design/image using CSS, add content via HTML and control the interactive elements via JavaScript.

### The design is going to be that of an operating system.

Please look at the provided image gallery for examples.
You should choose either a portrait (mobile) or landscape (desktop) operating system, you are not expected to create a responsive page that works on both, however it should look good on the chosen orientation at different resolutions/ratios.

### Features

- You will be creating an SPA (Single Page Application)
- Desktop has a wallpaper that fits the viewport
- There will be selectable icons
- Selecting an icon will open an "app", creating a _modal_ to display some content
- Able to close an app
- There will be a selectable menu
- Selecting the menu will display a list of text and icons
- The current time is displayed somewhere

### HTML/SCSS

- Wallpaper scales to fit the viewport
- Minimum 3 icons on desktop
- The menu is positioned in the appropriate place (bottom left on windows, top of the screen on android)
- Apps look consistent
- Menu contains a flex with content inside it
- Apps should be able to contain text, an image or a form

### JavaScript

- Put your js code into separate files
- Your icons and menu should add event listener for the click event, don't use the html onclick attribute
- Give your functions and variables good names
- Use the arrow syntax to declare functions

---

## Build Steps

Clone the repository, and from the directory, and open with Live Server (or other server/browser runtime)

---

## Design Goals / Approach

- The goal of this project was to recreate a basic Windows98 Operating System, while incorporating separate applications which can be accessed and used within the OS.
- I wanted the UI/UX design to be smooth, efficient and error-free.
- I wanted application windows to function as closely as possible to actual windows within operating systems, so correctly indexing the windows if active or not active etc.
- Ability to close and open applications from the desktop icons or the start menu icons.

---

## Features

- **Functioning Operating System:** Basic OS with simple functionality.
- **Applications:** Fully functional minesweeper game, calculator, basic notepad and drum kit.
- **Icons:** Selectable icons on desktop, with ability to close icons.
- **Start Menu:** Selectable start menu, with access to applications through the submenus.
- **Taskbar:** Current time displayed in taskbar.

---

### Technologies:

- **HTML**
- **CSS/SCSS**
- **JavaScript**

---

## Future Goals

- Add more applications to operating system.
- Make application windows resizable by user input.
- Add file storage and management within the operating system.

---
