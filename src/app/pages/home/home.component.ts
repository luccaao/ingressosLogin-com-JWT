import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  user$!: any;

  usuario1: any = {
    username: '',
    email: '',
    password: ''
  }

  constructor (private userService: UserService, private authService: AuthService) {}


  ngOnInit() {
    this.user$ = this.userService.retornarUsuario();
    console.log(this.user$);
    
     this.authService.getUsuario(this.user$.id).subscribe({
      next: (res) => {
        this.user$ = res;
        
        
        
      }
    })

    
    
    
    
  }
}
