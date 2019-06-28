document.addEventListener('DOMContentLoaded', () => {
  let dropIcon = document.getElementById('drop-down-icon');
  let list = document.getElementById('drop-down-list')

  removeDropDownLinks();

  dropIcon.addEventListener('click', () => {
    if (list.lastChild) {
      removeDropDownLinks();
    } else {
      displayDropDownLinks();
    }
  });


  function displayDropDownLinks() {

    let list = document.getElementById('drop-down-list');

    let photos = document.createElement('li');
    let projects = document.createElement('li');
    let contact = document.createElement('li');

    photos.className += 'drop-down-element';
    projects.className += 'drop-down-element';
    contact.className += 'drop-down-element';

    let photosLink = document.createElement('a');
    let projectsLink = document.createElement('a');
    let contactLink = document.createElement('a');

    photosLink.textContent = 'Photos';
    projectsLink.textContent = 'Projects';
    contactLink.textContent = 'Contact';

    photosLink.className += 'nav-links';
    projectsLink.className += 'nav-links';
    contactLink.className += 'nav-links';


    photosLink.href = 'https://twitter.com';
    projectsLink.href = 'https://medium.com';
    contactLink.href = 'https://medium.com';

    photos.appendChild(photosLink);
    projects.appendChild(projectsLink);
    contact.appendChild(contactLink);

    list.appendChild(photos);
    list.appendChild(projects);
    list.appendChild(contact);
  }

  function removeDropDownLinks() {
    let list = document.getElementById('drop-down-list');

    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
  }


});
