import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotAvailableComponent } from './components/404/404.component';
import { UsersComponent } from './components/users/users.component';
import { SingleUserComponent } from './components/single-user/single-user.component';
import { PostsComponent } from './components/posts/posts.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './auth.guard';


const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'home',component:HomeComponent,canActivate:[authGuard],children:[
  {path:'users',component:UsersComponent,children:[{path:':id',component:SingleUserComponent}]},
  {path:'posts',component:PostsComponent,children:[{path:':postId',component:SinglePostComponent}]}]},
  {path:'**',component:NotAvailableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
