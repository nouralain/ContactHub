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
let totalContacts = document.getElementById("totalContacts");
let favContacts = document.getElementById("favContacts");
let emergencyContacts = document.getElementById("emergencyContacts");
let Totalcounter = 0;
let emergencyConter;
let favCounter;
let btnClose = document.getElementById("btnClose");
let favCard = document.getElementById("favouriteCard");
let emergencyCard = document.getElementById("emergencyCard");
let typeOfError = document.getElementById("typeOfError");
let errorMessage = document.getElementById("errorMsgModal");
let failAlert = document.getElementById("failAlert");
let successAlert = document.getElementById("successAlert");
let okBtnAlertModal = document.getElementById("okBtnAlertModal");
let deletedContactIndex;
let deleteMsgModal = document.getElementById("deleteMsgModal");
let noOfContacts = document.getElementById("noOfContacts");
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
    validateInput(nameInput, "nameMsg", "Name", "name for the contact!") &&
    validateInput(phoneInput, "phoneMsg", "Phone", "phone number!") &&
    validateInput(emailInput, "emailMsg", "Email", "valid email address")
  ) {
    typeOfError.innerHTML = `Added!`;
    errorMessage.innerHTML = `Contact has been added successfully.`;
    successAlert.classList.remove("d-none");
    failAlert.classList.add("d-none");
    okBtnAlertModal.classList.add("d-none");

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
  clearValidation();
}
function clear() {
  //function to format the inputs after user enter the button
  nameInput.value = null;
  phoneInput.value = null;
  emailInput.value = null;
  addressInput.value = null;
  selectInput.value = "selectagroup";
  notesTextArea.value = null;
  favouritCheckBox.checked = false;
  emergencyCheckBox.checked = false;
}
function clearValidation() {
  let nameMsg = document.getElementById("nameMsg");
  let phoneMsg = document.getElementById("phoneMsg");
  let emailMsg = document.getElementById("emailMsg");
  nameMsg.classList.add("d-none");
  nameInput.classList.remove("border-danger");
  phoneMsg.classList.add("d-none");
  phoneInput.classList.remove("border-danger");
  emailMsg.classList.add("d-none");
  emailInput.classList.remove("border-danger");
}
function displayContacts() {
  //function to display contacts and search*********
  let box = "";
  let term = searchInput.value;
  let imge = "";
  let imgeSmall = "";
  let emergencyIconBtn;
  let emergencyAbsoluteSpan;
  let emergencySpan;
  emergencyConter = 0;
  favCounter = 0;
  let favIconBtn;
  let favAbsoluteSpan;
  let selectContainer;
  let favBox = "";
  let emergBox = "";

  for (let i = 0; i < allContacts.length; i++) {
    //to loop over the array to access objects inside it
    Totalcounter = i + 1;

    //function that returns the capital initials of the name
    let upperCaseInitials = getUserInitials(i);
    //condition to display <img> if user entered image and if not display <span>***************

    if (allContacts[i].image === "images/undefined") {
      imgeSmall = `<span id="imageReplace" class="d-flex align-items-center justify-content-center rounded-3 bg-gradient-orange text-white text-lg fw-semibold" style="width: 40px; height: 40px">${upperCaseInitials}</span>`;
      imge = `<span id="imageReplace" class="d-flex align-items-center justify-content-center rounded-4 bg-gradient-orange text-white text-lg fw-semibold" style="width: 56px; height: 56px">${upperCaseInitials}</span>`;
    } else {
      imgeSmall = ` <div
                      id="contactImage"
                      class="image rounded-3 overflow-hidden"
                      style="width: 40px; height: 40px"
                    >
                      <img
                        src=${allContacts[i].image}
                        alt="contactImage"
                        class="w-100 d-block h-100"
                      />
                    </div>`;
      imge = `<div id="contactImage" class="image  rounded-4 overflow-hidden"  style="width: 56px; height: 56px"><img src=${allContacts[i].image} alt="contactImage" class="w-100 d-block h-100"></div>`;
    }

    //condition to increase the counter if the property of emergencycheackbok =true*************
    if (allContacts[i].emergencyCheckBox) {
      emergencyConter++;
      emergencyIconBtn = `<i
                            class="fa-solid fa-heart-pulse  text-red-200  fa-sm"
                          ></i
                        >`;

      emergencyAbsoluteSpan = `<span
                          class="small-heart d-flex align-items-center justify-content-center rounded-circle bg-red-200 position-absolute"
                          style="width: 25px; height: 25px"
                        >
                          <i class="fa-solid fa-heart-pulse text-white fa-2xs"></i>
                        </span>`;

      emergencySpan = ` <span
                          class="bg-red-100 text-red-200 text-xxs fw-medium p-1 rounded-1"
                          ><i
                            class="fa-solid fa-heart-pulse fa-xs text-red-200 me-1"
                          ></i
                          >Emergency</span
                        >`;

      emergBox += `<div class="bg-gray-25 d-flex align-items-center justify-content-between mx-3 px-2 py-2 rounded-3 info-card-emerg mb-3">
                    <div class="d-flex align-items-center justify-content-start gap-2">
                     ${imgeSmall}
                    <div>
                      <span class="name text-sm fw-medium text-black" id="name"
                      >${allContacts[i].name}</span
                    >
                    <span class="d-block">
                      
                      <span class="phone text-xs text-gray-500" id="phone"
                        >${allContacts[i].phone}</span
                      >
                    </span>
                    </div>
                    </div>
                    <div><span
                            class="phone-icon bg-light-red rounded-3 d-flex align-items-center justify-content-center"
                            style="width:32px; height: 32px"
                            ><i
                              class="fa-solid fa-phone text-red-200 fa-sm"
                            ></i
                          ></span></div>
                  </div>`;
    } else {
      emergencyIconBtn = `<i
                            class="fa-regular fa-heart text-gray-400  fa-sm"
                          ></i
                        >`;
      emergencyAbsoluteSpan = `<span
                          class="small-heart d-flex align-items-center justify-content-center rounded-circle bg-red-200 position-absolute d-none"
                          style="width: 25px; height: 25px"
                        >
                          <i class="fa-solid fa-heart-pulse text-white fa-2xs"></i>
                        </span>`;
      emergencySpan = ` <span
                          class="bg-red-100 text-red-200 text-xxs fw-medium p-1 rounded-1 d-none"
                          ><i
                            class="fa-solid fa-heart-pulse fa-xs text-red-200 me-1"
                          ></i
                          >Emergency</span
                        >`;
    }

    //condition to increase the counter if the property of favouritcheckbox =true*************
    if (allContacts[i].favouritCheckBox) {
      favCounter++;
      favIconBtn = ` <i class="fa-solid fa-star text-yellow fa-sm"></i
                        >`;

      favAbsoluteSpan = `<span
                          class="small-star d-flex align-items-center justify-content-center rounded-circle bg-yellow position-absolute"
                          style="width: 25px; height: 25px"
                        >
                          <i class="fa-solid fa-star text-white fa-2xs"></i>
                        </span>`;

      favBox += `<div class="bg-gray-25 d-flex align-items-center justify-content-between mx-3 px-2 py-2 rounded-3 info-card-right mb-3">
                    <div class="d-flex align-items-center justify-content-start gap-2">
                     ${imgeSmall}
                    <div>
                      <span class="name text-sm fw-medium text-black" id="name"
                      >${allContacts[i].name}</span
                    >
                    <span class="d-block">
                      
                      <span class="phone text-xs text-gray-500" id="phone"
                        >${allContacts[i].phone}</span
                      >
                    </span>
                    </div>
                    </div>
                    <div><span
                            class="phone-icon bg-light-green rounded-3 d-flex align-items-center justify-content-center"
                            style="width:32px; height: 32px"
                            ><i
                              class="fa-solid fa-phone text-green fa-sm"
                            ></i
                          ></span></div>
                  </div>`;
    } else {
      favIconBtn = ` <i class="fa-regular fa-star text-gray-400 fa-sm"></i
                        >`;
      favAbsoluteSpan = `<span
                          class="small-star d-flex align-items-center justify-content-center rounded-circle bg-yellow position-absolute d-none"
                          style="width: 25px; height: 25px"
                        >
                          <i class="fa-solid fa-star text-white fa-2xs"></i>
                        </span>`;
    }

    //condition to display span depends on select option
    switch (allContacts[i].select) {
      case "Family":
        selectContainer = `<span class="bg-light-blue text-blue text-xxs fw-medium me-2 p-1 rounded-1" 
                          >Family</span
                        >`;
        break;
      case "Friends":
        selectContainer = `<span class="bg-light-green text-green text-xxs fw-medium me-2 p-1 rounded-1" 
                          >Friends</span
                        >`;
        break;
      case "Work":
        selectContainer = `<span class="bg-light-violet-3 text-violet-400 text-xxs fw-medium me-2 p-1 rounded-1" 
                          >Work</span
                        >`;
        break;
      case "School":
        selectContainer = `<span class="bg-light-brown text-brown text-xxs fw-medium me-2 p-1 rounded-1" 
                          >School</span
                        >`;
        break;
      case "Other":
        selectContainer = `<span class="bg-gray-150 text-black text-xxs fw-medium me-2 p-1 rounded-1" 
                          >Other</span
                        >`;
        break;
      case "selectagroup":
        selectContainer = `<span class="bg-gray-150 text-black text-xxs fw-medium me-2 p-1 rounded-1 d-none" 
                          ></span
                        >`;
        break;
    }

    //condition to check if search term =name to display cards with this name , or if term ="" display all cards
    if (allContacts[i].name.toLowerCase().includes(term.toLowerCase())) {
      box += `<div class="col-12 col-sm-6">
                  
                    <div class="card-body card card-added mb-3  p-3 rounded-4">
                      <div
                        class="d-flex align-items-center justify-content-start gap-3"
                      >
                       <div class="position-relative " id="headerIcon">
                        ${imge}
                        ${favAbsoluteSpan}
                        ${emergencyAbsoluteSpan}

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
                         ${selectContainer}
                       ${emergencySpan}
                        </div>
                      </div>

                      <div class="d-flex align-items-center justify-content-between pt-2 border-top mt-3 ">
                       <div class="d-flex align-items-center gap-1 mt-2">
                         <button
                         onclick="callBtn(${i})"
                            class="btn bg-light-green-2 rounded-3 d-flex align-items-center justify-content-center"
                            style="width: 36px; height: 36px"
                            ><i
                              class="fa-solid fa-phone text-green fa-sm"
                            ></i
                          ></button>
                        <button
                        onclick="sendEmailBtn(${i})"
                            class="btn bg-light-violet-2 rounded-3 d-flex align-items-center justify-content-center"
                            style="width: 36px; height: 36px"
                            ><i
                              class="fa-solid fa-envelope text-violet-400 fa-sm"
                            ></i
                          ></button>
                       </div>
                       <div class="d-flex align-items-center gap-1 mt-2" id="iconsFooter">
                        <button
                        onclick="toggleFavBtn(${i})"
                          class="btn bg-light-yellow rounded-3 d-flex align-items-center justify-content-center"
                          style="width: 36px; height: 36px"
                          >${favIconBtn}</button>
                        <!-- heart -->
                        <button
                        onclick="toggleEmergBtn(${i})"
                          class="btn rounded-3 d-flex align-items-center justify-content-center"
                          style="width: 36px; height: 36px"
                          >${emergencyIconBtn}</button>
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
                        onclick="getIndexOfContact(${i})"
                         data-bs-toggle="modal"
                         data-bs-target="#deleteAlertModal"
                          class="btn bg-gray-50 rounded-3 d-flex align-items-center justify-content-center"
                          style="width: 36px; height: 36px"
                          ><i class="fa-solid fa-trash text-gray-500 fa-sm"></i
                        ></button>
                       </div>
                      </div>

                    </div>
                
                </div>`;
    }

    rowData.innerHTML = box;
  }

  //it displays no contact if no data in the local storage********
  if (allContacts.length === 0) {
    noContact.classList.remove("d-none");
  }

  //condition to display no favourite if no checked favourite checkbox
  if (favBox == "") {
    favBox = `<div class="text-sm text-gray-400  text-center">
                    No favorites yet
                  </div>`;
  }

  if (emergBox == "") {
    emergBox = `<div class="text-sm text-gray-400  text-center">
                    No emergency contacts
                  </div>`;
  }

  displayTotalContacts();
  emergencyCard.innerHTML = emergBox;
  favCard.innerHTML = favBox;
  emergencyContacts.innerHTML = `${emergencyConter}`;
  favContacts.innerHTML = `${favCounter}`;

  clear();
}

function getIndexOfContact(index) {
  deletedContactIndex = index;
  deleteMsgModal.innerHTML = ` Are you sure you want to delete ${allContacts[deletedContactIndex].name} ? This action cannot be undone.`;
}

function deleteContact(deletedContactIndex) {
  allContacts.splice(deletedContactIndex, 1); //it removes the contact i clicked on
  Totalcounter--;
  emergencyConter--;
  favCounter--;
  localStorage.setItem("contactInfo", JSON.stringify(allContacts)); //it converts array into string so that local storage access it
  displayTotalContacts();

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
  fileInput.files[0] = allContacts[index].image;

  addBtn.classList.add("d-none"); //to remove the add btn and display the update btn instead
  addBtn.classList.remove("d-block", "d-sm-inline");
  updateBtn.classList.remove("d-none");
  updateBtn.classList.add("d-block", "d-sm-inline");

  clearValidation();
}

function updateContacts(currentIndex) {
  //function to update to object with the new values and display it and update local storage
  if (
    validateInput(nameInput, "nameMsg", "Name", "name for the contact!") &&
    validateInput(phoneInput, "phoneMsg", "Phone", "phone number!") &&
    validateInput(emailInput, "emailMsg", "Email", "valid email address")
  ) {
    typeOfError.innerHTML = `Updated!`;
    errorMessage.innerHTML = `Contact has been updated successfully.`;
    successAlert.classList.remove("d-none");
    failAlert.classList.add("d-none");
    okBtnAlertModal.classList.add("d-none");
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
    addBtn.classList.remove("d-none");
    addBtn.classList.add("d-block", "d-sm-inline");
    updateBtn.classList.remove("d-block", "d-sm-inline");
    updateBtn.classList.add("d-none");

    clear();
    clearValidation();
  }
}

function validateInput(element, msgId, missingError, errorMsg) {
  //function to validate inputs

  let regex = {
    nameInput: /^[a-zA-Z ]{2,50}$/,
    phoneInput: /^(002|\+2)?[0][1][0|1|2|5][0-9]{8}$/,
    emailInput: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  };
  let text = element.value;
  let msg = document.getElementById(msgId);

  if (text === "") {
    if (element.id === "emailInput") {
      msg.classList.add("d-none");
      element.classList.remove("border-danger");
      return true;
    } else {
      msg.classList.remove("d-none");
      element.classList.add("border-danger");
      typeOfError.innerHTML = `Missing ${missingError}`;
      errorMessage.innerHTML = `Please enter a ${errorMsg}`;
      successAlert.classList.add("d-none");
      failAlert.classList.remove("d-none");
      return false;
    }
  } else {
    if (regex[element.id].test(text)) {
      msg.classList.add("d-none");
      element.classList.remove("border-danger");
      return true;
    } else {
      msg.classList.remove("d-none");
      element.classList.add("border-danger");
      typeOfError.innerHTML = `Invalid  ${missingError}`;
      errorMessage.innerHTML = `${msg.textContent}`;
      successAlert.classList.add("d-none");
      failAlert.classList.remove("d-none");
      return false;
    }
  }
}

function displayTotalContacts() {
  totalContacts.innerHTML = `${Totalcounter}`;
  noOfContacts.innerHTML = ` Manage and organize your ${Totalcounter} contacts`;
}

function callBtn(index) {
  window.location.href = `tel:${allContacts[index].phone}`;
  console.log(window.location.href);
}
function sendEmailBtn(index) {
  window.location.href = `mailto:${allContacts[index].email}`;
  console.log(window.location.href);
}

function toggleFavBtn(index) {
  if (allContacts[index].favouritCheckBox) {
    allContacts[index].favouritCheckBox = false;
  } else {
    allContacts[index].favouritCheckBox = true;
  }

  displayContacts();
  localStorage.setItem("contactInfo", JSON.stringify(allContacts));
}

function toggleEmergBtn(index) {
  if (allContacts[index].emergencyCheckBox) {
    allContacts[index].emergencyCheckBox = false;
  } else {
    allContacts[index].emergencyCheckBox = true;
  }

  displayContacts();
  localStorage.setItem("contactInfo", JSON.stringify(allContacts));
}

function getUserInitials(index) {
  allContacts[index].name;
  let splitNameArray = allContacts[index].name.split(" ");
  let initials;
  if (splitNameArray.length === 1) {
    initials = splitNameArray[0].charAt(0);
  } else if (splitNameArray.length === 2) {
    initials = splitNameArray[0].charAt(0) + splitNameArray[1].charAt(0);
  } else {
    initials = splitNameArray[0].charAt(0) + splitNameArray[2].charAt(0);
  }

  return initials.toUpperCase();
}

function clearAfterCloseBtn() {
  clear();
  clearValidation();
}

// if the location or email = null remove their icons
// fix the cancel button
// add hover effects
//add rondom image icon colors
