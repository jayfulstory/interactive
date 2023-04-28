function CreatePerson(name, age) {
  this.name = name;
  this.age = age;
  this.introduce = function () {
    console.log(`hi i'm ${this.name}`);
  };
}

const person1 = new CreatePerson('1', 10);
const person2 = CreatePerson('2', 8);

// console.log(person1);
person1.introduce();
person2.introduce();
