import{render}from'../node_modules/lit-html/lit-html.js';
import page from'../node_modules/page/page.mjs';
import{editCar, logout as apiLogout}from './api/data.js';


import { allPage } from './views/all.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';

import {homePage}from'./views/home.js';
import{loginPage}from'./views/login.js';
import { myPage } from './views/mylistings.js';
import{registerPage}from'./views/register.js';
import { searchPage } from './views/search.js';

const main=document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click',loguot);

setUserNav();
page('/',decorateContext,homePage);
page('/login',decorateContext,loginPage);
page('/register',decorateContext,registerPage);
page('/all',decorateContext,allPage);
page('/create',decorateContext,createPage);
page('/details/:id',decorateContext,detailsPage);
page('/edit/:id',decorateContext,editPage);
page('/mylistings',decorateContext,myPage);
page('/search',decorateContext,searchPage);
page.start();
function decorateContext(ctx,next){
    ctx.render=(content)=>render(content,main);
    ctx.setUserNav=setUserNav;

    next();
}

function setUserNav(){
    const username=sessionStorage.getItem('username');

    if(username!=null){
       document.querySelector('div#profile >a').textContent=`Welcome, ${username}`;
        document.getElementById('profile').style.display='';
        document.getElementById('guest').style.display='none';
    }
    else{
        document.getElementById('profile').style.display='none';
        document.getElementById('guest').style.display='';
    }

}
async function loguot(){
    await apiLogout();
    setUserNav();
    page.redirect('/');
}