import {html}from '../../node_modules/lit-html/lit-html.js';
import{createCar}from '../api/data.js';

const createTemplate=(onSubmit)=>html`
<section id="create-listing">
    <div class="container">
        <form @submit=${onSubmit}id="create-form">
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">

            <hr>
            <input type="submit" class="registerbtn" value="Create Listing">
        </form>
    </div>
</section>
`;

export async function createPage(ctx){
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(event){
        event.preventDefault();
        const formData=new FormData(event.target);
        const brand=formData.get('brand');
        const model=formData.get('model');
        const description=formData.get('description');
        const year=Number(formData.get('year'));
        const imageUrl=formData.get('imageUrl');
        const price=Number(formData.get('price'));

        if(!brand||!model||!description||!year||!imageUrl||!price){
        return alert('All fields are required!');
        }
        // year=Number(year);
        // price=Number(price);
        if(price<0||year<0){
            return alert('Must be a positive number!')
        }
         await createCar({
            brand,
            model,
            description,
            year,
            imageUrl,
            price
          }
          );
        //event.target.reset();
        ctx.page.redirect('/all');

}
}