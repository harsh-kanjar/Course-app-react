import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';

const ListInstances = () => {
    const [instances, setInstances] = useState([]);
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');

    const getCsrfToken = () => {
        const name = 'csrftoken';
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const fetchInstances = () => {
        axios.get('http://127.0.0.1:8000/instances/', {
            params: { year, semester },
            headers: {
                'X-CSRFToken': getCsrfToken(),
            }
        })
        .then(response => {
            console.log(response.data);
            setInstances(response.data);
        })
        .catch(error => console.error('Error fetching instances:', error));
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this instance?')) {
            axios.delete(`http://127.0.0.1:8000/delete-instance/${id}/`, {
                headers: {
                    'X-CSRFToken': getCsrfToken(),
                }
            })
            .then(response => {
                console.log('Instance deleted:', response.data);
                setInstances(instances.filter(instance => instance.id !== id));
            })
            .catch(error => console.error('Error deleting instance:', error));
        }
    };

    const handleSearch = (id) => {
        // Implement your search or view function here
        console.log('Search for instance:', id);
    };

    return (
        <div className="container mt-5">
            <div className="row mb-3">
                <div className="col-md-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <select
                        className="form-select"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                    >
                        <option value="">Select semester</option>
                        <option value="1">Semester 1</option>
                        <option value="2">Semester 2</option>
                    </select>
                </div>
                <div className="col-md-3 mb-4">
                    <button className="btn btn-primary" onClick={fetchInstances}>List instances</button>
                </div>
                <hr />
            </div>
            <table className="table table-hover">
                <thead className="table-primary">
                    <tr>
                        <th>Course Title</th>
                        <th>Year-Sem</th>
                        <th>Code</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* This is dummy entry */}
                        <tr>
                            <td>Lorem ipsum dolor sit amet , lorem ipsum dolor sit amet</td>
                            <td> 2021 - 1</td>
                            <td>1611651561</td>
                            <td>
                                <button
                                    className="btn btn-link"
                                    onClick={() => handleSearch(instance.id)}
                                >
                                    <FontAwesomeIcon icon={faSearch} />
                                </button>
                                <button
                                    className="btn btn-link text-danger"
                                    onClick={() => handleDelete(instance.id)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>

                    {instances.map((instance) => (
                        <tr key={instance.id}>
                            <td>{instance.course_title}</td>
                            <td>{instance.year}-{instance.semester}</td>
                            <td>{instance.code}</td>
                            <td>
                                <button
                                    className="btn btn-link"
                                    onClick={() => handleSearch(instance.id)}
                                >
                                    <FontAwesomeIcon icon={faSearch} />
                                </button>
                                <button
                                    className="btn btn-link text-danger"
                                    onClick={() => handleDelete(instance.id)}
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

export default ListInstances;
