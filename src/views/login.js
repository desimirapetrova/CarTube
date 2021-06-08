import {html}from '../../node_modules/lit-html/lit-html.js';
import{login}from '../api/data.js';

const loginTemplate=(onSubmit,errorMsg)=>html`
<section id="login">
    <div class="container">
        <form @submit=${onSubmit}id="login-form" action="#" method="post">
        ${errorMsg ? html`<div class="error">${errorMsg}</div>` : ''}

        <h1>Login</h1>
            <p>Please enter your credentials.</p>
            <hr>

            <p>Username</p>
            <input placeholder="Enter Username" name="username" type="text">

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn" value="Login">
        </form>
        <div class="signin">
            <p>Dont have an account?
                <a href="/register">Sign up</a>.
            </p>
        </div>
    </div>
</section>
`;

export async function loginPage(ctx){

    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(event){
        event.preventDefault();
        const formData=new FormData(event.target);
        const username=formData.get('username');
        const password=formData.get('password');
    
        
        try{
            await login(username,password);
            
            ctx.setUserNav();
            ctx.page.redirect('/all');
        }catch(err){
            ctx.render(loginTemplate(onSubmit,err.message));
        }
    }
}