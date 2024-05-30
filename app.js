"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

window.addEventListener("load", initApp); // When the page is loaded, run initApp function

// Function to initialize the Web App
async function initApp() {
  console.log("initApp: app.js is running 🎉"); // Log to the console that the app is running
  const projects = await getProjects(); // Corrected the function name
  console.log(projects);
  // displayProjects(projects);
  displayProjectsGrid(projects);
}

async function getProjects() {
  const response = await fetch("https://wordpressexamm.anuki.dk/wp-json/wp/v2/projects?acf_format=standard");
  const data = await response.json();
  return data;
}

function displayProjectsGrid(projects) {
  const projectsGrid = document.querySelector("#project-grid");
  for (const project of projects) {
    const article = document.createElement('article');
    article.classList.add('grid-item');
    
    const img = document.createElement('img');
    img.src = project.acf.image;
    img.alt = project.title.rendered;
    
    const h2 = document.createElement('h2');
    h2.textContent = project.title.rendered;
    
    const p = document.createElement('p');
    p.textContent = project.acf.description;
    p.classList.add('description'); // Add description class
    p.style.display = 'none'; // Initially hide description
    
    // Add event listeners for mouseover and mouseout to show/hide description
    img.addEventListener('mouseover', () => {
      p.style.display = 'block';
    });
    
    img.addEventListener('mouseout', () => {
      p.style.display = 'none';
    });
    
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(p);
    
    projectsGrid.appendChild(article);
  }
}





/*
<p>${project.acf.client}</p>
<p><a href="${project.acf.link}" target="_blank">View Project</a></p>
 <p>${project.acf.type}</p>
 */

