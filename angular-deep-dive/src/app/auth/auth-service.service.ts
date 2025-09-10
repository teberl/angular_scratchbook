import { Injectable } from '@angular/core';

import { Permission } from './Permission.model';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  public activePermission: Permission = 'guest';

  constructor() {}
}
