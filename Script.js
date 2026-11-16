// ===============================
// DATA
// ===============================

let employees =
    JSON.parse(localStorage.getItem("employees")) || [];

let assets =
    JSON.parse(localStorage.getItem("assets")) || [];

let repairs =
    JSON.parse(localStorage.getItem("repairs")) || [];


// ===============================
// PAGE NAVIGATION
// ===============================

function showSection(sectionName) {

    const sections =
        document.querySelectorAll(".section");

    sections.forEach(section => {
        section.classList.add("hidden");
    });

    document
        .getElementById(sectionName)
        .classList.remove("hidden");


    const titles = {
        dashboard: "Dashboard",
        employees: "Employees",
        assets: "IT Assets",
        repairs: "Repairs"
    };

    document.getElementById("pageTitle").textContent =
        titles[sectionName];


    document
        .querySelectorAll(".nav-btn")
        .forEach(button => {
            button.classList.remove("active");
        });


    const buttons =
        document.querySelectorAll(".nav-btn");

    buttons.forEach(button => {

        if (
            button
            .textContent
            .toLowerCase()
            .includes(
                sectionName === "dashboard"
                    ? "dashboard"
                    : sectionName === "employees"
                    ? "employees"
                    : sectionName === "assets"
                    ? "assets"
                    : "repairs"
            )
        ) {
            button.classList.add("active");
        }

    });

}


// ===============================
// MODALS
// ===============================

function openModal(id) {

    document.getElementById(id).style.display = "flex";

}


function closeModal(id) {

    document.getElementById(id).style.display = "none";

}


// ===============================
// EMPLOYEES
// ===============================

document
    .getElementById("employeeForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const employee = {

            id: Date.now(),

            name:
                document
                .getElementById("employeeName")
                .value,

            email:
                document
                .getElementById("employeeEmail")
                .value,

            department:
                document
                .getElementById("employeeDepartment")
                .value

        };


        employees.push(employee);


        saveData();

        displayEmployees();

        updateDashboard();


        this.reset();

        closeModal("employeeModal");

    });


function displayEmployees() {

    const table =
        document.getElementById("employeeTable");

    const search =
        document
        .getElementById("employeeSearch")
        .value
        .toLowerCase();


    table.innerHTML = "";


    const filtered =
        employees.filter(employee =>

            employee.name
                .toLowerCase()
                .includes(search)

            ||

            employee.email
                .toLowerCase()
                .includes(search)

            ||

            employee.department
                .toLowerCase()
                .includes(search)

        );


    filtered.forEach(employee => {

        table.innerHTML += `

            <tr>

                <td>${employee.name}</td>

                <td>${employee.email}</td>

                <td>${employee.department}</td>

                <td>

                    <button
                        class="delete-btn"
                        onclick="deleteEmployee(${employee.id})">

                        Delete

                    </button>

                </td>

            </tr>

        `;

    });

}


function deleteEmployee(id) {

    employees =
        employees.filter(
            employee => employee.id !== id
        );

    saveData();

    displayEmployees();

    updateDashboard();

}


// ===============================
// ASSETS
// ===============================

document
    .getElementById("assetForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const asset = {

            id: Date.now(),

            assetId:
                document
                .getElementById("assetId")
                .value,

            device:
                document
                .getElementById("assetDevice")
                .value,

            serial:
                document
                .getElementById("assetSerial")
                .value,

            status:
                document
                .getElementById("assetStatus")
                .value

        };


        assets.push(asset);

        saveData();

        displayAssets();

        updateDashboard();

        this.reset();

        closeModal("assetModal");

    });


function displayAssets() {

    const table =
        document.getElementById("assetTable");

    const search =
        document
        .getElementById("assetSearch")
        .value
        .toLowerCase();


    table.innerHTML = "";


    const filtered =
        assets.filter(asset =>

            asset.assetId
                .toLowerCase()
                .includes(search)

            ||

            asset.device
                .toLowerCase()
                .includes(search)

            ||

            asset.serial
                .toLowerCase()
                .includes(search)

        );


    filtered.forEach(asset => {

        table.innerHTML += `

            <tr>

                <td>${asset.assetId}</td>

                <td>${asset.device}</td>

                <td>${asset.serial}</td>

                <td>${asset.status}</td>

                <td>

                    <button
                        class="delete-btn"
                        onclick="deleteAsset(${asset.id})">

                        Delete

                    </button>

                </td>

            </tr>

        `;

    });

}


function deleteAsset(id) {

    assets =
        assets.filter(
            asset => asset.id !== id
        );

    saveData();

    displayAssets();

    updateDashboard();

}


// ===============================
// REPAIRS
// ===============================

document
    .getElementById("repairForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const repair = {

            id: Date.now(),

            asset:
                document
                .getElementById("repairAsset")
                .value,

            problem:
                document
                .getElementById("repairProblem")
                .value,

            technician:
                document
                .getElementById("repairTechnician")
                .value,

            status:
                document
                .getElementById("repairStatus")
                .value

        };


        repairs.push(repair);

        saveData();

        displayRepairs();

        updateDashboard();

        this.reset();

        closeModal("repairModal");

    });


function displayRepairs() {

    const table =
        document.getElementById("repairTable");

    table.innerHTML = "";


    repairs.forEach(repair => {

        table.innerHTML += `

            <tr>

                <td>${repair.asset}</td>

                <td>${repair.problem}</td>

                <td>${repair.technician}</td>

                <td>${repair.status}</td>

                <td>

                    <button
                        class="delete-btn"
                        onclick="deleteRepair(${repair.id})">

                        Delete

                    </button>

                </td>

            </tr>

        `;

    });

}


function deleteRepair(id) {

    repairs =
        repairs.filter(
            repair => repair.id !== id
        );

    saveData();

    displayRepairs();

    updateDashboard();

}


// ===============================
// DASHBOARD
// ===============================

function updateDashboard() {

    document
        .getElementById("employeeCount")
        .textContent = employees.length;


    document
        .getElementById("assetCount")
        .textContent = assets.length;


    const activeRepairs =
        repairs.filter(
            repair => repair.status !== "Completed"
        );


    document
        .getElementById("repairCount")
        .textContent =
        activeRepairs.length;

}


// ===============================
// SAVE DATA
// ===============================

function saveData() {

    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );

    localStorage.setItem(
        "assets",
        JSON.stringify(assets)
    );

    localStorage.setItem(
        "repairs",
        JSON.stringify(repairs)
    );

}


// ===============================
// INITIAL LOAD
// ===============================

displayEmployees();

displayAssets();

displayRepairs();

updateDashboard();