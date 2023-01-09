const router = require('express').Router();
const Course = require('../Models/Course');
const verify = require('./verifyToken');
const Review = require('../Models/ReviewCourse');

// 1. CREATE
// 2. UPDATE
// 3. DELETE Along with all the reviews associated with it
// 4. GET
// 5. GET ALL
// 6. SEARCH
// 7. GET BY DEPARTMENT
// 8. GET UNIQUE CODES
// 9. GET UPVOTES AND DOWNVOTES COUNT



// ==================== CREATE ====================
router.post('/', verify, async (req, res) => {      // If Course Already Exists in DB then return Error else Save Course
    const courseExists = await Course.findOne({ name: req.body.name });
    if (courseExists) return res.status(400).send('Course Already Exists');
    const newCourse = new Course(req.body);
    try {
        const savedCourse = await newCourse.save();
        res.status(200).json(savedCourse);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

// ==================== UPDATE ==================== 
router.put('/:id', verify, async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedCourse);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

// ==================== DELETE ====================
router.delete('/:id', verify, async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        // Get All the Reviews where the course_id is the same as the id of the course being deleted
        const reviews = await Review.find({ course_id: req.params.id });
        // Delete all the reviews
        reviews.forEach(async (review) => {
            await Review.findByIdAndDelete(review._id);
        });
        res.status(200).json('Course has been deleted');
    } catch (err) {
        res.status(500).json(err);
    }
}
);

// ==================== GET ====================
router.get('/find/:id', verify, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

// ==================== GET ALL ====================
router.get('/', verify, async (req, res) => {
    const query = req.query.new;
    try {
        let courses;
        if (query) {
            // Get 8 Random
            courses = await Course.aggregate([{ $sample: { size: 6} }]);
        } else {
            courses = await Course.find();
        }

        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

// ==================== SEARCH ====================
router.get('/search/:name', verify, async (req, res) => {
    try {
        const courses = await Course.find({ name: { $regex: req.params.name, $options: 'i' } });
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

// ==================== GET BY DEPARTMENT ====================
router.get('/searchcode/:code', verify, async (req, res) => {
    try {
        const courses = await Course.find({ coursecode: { $regex: req.params.code, $options: 'i' } });
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json(err);
    }
}
);


// ==================== GET UNIQUE CODES ====================
router.get('/uniquecodes', verify, async (req, res) => {
    try {
        const courses = await Course.find();
        const uniqueCodes = [...new Set(courses.map(course => course.coursecode.substring(0, 2)))];
        res.status(200).json(uniqueCodes);
    } catch (err) {
        res.status(500).json(err);
    }
}
);


// ==================== GET UPVOTES AND DOWNVOTES COUNT ====================
router.get('/votes', verify, async (req, res) => {
    try {
        const reviews = await Review.find();
        const upvotes = reviews.map(review => review.upvote);
        const downvotes = reviews.map(review => review.downvote);
        const course_ids = reviews.map(review => review.course_id);
        const updownvotes = [];
        for (let i = 0; i < course_ids.length; i++) {
            updownvotes.push({
                upvote: upvotes[i],
                downvote: downvotes[i],
                course_id: course_ids[i],
            });
        }
        const updownvotescount = [];
        for (let i = 0; i < course_ids.length; i++) {
            const course_id = course_ids[i];
            const upvote = upvotes[i];
            const downvote = downvotes[i];
            const index = updownvotescount.findIndex(updownvotescount => updownvotescount.course_id === course_id);
            if (index === -1) {
                updownvotescount.push({
                    upvote,
                    downvote,
                    course_id,
                });
            } else {
                updownvotescount[index].upvote += upvote;
                updownvotescount[index].downvote += downvote;
            }
        }
        res.status(200).json(updownvotescount);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

// ==================== Get Each Course Rating Average ====================
router.get('/rating', verify, async (req, res) => {
    // Sum Rating of Each Course and Divide by Number of Reviews for That Course
    try {
        const reviews = await Review.find();
        const ratings = reviews.map(review => review.rating);
        const course_ids = reviews.map(review => review.course_id);
        const coursesrating = [];
        for (let i = 0; i < course_ids.length; i++) {
            coursesrating.push({
                rating: ratings[i],
                course_id: course_ids[i],
            });
        }
        const coursesratingavg = [];
        for (let i = 0; i < course_ids.length; i++) {
            const course_id = course_ids[i];
            const rating = ratings[i];
            const index = coursesratingavg.findIndex(coursesratingavg => coursesratingavg.course_id === course_id);
            if (index === -1) {
                coursesratingavg.push({
                    rating,
                    course_id,
                });
            } else {
                coursesratingavg[index].rating += rating;
            }
        }
        for (let i = 0; i < coursesratingavg.length; i++) {
            coursesratingavg[i].rating /= reviews.filter(review => review.course_id === coursesratingavg[i].course_id).length;
        }
        res.status(200).json(coursesratingavg);
    } catch (err) {
        res.status(500).json(err);
    }
}
);


// Get All Courses by core_elective (core or elective)
router.get('/core_elective/:core_elective', verify, async (req, res) => {
    try {
        const courses = await Course.find({ core_elective: req.params.core_elective });
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

module.exports = router;