class Person {
  String name;
  int age;
  double? height;
  double? weight;

  Person(this.name, this.age, {this.height, this.weight});

  Person.verySmallPerson(String name, int age)
      : name = name,
        age = age,
        height = 50.0;

  String get getName => name;
  int get getAge => age;
  double? get getHeight => height;
  double? get getWeight => weight;

  set setHeight(double height) => this.height = height;
  set setWeight(double weight) => this.weight = weight;

  @override
  String toString() {
    return 'Person{name: $name, age: $age, height: $height, weight: $weight}';
  }
}

class Student extends Person {
  int id;
  int creditPoints;

  Student(String name, int age,
      {double? height,
      double? weight,
      required this.id,
      required this.creditPoints})
      : super(name, age, height: height, weight: weight);

  @override
  String toString() {
    return 'Student{id: $id, creditPoints: $creditPoints, ${super.toString()}}';
  }
}

void main() {
  Person person1 = Person('John', 25, height: 180.0, weight: 80.0);
  Person person2 = Person.verySmallPerson('Peter', 25);

  Student student1 =
      Student('Tim', 25, height: 189.0, weight: 72.0, id: 1, creditPoints: 100);
  Student student2 = Student('Tom', 25, id: 2, creditPoints: 100);

  List<Person> people = [person1, person2, student1, student2];

  for (Person person in people) {
    print(person);
  }
}
