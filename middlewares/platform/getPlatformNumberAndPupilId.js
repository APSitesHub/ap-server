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
        console.log(
          "Not all required fields present and/or valid, aborting request in platform middleware"
        );
        return res.status(200).json({
          message: "OK",
        });
      }

      axios.defaults.headers.common[
        "Authorization"
      ] = `${process.env.PLATFORM_KEY}`;

      const login = req.body.leads.update[0].custom_fields.find((field) =>
        Object.values(field).includes("Логін до платформи")
      ).values[0].value;

      const service = req.body.leads.update[0].custom_fields.find((field) =>
        Object.values(field).includes("Вид послуги")
      ).values[0].value;

      const lang =
        service === "Англійська"
          ? "en"
          : service === "Англійська діти"
          ? "enkids"
          : service === "Німецька"
          ? "de"
          : service === "Німецька діти"
          ? "dekids"
          : service === "Польська"
          ? "pl"
          : service === "Польська діти"
          ? "plkids"
          : service;

      console.log(50, "login", login);
      console.log(51, "service", service);
      console.log(52, "lang", lang);

      if (login && lang) {
        if (lang === "en") {
          const marathonOne = await axios.get(
            `https://online.ap.education/school-api/api/Marathon/GetMarathonStudents?MarathonId=37835&SearchTerm=${login}`
          );

          console.log(
            61,
            marathonOne.data,
            "lengthEnOne",
            marathonOne.data.data.length
          );

          const marathonTwo = await axios.get(
            `https://online.ap.education/school-api/api/Marathon/GetMarathonStudents?MarathonId=49509&SearchTerm=${login}`
          );

          console.log(
            72,
            marathonTwo.data,
            "lengthEnTwo",
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
        }
        if (lang === "enkids") {
          const marathonKidsOne = await axios.get(
            `https://online.ap.education/school-api/api/Marathon/GetMarathonStudents?MarathonId=40552&SearchTerm=${login}`
          );

          console.log(
            98,
            marathonKidsOne.data,
            "lengthKidsOne",
            marathonKidsOne.data.data.length
          );

          const marathonKidsTwo = await axios.get(
            `https://online.ap.education/school-api/api/Marathon/GetMarathonStudents?MarathonId=50784&SearchTerm=${login}`
          );

          console.log(
            109,
            marathonKidsTwo.data,
            "lengthKidsTwo",
            marathonKidsTwo.data.data.length
          );

          const marathonKidsHigh = await axios.get(
            `https://online.ap.education/school-api/api/Marathon/GetMarathonStudents?MarathonId=71977&SearchTerm=${login}`
          );

          console.log(
            120,
            marathonKidsHigh.data,
            "lengthKidsHigh",
            marathonKidsHigh.data.data.length
          );

          req.body.marathonNumber =
            marathonKidsOne.data.data.length > 0
              ? "1"
              : marathonKidsTwo.data.data.length > 0
              ? "2"
              : marathonKidsHigh.data.data.length > 0
              ? "high"
              : "";

          req.body.pupilId =
            marathonKidsOne.data.data.length > 0
              ? marathonKidsOne.data.data[0].pupilId
              : marathonKidsTwo.data.data.length > 0
              ? marathonKidsTwo.data.data[0].pupilId
              : marathonKidsHigh.data.data.length > 0
              ? marathonKidsHigh.data.data[0].pupilId
              : "";
        }
        if (lang === "de") {
          const marathonDe = await axios.get(
            `https://online.ap.education/school-api/api/Marathon/GetMarathonStudents?MarathonId=41534&SearchTerm=${login}`
          );

          console.log(
            150,
            marathonDe.data,
            "lengthDe",
            marathonDe.data.data.length
          );

          req.body.marathonNumber =
            marathonDe.data.data.length > 0
              ? ""
              : "not found";

          req.body.pupilId =
            marathonDe.data.data.length > 0
              ? marathonDe.data.data[0].pupilId
              : "";
        }
        if (lang === "dekids") {
          const marathonDeKids = await axios.get(
            `https://online.ap.education/school-api/api/Marathon/GetMarathonStudents?MarathonId=65423&SearchTerm=${login}`
          );

          console.log(
            172,
            marathonDeKids.data,
            "lengthDeKids",
            marathonDeKids.data.data.length
          );

          req.body.marathonNumber =
            marathonDeKids.data.data.length > 0
              ? ""
              : "not found";

          req.body.pupilId =
            marathonDeKids.data.data.length > 0
              ? marathonDeKids.data.data[0].pupilId
              : "";
        }
        if (lang === "pl") {
          const marathonPl = await axios.get(
            `https://online.ap.education/school-api/api/Marathon/GetMarathonStudents?MarathonId=41057&SearchTerm=${login}`
          );

          console.log(
            194,
            marathonPl.data,
            "lengthPl",
            marathonPl.data.data.length
          );

          req.body.marathonNumber =
            marathonPl.data.data.length > 0
              ? ""
              : "not found";

          req.body.pupilId =
            marathonPl.data.data.length > 0
              ? marathonPl.data.data[0].pupilId
              : "";
        }
        if (lang === "plkids") {
          const marathonPlKids = await axios.get(
            `https://online.ap.education/school-api/api/Marathon/GetMarathonStudents?MarathonId=41057&SearchTerm=${login}`
          );

          console.log(
            216,
            marathonPlKids.data,
            "lengthPl",
            marathonPlKids.data.data.length
          );

          req.body.marathonNumber =
            marathonPlKids.data.data.length > 0
              ? ""
              : "not found";

          req.body.pupilId =
            marathonPlKids.data.data.length > 0
              ? marathonPlKids.data.data[0].pupilId
              : "";
        }

        console.log("marathonNumber in getter", req.body.marathonNumber);

        console.log("pupilId in getter", req.body.pupilId);
        next();
      }
    } catch (error) {
      console.log(
        240,
        `error from getPlatformNumber while processing lead ${req.body.leads.update[0].id}`,
        error
      );
      next();
    }
  }
};

module.exports = getPlatformNumberAndPupilId;
