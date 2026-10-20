import { User } from "../src/models/User";
import { Admin } from "../src/models/Admim";
import { Employee} from "../src/models/Employee"
import { Supervisor} from "../src/models/Supervisor"
import {Armazenamento} from "../src/services/Armazenamento"


//Test 3
describe('Verify the negative number on the ID field of the User', () => {
    test('The ID should not accept negative numbers', () => {

        expect(() => {
            const user = new User(-1, "John Doe", "john@example.com", "EMPLOYEE");

            user.getId();

        }).toThrow("User ID must be a positive integer");
    });
});

//Test 4
describe('Verify the non-integer numbers on the ID field on the User', () => {
    test('The ID should not accept non-integer numbers', () => {

        expect(() => {

              const user = new User(1.5, "John Doe", "john@example.com", "EMPLOYEE");

            user.getId();

        }).toThrow("User ID must be a positive integer.");
    });
});

//Test 16
describe('Verify admim permissions', () => {
    test('The admin should have management permissions on true', () => {

        const admin = new Admin(1, "Admin User", "admin@example.com");

        expect(admin.canManageUsers()).toBe(true);
    });
});

//Test 18
describe('Verify supervisor permissions', () => {
    test('The supervisor should not have management permissions', () => {

        const supervisor = new Supervisor(
            1,
            "Supervisor User",
            "supervisor@example.com"
        );

        expect(supervisor.canManageUsers()).toBe(false);
    });
});

//Test 20
describe('Create employee with valid data', () => {
    test('The spaces should be valid', () => {

    const employee = new Employee( 3, "Fernando", "Fernandoooo@ElementInternals.co", 2000, "Limpeza");

    expect(employee.getId()).toBe(3);
    expect(employee.getName()).toBe('Fernando');
    expect(employee.getSalary()).toBe(2000);
    expect(employee.getDepartment()).toBe('Limpeza');
    });
});

//Test 21
describe('Reject salary equals to zero', () => {
 test('The salary of the employee cannot be zero',  ()=> {

  expect(() => {

     const employee = new Employee( 3, "Fernando", "Fernandoooo@ElementInternals.com", 0, "Limpeza");

            employee.getSalary();

        }).toThrow("Salary must be a finite number greater than zero.");
});
});

//Test 40
describe('Validate user by E-mail', () => {
    test('Testing if the users email is valid', () => {

        expect(() => {

            new User( 1,"John Doe","","EMPLOYEE" );

        }).toThrow();
    });
});



//Test 49
describe('User count on the stock if is negative', () => {
test('Consulting the Users on stock need to be zero and throw error', () => {

    const stock = new Armazenamento();
    const user1 = new User(5, 'Daniel', 'dani127@email.com', "EMPLOYEE")
    const user2 = new User(6, 'Ronaldo', 'Ronald@email.com', "EMPLOYEE")
    const user3 = new User(7, 'Donald', 'Dona@email.com', "EMPLOYEE")

        stock.addUser(user1);
         stock.addUser(user2);
          stock.addUser(user3);
          
          stock.clear();

        expect(stock.getUserCount()).toBe(0);
    });
});

//Test 51
describe('Reject service evaluation without valid stock', () => {
    test('The stock should start with zero users', () => {

        const stock = new Armazenamento();

        expect(stock.getUserCount()).toBe(0);
    });
});

//Test 57
  test('If the user has the salary at 0 is rejected', () => {

    expect(() => {

    new Employee(5, 'Daniel', 'email@email.com', 0, 'EMPLOYEE')

    }).toThrow();
  })


//Test 74
describe("Search by id", ()  => {
    test('Try the valid id and the invalid', () => {

         const user1 = new User(5, 'Daniel', 'dani127@email.com', "EMPLOYEE")

         expect(user1.getId()).toBe(5);

          expect(() => {

            new User( 0,"John Doe","dani127@email.com'","EMPLOYEE" );
            
        }).toThrow();
        
    });
});