const express = require('express');
const router = express.Router();
const getTrialLessonInfo = require('../services/trialLesson');




// GET route to fetch trial lesson by ID and query parameters
router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        console.log(id);
        const response = await getTrialLessonInfo(id);
        console.log('===========')
        console.log(response)
        console.log('===========')
        res.status(200).json({...response});
    } catch (err) {
        res.status(400).json();
    }

});

module.exports = router;