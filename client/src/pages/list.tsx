'use client'
import GradientPic from '@/components/gradientPic/gradientPic';
import * as React from 'react';
import './list.scss'
import { getCategories } from '@/api/getCategories';
import { ItemCategory } from '@/models/ItemCategory';
import { useEffect, useState } from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import { Category } from '@/components/Category/Category';

export const List = () => {
    const [categories, setCategories] = useState<ItemCategory[] | null>(null);

    useEffect(() => {
        const fetchCategories = async() => {
            try {
                const data = await getCategories();
                setCategories(data)
            } catch (error) {
                console.error('Failed to fetch categories: ', error)
            }
        }

        fetchCategories();
    }, []);
    return (
        <div className="list-page">
            <div className='list-page__title'>Gina & Ollie's Ultimate Collab</div>
            <div className="list-page__category-wrapper">
                {categories ? (
                    categories.map((category: ItemCategory) => (
                        <Category 
                            key={category.id}
                            categoryId={category.id} 
                            name={category.name} 
                            color={category.color} 
                            categoryImgUrl={category.categoryImgUrl}
                        />
                    ))
                ) : (
                    <CircularProgress style={{marginBottom: '2rem'}} />
                )}
            </div>
        </div>
    )
}

export default List