import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosApi from '../../axiosApi';
import Card from '../../components/Card/Card';
import Spinner from '../../components/Spinner/Spinner';
import { MealReesponse } from '../../types';

const Main = () => {
    const [loading, setLoading] = useState(false)
    const [meal, setMeal] = useState<MealReesponse[]>([])
    const [ckal, setCkal] = useState(0)

    const getMeal = useCallback(async () => {
        setLoading(true)
        try {
            const postResponse = await axiosApi.get('/meal.json')
            if (postResponse.data === null){
                setMeal([])
            }
            
            const requestMeal = Object.keys(postResponse.data).map(key => {
                const post = postResponse.data[key]
                post.id = key
                
                return post
            })

            setMeal(requestMeal)
            
            const setCalories = Object.keys(postResponse.data).reduce((acc, key) => {
                const number = parseInt(postResponse.data[key].calories)
                return acc + number;
            }, 0);
            
            setCkal(setCalories)
        } finally {
            setLoading(false)
        }
    }, [])
    useEffect(() => {
        getMeal().catch(console.error)
    }, [getMeal])

    const remove = async (id: string) => {
        setLoading(true)

        try {
            await axiosApi.delete('/meal/' + id + '.json')
        } finally {
            getMeal()
            setLoading(false)
        }
    }


    const createPost = meal.map((post) => {
        return <Card key={post.id} id={post.id} isLoading={loading} onDelete={() => remove(post.id)} calories={post.calories} description={post.description} time={post.time} />
    })
    let newForm = (
        <>
            <div>
                <h3>Total calories: {ckal}</h3>
                <Link to='/meal/new' className='btn btn-primary mb-3'>Add new meal</Link>
            </div>
            {createPost}
        </>
    )

    if (loading) {
        newForm = <Spinner/>
    }

    return (
        <div>
            {newForm}
        </div>
    );
};

export default Main;