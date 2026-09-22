let students = [];

function addStudent() {
    const studentNameInput = document.getElementById("studentName");
    const studentName = studentNameInput.value.trim();

    if (studentName === "") {
        alert("Please enter a student name.");
        return;
    }

    students.push({
        name: studentName,
        status: "Not Marked"
    });

    studentNameInput.value = "";

    displayStudents();
    updateSummary();
    saveStudents();
}

function markAttendance(index, status) {
    students[index].status = status;

    displayStudents();
    updateSummary();
    saveStudents();
}

function deleteStudent(index) {
    students.splice(index, 1);

    displayStudents();
    updateSummary();
    saveStudents();

}

function clearAttendance() {
    students = [];

    displayStudents();
    updateSummary();
    saveStudents();
}

function displayStudents() {
    const attendanceTable = document.getElementById("attendanceTable");

    attendanceTable.innerHTML = "";

    students.forEach(function(student, index) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.status}</td>
            <td>
                <button class="present-button"
                    onclick="markAttendance(${index}, 'Present')">
                    Present
                </button>

                <button class="absent-button"
                    onclick="markAttendance(${index}, 'Absent')">
                    Absent
                </button>

                <button class="delete-button"
                    onclick="deleteStudent(${index})">
                    Delete
                </button>
            </td>
        `;

        attendanceTable.appendChild(row);
    });
}

function updateSummary() {
    const total = students.length;

    const present = students.filter(function(student) {
        return student.status === "Present";
    }).length;

    const absent = students.filter(function(student) {
        return student.status === "Absent";
    }).length;

    document.getElementById("totalStudents").textContent = total;
    document.getElementById("presentStudents").textContent = present;
    document.getElementById("absentStudents").textContent = absent;
}
function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}

function loadStudents() {
    const savedStudents = localStorage.getItem("students");

    if (savedStudents) {
        students = JSON.parse(savedStudents);
        displayStudents();
        updateSummary();
    }
}
loadStudents();