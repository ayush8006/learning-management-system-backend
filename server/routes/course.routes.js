import { Router } from 'express';
import { addLectureToCoureseById, createCourse, getAllCourses, getLecturesByCourseId, removeCourse, updateCourse } from '../controllers/course.controller.js';
import { authorizeRoles, isLoggedIn } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';


const router = Router();


//OLD Code
//router.get("/", getAllCourses);
//router.get("/:id", isLoggedIn, getLecturesByCourseId);


// Refactored code
router
  .route('/')
  .get(getAllCourses)
  .post(
    isLoggedIn,
    authorizeRoles('ADMIN'),
    upload.single('thumbnail'),
    createCourse
   );
  

  router
  .route('/:id')
  .get(isLoggedIn, getLecturesByCourseId)
  .put(
    isLoggedIn,
    authorizeRoles('ADMIN'),
    updateCourse
   )
  .delete(
    isLoggedIn,
    authorizeRoles('ADMIN'),
    removeCourse
  )
  .post(
    isLoggedIn,
    authorizeRoles('ADMIN'),
    upload.single('lecture'),
    addLectureToCoureseById
  );


export default router;
