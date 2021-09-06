const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const teamWorkers = [];
const idArray = [];

function pageMenu() {

  function makeManager() {
    console.log("Crate your team");
    inquirer.prompt([
      {
        type: "input",
        name: "managerName",
        message: "Enter the manager's name",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "You must type something.";
        }
      },
      {
        type: "input",
        name: "managerId",
        message: "Enter the manager's ID.",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            return true;
          }
          return "You must enter a number above zero.";
        }
      },
      {
        type: "input",
        name: "managerEmail",
        message: "Enter the manager's email.",
        validate: answer => {
          const pass = answer.match(
            /\S+@\S+\.\S+/
          );
          if (pass) {
            return true;
          }
          return "You must input a valid email address.";
        }
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "Enter the manager's office number.",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            return true;
          }
          return "You must enter a number above zero.";
        }
      }
    ]).then(answers => {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
      teamWorkers.push(manager);
      idArray.push(answers.managerId);
      makeTeam();
    });
  }

  function makeTeam() {

    inquirer.prompt([
      {
        type: "list",
        name: "teamChoice",
        message: "Select a team member to add",
        choices: [
          "Engineer",
          "Intern",
          "None"
        ]
      }
    ]).then(userChoice => {
      switch (userChoice.teamChoice) {
        case "Engineer":
          addEngineer();
          break;
        case "Intern":
          addIntern();
          break;
        default:
          buildTeam();
      }
    });
  }

  function addEngineer() {
    inquirer.prompt([
      {
        type: "input",
        name: "engineerName",
        message: "What is your engineer's name?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        }
      },
      {
        type: "input",
        name: "engineerId",
        message: "What is your engineer's id?",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            if (idArray.includes(answer)) {
              return "This ID is already taken. Please enter a different number.";
            } else {
              return true;
            }

          }
          return "Please enter a positive number greater than zero.";
        }
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "What is your engineer's email?",
        validate: answer => {
          const pass = answer.match(
            /\S+@\S+\.\S+/
          );
          if (pass) {
            return true;
          }
          return "Please enter a valid email address.";
        }
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "What is your engineer's GitHub username?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        }
      }
    ]).then(answers => {
      const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
      teamWorkers.push(engineer);
      idArray.push(answers.engineerId);
      makeTeam();
    });
  }

  function addIntern() {
    inquirer.prompt([
      {
        type: "input",
        name: "internName",
        message: "Enter a name for the intern.",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "You must type something.";
        }
      },
      {
        type: "input",
        name: "internId",
        message: "Enter an id for the intern.",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            if (idArray.includes(answer)) {
              return "ID not available. Please choose another.";
            } else {
              return true;
            }

          }
          return "Enter a number above zero.";
        }
      },
      {
        type: "input",
        name: "internEmail",
        message: "Enter an email for the intern.",
        validate: answer => {
          const pass = answer.match(
            /\S+@\S+\.\S+/
          );
          if (pass) {
            return true;
          }
          return "Email invalid.";
        }
      },
      {
        type: "input",
        name: "internSchool",
        message: "Enter a school for the intern.",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "You must type something.";
        }
      }
    ]).then(answers => {
      const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
      teamWorkers.push(intern);
      idArray.push(answers.internId);
      makeTeam();
    });
  }

  function createTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamWorkers), "utf-8");
  }

  makeManager();

}

pageMenu();
