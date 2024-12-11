import React from 'react';
import { categoryInfos } from './categoryFullInfos';
import CategoryCard from './CategoryCard';
import classes from './../Category/category.module.css';

function Category() {
    return (
        <section className={classes.category__container}>
            {categoryInfos.map((infos) => (
                <CategoryCard data={infos} key={infos.name} />
            ))}
        </section>
    );
}

export default Category;