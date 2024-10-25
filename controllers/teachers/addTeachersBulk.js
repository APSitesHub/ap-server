const { newTeacher, allTeachers } = require("../../services/teachersServices");

const addTeachersBulk = async (req, res) => {
  const teachersInfo = [
    { name: "Балабан Олександра", code: "8471676" },
    { name: "Балабух Марія", code: "8498634" },
    { name: "Барановська Лілія", code: "8469212" },
    { name: "Бартух Торун Наталія", code: "8473270" },
    { name: "Безкоровайна Маргарита ", code: "8470156" },
    { name: "Біляк Лілія", code: "8483616" },
    { name: "Богуцька Владислава", code: "8475026" },
    { name: "Боднар Діана", code: "8481610" },
    { name: "Бойко Анастасія", code: "8489420" },
    { name: "Вашестюк Софія", code: "8470182" },
    { name: "Гаманюк Анна ", code: "8469396" },
    { name: "Гнида Марія", code: "8485194" },
    { name: "Головко Каріна", code: "8472358" },
    { name: "Гордійчук Поліна", code: "8469734" },
    { name: "Давидюк Ольга", code: "8468766" },
    { name: "Делікатна Влада ", code: "8470530" },
    { name: "Дзядик Віталій", code: "8528464" },
    { name: "Журавель Анастасія", code: "8469552" },
    { name: "Захарова Дарʼя", code: "8469566" },
    { name: "Іваніщева Аліна", code: "8470650" },
    { name: "Ігліцька Софія", code: "8475388" },
    { name: "Качмар Роксолана ", code: "8501914" },
    { name: "Колос Юлія", code: "8475050" },
    { name: "Тьо Вероніка", code: "8475992" },
    { name: "Колмикова Амалія", code: "8471656" },
    { name: "Кузишин Юліана", code: "8469130" },
    { name: "Летуча Олександра", code: "8468830" },
    { name: "Міщенко Федір", code: "8483974" },
    { name: "Мойсеєнко Дарʼя", code: "8469556" },
    { name: "Моруга Карина ", code: "8469582" },
    { name: "Мриглоцька Оксана", code: "8540514" },
    { name: "Онєгін Євген", code: "8525416" },
    { name: "Осокіна Олена ", code: "8478332" },
    { name: "Палій Вікторія", code: "8523106" },
    { name: "Палюх Марта ", code: "8468980" },
    { name: "Пасічник Вікторія", code: "8471316" },
    { name: "Патрашок Олена ", code: "8471730" },
    { name: "Пена Любов", code: "8469058" },
    { name: "Петрів Тетяна", code: "8469272" },
    { name: "Поліщук Марʼяна", code: "8470164" },
    { name: "Ринкова Ольга ", code: "8470086" },
    { name: "Роман Марина", code: "8473156" },
    { name: "Савчак Наталія", code: "8475566" },
    { name: "Самоніна Надія", code: "8471312" },
    { name: "Слюсаренко Ліза", code: "8470446" },
    { name: "Стуй Мар'яна", code: "8491730" },
    { name: "Телезин Руслана", code: "8470304" },
    { name: "Тишківська Христина ", code: "8490568" },
    { name: "Томків Анастасія", code: "8469252" },
    { name: "Тулянцева Марина ", code: "8471096" },
    { name: "Тьо Вероніка", code: "8475992" },
    { name: "Удовенко Ольга", code: "8522130" },
    { name: "Фіногеєва Анастасія", code: "8523030" },
    { name: "Харик Вікторія", code: "9679203" },
    { name: "Цвігун Наталія", code: "8470488" },
    { name: "Цопа Юріанна", code: "8522916" },
    { name: "Цюх Олександра", code: "8469372" },
    { name: "Черник Анна", code: "8546202" },
    { name: "Швець Богдан ", code: "8469288" },
    { name: "Шмагло Віталія", code: "8470310" },
    { name: "Янчева Каріна", code: "8470628" },
    { name: "Ярко Соломія", code: "8470408" },
    { name: "Rituraj Sahoo", code: "8529974" },
    { name: "Michael Brigola", code: "8522620" },
    { name: "Андрейчук Марина ", code: "8480244" },
    { name: "Гриців Анна ", code: "8469374" },
    { name: "Дронова Аліна ", code: "8468942" },
    { name: "Кольба Рената ", code: "8490758" },
    { name: "Сеньків Юліана ", code: "8495458" },
    { name: "Алхазов Олексій", code: "8473400" },
    { name: "Красногурська Христина 	", code: "10841992" },
    { name: "Лопуга Олена ", code: "8468924" },
    { name: "Одинак Оксана", code: "8473114" },
    { name: "Онищенко Богдан	", code: "10497195" },
    { name: "Атмачіді Марина", code: "8469118" },
    { name: "Бреннер Сабіне", code: "8489972" },
    { name: "Бруцька Ірина", code: "8851416" },
    { name: "Дмитрик Анастасія", code: "8560334" },
    { name: "Долока Ольга", code: "8483734" },
    { name: "Драпак Олександра", code: "8497514" },
    { name: "Дяченко Анна", code: "8485372" },
    { name: "Кобрин Роман", code: "8485538" },
    { name: "Коваль Олена", code: "8489432" },
    { name: "Литвиненко Лілія", code: "9157926" },
    { name: "Маковійчук Оксана", code: "8472556" },
    { name: "Маховська Наталя	", code: "10403351" },
    { name: "Наконечна Андріяна", code: "9527133" },
    { name: "Романенко Марина", code: "8472154" },
    { name: "Шепотько Соломія", code: "8470308" },
  ];

  const result = await Promise.all(
    teachersInfo.map(async (teacher) => {
      try {
        console.log(teacher.name);

        const passwordRandom = Math.floor(Math.random() * 1000000).toString();
        console.log(passwordRandom);

        await newTeacher({
          name: teacher.name.trim().trimEnd(),
          login: ("teacher" + teacher.code).trim().trimEnd(),
          password:
            passwordRandom.length < 6 ? "0" + passwordRandom : passwordRandom,
        });
      } catch (error) {
        console.log(error);
      }
    })
  );

  console.log(result);

  res.json(await allTeachers());
};

module.exports = addTeachersBulk;
