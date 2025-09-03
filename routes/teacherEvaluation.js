const express = require("express");

const { validateTeacherEvaluation } = require("../schema/teacherEvaluationSchema");
const saveTeacherEvaluationController = require("../controllers/teachers/saveTeacherEvaluation");

const router = express.Router();

/**
 * POST /teacher-evaluation/save
 * Save teacher evaluation data to Google Sheets
 * 
 * Expected body:
 * {
 *   "userId": "123",
 *   "teacherClarityRating": 5,
 *   "lessonOrganizationRating": 5,
 *   "overallTeacherRating": 5,
 *   "additionalComments": "123йцу", // optional
 *   "submittedAt": "2025-09-03T15:10:38.181Z"
 * }
 * 
 * Note: averageRating is calculated automatically on the backend
 */
router.post("/save", validateTeacherEvaluation, saveTeacherEvaluationController);

module.exports = router;
