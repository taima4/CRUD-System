var courseName = document.getElementById("courseName");
var courseCategory = document.getElementById("courseCategory");
var coursePrice = document.getElementById("coursePrice");
var courseDescription = document.getElementById("courseDescription");
var courseCapacity = document.getElementById("courseCapacity");
var courseInputs = document.querySelectorAll(".inputs");
var addBtn = document.getElementById("click");
var deleteAllBtn = document.getElementById("deleteBtn");
var clearBtn = document.getElementById("resetbtn");
var search = document.getElementById("search");
var errorName=document.querySelector(".errorName");
var errorCategory=document.querySelector(".errorCategory");
var errorPrice=document.querySelector(".errorPrice");
var editBtn = document.getElementById("update");
var i ;
var nameTrue = false;
var categoryTrue = false;
var priceTrue = false;
var descTrue = false;
var capacityTrue = false;

if (JSON.parse(localStorage.getItem("courses"))==null){
var courses = [];

}else{
  courses = JSON.parse(localStorage.getItem("courses"));
displayData();
}
addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addCourses();
  clearInputs();
  displayData();
});

function addCourses() {
  var course = {
    name: courseName.value,
    category: courseCategory.value,
    price: coursePrice.value,
    description: courseDescription.value,
    capacity: courseCapacity.value,
  };
  courses.push(course);
  localStorage.setItem("courses", JSON.stringify(courses));
  Swal.fire({
    position: "center-center",
    icon: "success",
    title: "The course added successfully",
    showConfirmButton: false,
    timer: 1500,
  });
}

function clearInputs() {
  for (var i = 0; i < courseInputs.length; i++) {
    courseInputs[i].value = "";
  }
}

function displayData() {
  var data = "";
  for (let i = 0; i < courses.length; i++) {
    data += `
          <tr>
          <td>${i}</td>
          <td>${courses[i].name}</td>
          <td>${courses[i].category}</td>
          <td>${courses[i].price}</td>
          <td>${courses[i].description}</td>
          <td>${courses[i].capacity}</td>
          <td><button id="editBtn" class="btn btn-outline-info text-center my-3" onClick="updateCourse(${i})">edit </button></td>
          <td><button id="removeBtn" class="btn btn-outline-danger text-center my-3" onClick="deleteCourse(${i})">delete</button></td>

          </tr>
          
          `;
  }
  document.getElementById("data").innerHTML = data;
}
//delete one row
function deleteCourse(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      courses.splice(id, 1);
      localStorage.setItem("courses", JSON.stringify(courses));
      displayData();
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
}
//delete all row
deleteAllBtn.addEventListener("click", function () {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      courses.splice(0, courses.length);
      localStorage.setItem("courses", JSON.stringify(courses));

      displayData();
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
});
// clear inputs
clearBtn.addEventListener("click", function () {
  clearInputs();
});
// Search based on course name
search.addEventListener("keyup", function () {
  var data = "";
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].name.toLowerCase().includes(search.value.toLowerCase()))
      data += `
          <tr>
          <td>${i}</td>
          <td>${courses[i].name}</td>
          <td>${courses[i].category}</td>
          <td>${courses[i].price}</td>
          <td>${courses[i].description}</td>
          <td>${courses[i].capacity}</td>
          <td><button id="editBtn" class="btn btn-outline-info text-center my-3">edit </button></td>
          <td><button id="removeBtn" class="btn btn-outline-danger text-center my-3" onClick="deleteCourse(${i})">delete</button></td>

          </tr>
          
          `;
  }
  document.getElementById("data").innerHTML = data;
});

//Validation
courseName.addEventListener("keyup", function () {
  var Pattern = /^[A-Z][a-z]{2,10}$/;
  if (Pattern.test(courseName.value)) {
    nameTrue = true;
    courseName.classList.add("is-valid");
    errorName.style.cssText="display:none";
    if (courseName.classList.contains("is-invalid"))
      courseName.classList.remove("is-invalid");
  
  } else {;

    nameTrue = false;
    courseName.classList.add("is-invalid");
    errorName.style.cssText="display:block";
    if (courseName.classList.contains("is-valid"))
      courseName.classList.remove("is-valid");
  }
  disabledBtn();
});
courseCategory.addEventListener("keyup", function () {
  var Pattern = /^[A-Z][a-z]{2,20}$/;
  if (Pattern.test(courseCategory.value)) {
    categoryTrue = true;
    courseCategory.classList.add("is-valid");
    errorCategory.style.cssText="display:none";

    if (courseCategory.classList.contains("is-invalid"))
      courseCategory.classList.remove("is-invalid");
  } else {
    categoryTrue = false;
    courseCategory.classList.add("is-invalid");
    errorCategory.style.cssText="display:block";

    if (courseCategory.classList.contains("is-valid"))
      courseCategory.classList.remove("is-valid");
  }
  disabledBtn();
});
coursePrice.addEventListener("keyup", function () {
  var Pattern = /^(100|[1-9]\d{2,3})$/;
  if (Pattern.test(coursePrice.value)) {
    priceTrue = true;
    coursePrice.classList.add("is-valid");
    errorPrice.style.cssText="display:none";

    if (coursePrice.classList.contains("is-invalid"))
      coursePrice.classList.remove("is-invalid");
  } else {
    priceTrue = false;
    coursePrice.classList.add("is-invalid");
    errorPrice.style.cssText="display:block";

    if (coursePrice.classList.contains("is-valid"))
      coursePrice.classList.remove("is-valid");
  }
  disabledBtn();
});

courseDescription.addEventListener("keyup", function () {
  var Pattern = /^[A-Z][A-Za-z]{3,100}$/;
  if (Pattern.test(courseDescription.value)) {
    descTrue = true;
    courseDescription.classList.add("is-valid");
    if (courseDescription.classList.contains("is-invalid"))
      courseDescription.classList.remove("is-invalid");
  } else {
    descTrue = false;
    courseDescription.classList.add("is-invalid");

    if (courseDescription.classList.contains("is-valid"))
      courseDescription.classList.remove("is-valid");
  }
  disabledBtn();
});
courseCapacity.addEventListener("keyup", function () {
  var Pattern = /^(?!0)([1-9]\d{1,2}|1000)$/;
  if (Pattern.test(courseCapacity.value)) {
    capacityTrue = true;
    courseCapacity.classList.add("is-valid");
    if (courseCapacity.classList.contains("is-invalid"))
      courseCapacity.classList.remove("is-invalid");
  } else {
    capacityTrue = false;
    courseCapacity.classList.add("is-invalid");

    if (courseCapacity.classList.contains("is-valid"))
      courseCapacity.classList.remove("is-valid");
  }
  disabledBtn();
});
//disabled inputs
function disabledBtn() {
  if (nameTrue && categoryTrue && priceTrue && capacityTrue && descTrue) {
    addBtn.removeAttribute("disabled");
  } else {
    addBtn.setAttribute("disabled", "disabled");
  }
}
//update course
function updateCourse(id) {
  editBtn.style.cssText="display:inline-block";
  addBtn.style.cssText="display:none";
i=id;
  courseName.value=courses[id].name;
  courseCategory.value=courses[id].category;
  coursePrice.value=courses[id].price;
  courseDescription.value=courses[id].description;
  courseCapacity.value=courses[id].capacity;


  
}
editBtn.addEventListener("click",function(e){
  e.preventDefault();
  setTimeout(function(){
    location.reload();
}, 1500);
var course = {
    name: courseName.value,
    category: courseCategory.value,
    price: coursePrice.value,
    description: courseDescription.value,
    capacity: courseCapacity.value,
  };

  courses.splice(i,1);

  courses.splice(i,0,course);

  localStorage.setItem("courses", JSON.stringify(courses));
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "course update successfully",
    showConfirmButton: false,
    timer: 1500 
  
  });
 

});

