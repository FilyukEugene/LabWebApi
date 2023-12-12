import { AlertService } from './Alert.service';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {userProfileUrl, uploadUserAvatarUrl, updateProfileInfoUrl} from "src/app/configs/userController-endpoints"
import { UserProfile } from 'src/app/core/models/user/UserProfile';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) { }

  getUserInfo(): Observable<any> {
    return this.http.get<any>(userProfileUrl);
  }
  editProfile(profile: UserProfile):Observable<UserProfile> {
    return this.http.put<UserProfile>(updateProfileInfoUrl, profile).pipe(
      catchError(err => {
        this.alertService.errorAlert(err, "Edit Profile Failed!");
        return of();
    }));
  }

  getUserImage(): Observable<File> {
    const options = {
      responseType: 'blob' as 'json'
    };
    return this.http.get<File>(uploadUserAvatarUrl, options);
  }

  updateUserImage(image: File): Observable<void> {
    const formData = new FormData();
    formData.append('image', image, image.name);

    return this.http.post<void>(uploadUserAvatarUrl, formData).pipe(
      catchError(err => {
        this.alertService.errorAlert(err.error, 'Failed!');
        return of();
      })
    );
  }
}

    