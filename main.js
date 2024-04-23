import inquirer from "inquirer";
class School {
    constructor(name) {
        this.name = name;
        this.students = [];
    }
    addStudent(student) {
        this.students.push(student);
    }
    displayStudents() {
        console.log(`Students of $(this.name):`);
        this.students.forEach((student, index) => {
            console.log(`${index + 1}. Name: ${student.name}, Age: ${student.age}`);
        });
    }
}
class Student {
    constructor(name, age, schoolName) {
        this.name = name;
        this.age = age;
        this.schoolName = schoolName;
    }
}
async function addStudent(school) {
    const studentInfo = await inquirer.prompt([{
            type: 'input',
            name: 'name',
            message: 'Enter student name:'
        },
        {
            type: 'number',
            name: 'age',
            message: 'Enter student age'
        }]);
    const student = new Student(studentInfo.name, studentInfo.age, school.name);
    school.addStudent(student);
    console.log(`Student ${student.name} added sadded successfully to ${school.name}!`);
}
async function main() {
    const schoolName = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter school name:'
    });
    const school = new School(schoolName.name);
    while (true) {
        const action = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'Choose an action:',
            choices: ['Add Student', 'Display Students', 'Exit']
        });
        if (action.action === 'Add Student') {
            await addStudent(school);
        }
        else if (action.action === 'Display Students') {
            school.displayStudents();
        }
        else if (action.action === 'Exit') {
            console.log('Exiting...');
            break;
        }
    }
}
main();
