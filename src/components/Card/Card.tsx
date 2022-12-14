import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosApi from '../../axiosApi';
import ButtonSpinner from '../Spinner/ButtonSpinner/ButtonSpinner';

interface Props {
    time: string;
    description: string;
    calories: number;
    id: string;
    isLoading: boolean;
    onDelete: () => void;
}

const Card: React.FC<Props> = ({ time, description, calories, id , onDelete, isLoading}) => {
    
    return (
        <div className="card">
            <div className="card-header">
                {time}
            </div>
            <div className="card-body">
                <p className="card-text">{description} </p>
                <h5 className='card-title'>{calories} kcal</h5>
                <Link className='btn btn-primary mx-3' to={`/meal/${id}/edit`}>Edit</Link>
                <button className='btn btn-danger' onClick={onDelete} disabled={isLoading} > {isLoading && <ButtonSpinner/>} Delete</button>
            </div>
        </div>
    );
};

export default Card;