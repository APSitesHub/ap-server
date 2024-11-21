const axios = require("axios");

const getPlatformNumber = async (req, _, next) => {
  if (req.body.leads.update[0].pipeline_id === "7001587") {
    console.log(5, 'getPlatformNumber');

    try {
      axios.defaults.headers.common[
        "Authorization"
      ] = `${process.env.PLATFORM_KEY}`;

      const login = req.body.leads.update[0].custom_fields.find((field) =>
        Object.values(field).includes("Логін до платформи")
      ).values[0].value;

      console.log(16, login);

      if (login) {
        const marathonOne = await axios.get(
          `https://edvibe.com/school-api/api/Marathon/GetMarathonStudents?MarathonId=37835&SearchTerm=${login}`
        );

        console.log(23, marathonOne);

        const marathonTwo = await axios.get(
          `https://edvibe.com/school-api/api/Marathon/GetMarathonStudents?MarathonId=49509&SearchTerm=${login}`
        );

        console.log(29, marathonTwo);

        req.body.marathonNumber =
          marathonOne.data.length > 0
            ? "1"
            : marathonTwo.data.length > 0
            ? "2"
            : "";
        next();
      }
    } catch (error) {
      console.log(33, 'error from getPlatformNumber', error);
      next();
    }
  }
};

module.exports = getPlatformNumber;
