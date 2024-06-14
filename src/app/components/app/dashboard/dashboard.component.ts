import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppSwitchOption } from '../../../models/appSwitchOption';
import { AppUserDto } from '../../../models/appUserDto';
import { PaletteDto } from '../../../models/paletteDto';
import { AppUsersService } from '../../../services/app-users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  appUser: AppUserDto;
  generatedPalette: PaletteDto;
  appSwitchOptions: AppSwitchOption[] = [
    {
      text: 'Create',
      value: '/app/create',
    },
    {
      text: 'Saved',
      value: '/app/saved',
    },
  ];

  constructor(
    private appUsersService: AppUsersService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.appUsersService.currentAppUser$.subscribe(
      (res) => (this.appUser = res)
    );
  }

  onSwitchChanged(path: string) {
    this.router.navigateByUrl(path);
  }

  signOut() {
    this.appUsersService.signOut();
  }

  defineAppUserIconInitials() {
    let parts = this.appUser.name?.split(' ');
    if (!parts) return '';
    return `${parts[0]?.substring(0, 1) ?? 'UN'}${
      parts[1]?.substring(0, 1) ?? ''
    }`;
  }
}
