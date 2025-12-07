// ******************variables***************************

let fileInput = document.getElementById("fileInput");
let nameInput = document.getElementById("nameInput");
let phoneInput = document.getElementById("phoneInput");
let emailInput = document.getElementById("emailInput");
let addressInput = document.getElementById("addressInput");
let selectInput = document.getElementById("selectInput");
let notesTextArea = document.getElementById("noteInput");
let favouritCheckBox = document.getElementById("favouritCheckBox");
let emergencyCheckBox = document.getElementById("emergencyCheckBox");
let rowData = document.getElementById("rowData");
let searchInput = document.getElementById("searchInput");
let noContact = document.getElementById("noContactFound");
let form = document.getElementById("modalForm");
let currentIndex;
let addBtn = document.getElementById("addBtn");
let updateBtn = document.getElementById("updateBtn");

let allContacts = [];

// to display data after reload if local storage contains data
if (localStorage.getItem("contactInfo") !== null) {
  allContacts = JSON.parse(localStorage.getItem("contactInfo")); //it transfers array from string into array
  noContact.classList.add("d-none");
  if (allContacts.length === 0) {
    //to display no contacts if local storage has no data
    noContact.classList.remove("d-none");
  }

  displayContacts();
}

function addContact() {
  //function to add user values into object and add objects into an array and display the data after pushing it
  if (
    validateInput(nameInput, "nameMsg") &&
    validateInput(phoneInput, "phoneMsg") &&
    validateInput(emailInput, "emailMsg")
  ) {
    let contactInfo = {
      image: `images/${fileInput.files[0]?.name}`, //the ? to prevent the error of not finding the key if no image entered
      name: nameInput.value,
      phone: phoneInput.value,
      email: emailInput.value,
      address: addressInput.value,
      notes: notesTextArea.value,
      select: selectInput.value,
      favouritCheckBox: favouritCheckBox.checked,
      emergencyCheckBox: emergencyCheckBox.checked,
    };

    allContacts.push(contactInfo);
    noContact.classList.add("d-none");
    localStorage.setItem("contactInfo", JSON.stringify(allContacts));

    displayContacts();
  }
  clear();
}

function clear() {
  //function to format the inputs after user enter the button
  nameInput.value = null;
  phoneInput.value = null;
  emailInput.value = null;
  addressInput.value = null;
  selectInput.value = null;
  notesTextArea.value = null;
  favouritCheckBox.checked = false;
  emergencyCheckBox.checked = false;
}

function displayContacts() {
  //function to display contacts and search
  let box = "";
  let term = searchInput.value;
  let imge = "";

  for (let i = 0; i < allContacts.length; i++) {
    if (allContacts[i].image === "images/undefined") { //condition to display <img> if user entered image and if not display <span>
      imge = `<span id="imageReplace" class="d-flex align-items-center justify-content-center rounded-4 bg-gradient-orange" style="width: 56px; height: 56px"></span>`;
    } else {
      imge = `<div id="contactImage" class="image  rounded-4 overflow-hidden"  style="width: 56px; height: 56px"><img src=${allContacts[i].image} alt="contactImage" class="w-100 d-block h-100"></div>`;
    }

    if (allContacts[i].name.toLowerCase().includes(term.toLowerCase())) {
      box += `<div class="col-12 col-sm-6">
                  
                    <div class="card-body card card-added mb-3  p-3 rounded-4">
                      <div
                        class="d-flex align-items-center justify-content-start gap-3"
                      >
                       <div class="position-relative " id="headerIcon">
                        ${imge}
                        <span
                          class="small-star d-flex align-items-center justify-content-center rounded-circle bg-yellow position-absolute"
                          style="width: 20px; height: 20px"
                        >
                          <i class="fa-solid fa-star text-white fa-2xs"></i>
                        </span>

                       </div>

                        <span>
                          <span class="name text-base fw-semibold" id="name">${allContacts[i].name}</span>
                          <span class="d-flex gap-2 align-items-center">
                            <span
                              class="bg-light-blue rounded-3 d-flex align-items-center justify-content-center"
                              style="width: 24px; height: 24px"
                              ><i class="fa-solid fa-phone text-blue fa-xs"></i
                            ></span>
                            <span class="phone text-sm text-gray-500" id="phone"
                              >${allContacts[i].phone}</span
                            >
                          </span>
                        </span>
                      </div>

                      <div>
                        <span class="d-flex gap-2 align-items-center mt-3">
                          <span
                            class="bg-light-violet rounded-3 d-flex align-items-center justify-content-center"
                            style="width: 24px; height: 24px"
                            ><i
                              class="fa-solid fa-envelope text-violet-400 fa-xs"
                            ></i
                          ></span>
                          <span class="email text-sm text-gray-500" id="email"
                            >${allContacts[i].email}</span
                          >
                        </span>
                        <span class="d-flex gap-2 align-items-center mt-2">
                          <span
                            class="bg-light-green rounded-3 d-flex align-items-center justify-content-center"
                            style="width: 24px; height: 24px"
                            ><i
                              class="fa-solid fa-location-dot text-green fa-xs"
                            ></i
                          ></span>
                          <span class="location text-sm text-gray-500" id="location"
                            >${allContacts[i].address}</span
                          >
                        </span>

                        <div class="mt-2" id="selectValueAndCheckboxValue">
                         <span class="bg-light-blue text-blue text-xxs fw-medium me-2 p-1 rounded-1" 
                          >Family</span
                        >
                        <span
                          class="bg-red-100 text-red-200 text-xxs fw-medium p-1 rounded-1"
                          ><i
                            class="fa-solid fa-heart-pulse fa-xs text-red-200 me-1"
                          ></i
                          >Emergency</span
                        >
                        </div>
                      </div>

                      <div class="d-flex align-items-center justify-content-between pt-2 border-top mt-3 ">
                       <div class="d-flex align-items-center gap-1 mt-2">
                         <span
                            class="bg-light-green-2 rounded-3 d-flex align-items-center justify-content-center"
                            style="width: 36px; height: 36px"
                            ><i
                              class="fa-solid fa-phone text-green fa-sm"
                            ></i
                          ></span>
                        <span
                            class="bg-light-violet-2 rounded-3 d-flex align-items-center justify-content-center"
                            style="width: 36px; height: 36px"
                            ><i
                              class="fa-solid fa-envelope text-violet-400 fa-sm"
                            ></i
                          ></span>
                       </div>
                       <div class="d-flex align-items-center gap-1 mt-2" id="iconsFooter">
                        <button
                          class="btn bg-light-yellow rounded-3 d-flex align-items-center justify-content-center"
                          style="width: 36px; height: 36px"
                          ><i class="fa-solid fa-star text-yellow fa-sm"></i
                        ></button>
                        <!-- heart -->
                        <button
                          class="btn rounded-3 d-flex align-items-center justify-content-center"
                          style="width: 36px; height: 36px"
                          ><i
                            class="fa-regular fa-heart-pulse text-gray-400  fa-sm"
                          ></i
                        ></button>
                         <button
                         onclick=" updateInfo(${i})"
            class="btn bg-gray-50 rounded-3 d-flex align-items-center justify-content-center"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
             style="width: 36px; height: 36px"
          >
           <i class="fa-solid fa-pen text-gray-500 fa-sm"></i
          </button>
                        <button
                        onclick="deleteContact(${i})"
                          class="btn bg-gray-50 rounded-3 d-flex align-items-center justify-content-center"
                          style="width: 36px; height: 36px"
                          ><i class="fa-solid fa-trash text-gray-500 fa-sm"></i
                        ></button>
                       </div>
                      </div>

                    </div>
                
                </div>`;
    }

  }
  rowData.innerHTML = box;
  if (allContacts.length === 0) {
    //it displays no contact if no data in the local storage
    noContact.classList.remove("d-none");
  }
   clear()
}

function deleteContact(index) {
  allContacts.splice(index, 1); //it removes the contact i clicked on
  localStorage.setItem("contactInfo", JSON.stringify(allContacts)); //it converts array into string so that local storage access it

  displayContacts();
}

function updateInfo(index) {
  //it display object values into the inputs again
  currentIndex = index; //to use the index of the contact that user clicked on its update btn
  nameInput.value = allContacts[index].name;
  phoneInput.value = allContacts[index].phone;
  emailInput.value = allContacts[index].email;
  addressInput.value = allContacts[index].address;
  notesTextArea.value = allContacts[index].notes;
  favouritCheckBox.checked = allContacts[index].favouritCheckBox;
  emergencyCheckBox.checked = allContacts[index].emergencyCheckBox;
  nameInput.value = allContacts[index].name;

  addBtn.classList.add("d-none"); //to remove the add btn and display the update btn instead
  addBtn.classList.remove("d-block", "d-sm-inline");
  updateBtn.classList.remove("d-none");
  updateBtn.classList.add("d-block", "d-sm-inline");
}

function updateContacts(currentIndex) {
  //function to update to object with the new values and display it and update local storage
  if (
    validateInput(nameInput, "nameMsg") &&
    validateInput(phoneInput, "phoneMsg") &&
    validateInput(emailInput, "emailMsg")
  ) {
    let contactInfo = {
       image: `images/${fileInput.files[0]?.name}`,
      name: nameInput.value,
      phone: phoneInput.value,
      email: emailInput.value,
      address: addressInput.value,
      notes: notesTextArea.value,
      select: selectInput.value,
      favouritCheckBox: favouritCheckBox.checked,
      emergencyCheckBox: emergencyCheckBox.checked,
    };
    
    allContacts.splice(currentIndex, 1, contactInfo);
    displayContacts();
    localStorage.setItem("contactInfo", JSON.stringify(allContacts));
  }
}

function validateInput(element, msgId) {
  //function to validate inputs

  let regex = {
    nameInput: /^[a-zA-Z ]{2,50}$/,
    phoneInput: /^(002|\+2)?[0][1][0|1|2|5][0-9]{8}$/,
    emailInput: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  };
  let text = element.value;
  let msg = document.getElementById(msgId);

  if (regex[element.id].test(text)) {
    msg.classList.add("d-none");
    element.classList.remove("border-danger");
    return true;
  } else {
    msg.classList.remove("d-none");
    element.classList.add("border-danger");
    return false;
  }
}
