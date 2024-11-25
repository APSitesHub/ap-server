const axios = require("axios");

const getPlatformNumberAndPupilId = async (req, res, next) => {
  if (req.body.leads.update[0].pipeline_id === "7001587") {
    console.log("Webhook received event from correct pipeline (7001587)!");
    console.log(6, "getPlatformNumber");
    console.log(7, req.body.leads.update[0]);

    try {
      if (
        req.body.leads.update[0].custom_fields
          .find((field) => Object.values(field).includes("Потоки Річний курс"))
          .values[0].value.includes("не річний курс")
      ) {
        return res.status(200).json({
          message:
            "Not all required fields present and/or valid, aborting request in platform middleware",
        });
      }

      axios.defaults.headers.common[
        "Authorization"
      ] = `${process.env.PLATFORM_KEY}`;

      const login = req.body.leads.update[0].custom_fields.find((field) =>
        Object.values(field).includes("Логін до платформи")
      ).values[0].value;

      console.log(18, login);

      if (login) {
        const marathonOne = await axios.get(
          `https://online.ap.education/school-api/api/Marathon/GetMarathonStudents?MarathonId=37835&SearchTerm=${login}`
        );

        console.log(
          26,
          marathonOne.data,
          "length",
          marathonOne.data.data.length
        );

        const marathonTwo = await axios.get(
          `https://online.ap.education/school-api/api/Marathon/GetMarathonStudents?MarathonId=49509&SearchTerm=${login}`
        );

        console.log(
          37,
          marathonTwo.data,
          "length",
          marathonTwo.data.data.length
        );

        req.body.marathonNumber =
          marathonOne.data.data.length > 0
            ? "1"
            : marathonTwo.data.data.length > 0
            ? "2"
            : "";

        req.body.pupilId =
          marathonOne.data.data.length > 0
            ? marathonOne.data.data[0].pupilId
            : marathonTwo.data.data.length > 0
            ? marathonTwo.data.data[0].pupilId
            : "";
        next();
      }
    } catch (error) {
      console.log(59, "error from getPlatformNumber", error);
      next();
    }
  }
};

module.exports = getPlatformNumberAndPupilId;
