import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axiosApi from '../../axiosApi';
import ButtonSpinner from '../Spinner/ButtonSpinner/ButtonSpinner';

const New = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const { id } = useParams();
    const [loading, setLoading] = useState(false)

    const [ckal, setCkal] = useState({
        time: '',
        description: '',
        calories: '',
    });
    const customerChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;

        setCkal(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    let onFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true)
        try {
            await axiosApi.post('/meal.json', ckal)
        } finally {
            setLoading(false)
            navigate('/')
        }
    };


    useEffect(() => {
        if (location.pathname === `/meal/${id}/edit`) {
            const fethOnePost = async () => {
                setLoading(true)
                try {
                    const postResponse = await axiosApi.get('/meal/' + id + '.json');
                    setCkal(postResponse.data);
                } finally {
                    setLoading(false)
                }
            }
            fethOnePost()
        }
    }, [id, location.pathname])

    if (location.pathname === `/meal/${id}/edit`) {
        onFormSubmit = async (event: React.FormEvent) => {
            event.preventDefault();
            setLoading(true)

            try {
                await axiosApi.put('/meal/' + id + '.json', ckal)
            } finally {
                setLoading(false)
            }
        };
    }

    return (
        <div>
            <form onSubmit={onFormSubmit}>
                <div className="mb-3">
                    <label htmlFor="time" className="form-label">Time</label>
                    <select name="time" id="time" value={ckal.time} onChange={customerChanged} required>
                        <option disabled value="">Chouse the category</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="snack">Snack</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        name='description'
                        placeholder="Description"
                        value={ckal.description}
                        onChange={customerChanged}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput2" className="form-label">Calories</label>
                    <input
                        type="number"
                        className="form-control"
                        id="exampleFormControlInput2"
                        name='calories'
                        placeholder="Calories"
                        value={ckal.calories}
                        onChange={customerChanged}
                    />
                </div>
                <button type='submit' className='btn btn-primary' disabled={loading}> {loading && <ButtonSpinner/>}Save</button>
            </form>
        </div>
    );
};

export default New;