import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Form = () => {
    const [courses, setCourses] = useState([]);
    const [instance, setInstance] = useState({ course: '', year: '', semester: '' });
    const [course, setCourse] = useState({ title: '', code: '', description: '' });

    const getCsrfToken = () => {
        const name = 'csrftoken';
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/courses/', {
            headers: {
                'X-CSRFToken': getCsrfToken(),
            }
        })
        .then(response => {
            console.log(response.data); 
            if (Array.isArray(response.data)) {
                setCourses(response.data);
            } else {
                console.error('Expected an array of courses but received:', response.data);
            }
        })
        .catch(error => console.error('Error fetching courses:', error));
    }, []);

    const handleInstanceChange = (e) => {
        setInstance({ ...instance, [e.target.name]: e.target.value });
    };

    const handleCourseChange = (e) => {
        setCourse({ ...course, [e.target.name]: e.target.value });
    };

    const handleInstanceSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/add-instance/', instance, {
            headers: {
                'X-CSRFToken': getCsrfToken(),
            }
        })
        .then(response => console.log('Instance added:', response.data))
        .catch(error => console.error('Error adding instance:', error));
    };

    const handleCourseSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/add-course/', course, {
            headers: {
                'X-CSRFToken': getCsrfToken(),
            }
        })
        .then(response => console.log('Course added:', response.data))
        .catch(error => console.error('Error adding course:', error));
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <h2>Add Course</h2>
                    <form onSubmit={handleCourseSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Course Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="form-control"
                                value={course.title}
                                onChange={handleCourseChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="code" className="form-label">Course Code:</label>
                            <input
                                type="text"
                                id="code"
                                name="code"
                                className="form-control"
                                value={course.code}
                                onChange={handleCourseChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Course Description:</label>
                            <textarea
                                id="description"
                                name="description"
                                className="form-control"
                                value={course.description}
                                onChange={handleCourseChange}
                                required
                            ></textarea>
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Add course</button>
                        </div>
                    </form>
                </div>

                <div className="col-md-6">
                    <h2>Add Instance</h2>
                    <form onSubmit={handleInstanceSubmit}>
                        <div className="mb-3">
                            <label htmlFor="course" className="form-label">Select Course:</label>
                            <select
                                id="course"
                                name="course"
                                className="form-select"
                                value={instance.course}
                                onChange={handleInstanceChange}
                                required
                            >
                                <option value="">Select a course</option>
                                {courses.map((course) => (
                                    <option key={course.id} value={course.id}>
                                        {course.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="year" className="form-label">Year:</label>
                            <input
                                type="text"
                                id="year"
                                name="year"
                                className="form-control"
                                value={instance.year}
                                onChange={handleInstanceChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="semester" className="form-label">Semester:</label>
                            <input
                                type="text"
                                id="semester"
                                name="semester"
                                className="form-control"
                                value={instance.semester}
                                onChange={handleInstanceChange}
                                required
                            />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Add instance</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Form;
