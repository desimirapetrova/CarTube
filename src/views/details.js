import {html}from '../../node_modules/lit-html/lit-html.js';
import{getCarById,deleteCar}from '../api/data.js';

const detailsTemplate=(car,isOwner)=>html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=${car.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${car.brand}</li>
            <li><span>Model:</span>${car.model}</li>
            <li><span>Year:</span>${car.year}</li>
            <li><span>Price:</span>${car.price}$</li>
        </ul>

        <p class="description-para">${car.description}</p>
        <div class="listings-buttons">
        
                ${isOwner?
                    html`
            <a href=${`/edit/${car._id}`} class="button-list">Edit</a>
            <a id="deleteBtn"href="javascript:void(0)" class="button-list">Delete</a>
            `:''}
            </div>
    </div>
</section>  `;

export async function detailsPage(ctx){
    console.log('de');
const carId=ctx.params.id;
const userId=sessionStorage.getItem('userId');

const car=await getCarById(carId);
ctx.render(detailsTemplate(car,car._ownerId==userId));

document.getElementById('deleteBtn').addEventListener('click',onDelete);
async function onDelete(){
       const confirmed=confirm('Are you sure you want to delete this item?');
        if(confirmed){
            await deleteCar(car._id);
            ctx.page.redirect('/all');
        }
    }
}