import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';

const ListCourses = () => {
    const [courses, setCourses] = useState([]);

    const getCsrfToken = () => {
        const name = 'csrftoken';
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const fetchCourses = () => {
        axios.get('http://127.0.0.1:8000/api/courses/', {
            headers: {
                'X-CSRFToken': getCsrfToken(),
            }
        })
        .then(response => {
            console.log(response.data);
            setCourses(response.data);
        })
        .catch(error => console.error('Error fetching courses:', error));
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            axios.delete(`http://127.0.0.1:8000/api/courses/${id}/`, {
                headers: {
                    'X-CSRFToken': getCsrfToken(),
                }
            })
            .then(response => {
                console.log('Course deleted:', response.data);
                setCourses(courses.filter(course => course.id !== id));
            })
            .catch(error => console.error('Error deleting course:', error));
        }
    };

    const handleSearch = (id) => {
        // Implement your search or view function here
        console.log('Search for course:', id);
        // Example: Navigate to a detailed view page or show a modal
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div className="container mt-5">
            <div className="row mb-3">
                <div className="col-md-3 mb-4">
                    <button className="btn btn-primary" onClick={fetchCourses}>List courses</button>
                </div>
                <hr />
            </div>
            <table className="table table-hover">
                <thead className="table-primary">
                    <tr>
                        <th>Course Title</th>
                        <th>Code</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.id}>
                            <td>{course.title}</td>
                            <td>{course.course_code}</td>
                            <td>
                                <button
                                    className="btn btn-link"
                                    onClick={() => handleSearch(course.id)}
                                >
                                    <FontAwesomeIcon icon={faSearch} />
                                </button>
                                <button
                                    className="btn btn-link text-danger"
                                    onClick={() => handleDelete(course.id)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListCourses;
