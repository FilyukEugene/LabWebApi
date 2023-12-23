// comment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { commentsUrl } from 'src/app/configs/commentController-endpoints';
import { AlertService } from './Alert.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {

  constructor(private http: HttpClient, private alertService: AlertService) {}

  getCommentsForProduct(productId: number): Observable<Comment[]> {
    const url = `${commentsUrl}/product/${productId}`;
    console.log(url);
    return this.http.get<Comment[]>(url).pipe(
      catchError(err => {
        this.alertService.errorAlert(err.error, 'Get Comments for Product Failed!');
        return of([]);
      })
    );
  }

  getAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(commentsUrl).pipe(
      catchError(err => {
        this.alertService.errorAlert(err.error, 'Get Comments Failed!');
        return of([]);
      })
    );
  }

  addComment(comment: Comment): Observable<any> {
    return this.http.post(commentsUrl, comment).pipe(
      catchError(err => {
        this.alertService.errorAlert(err.error, 'Add Comment Failed!');
        return of({});
      })
    );
  }

  deleteComment(id: number): Observable<any> {
    const url = `${commentsUrl}/${id}`;
    return this.http.delete(url).pipe(
      catchError(err => {
        this.alertService.errorAlert(err.error, 'Delete Comment Failed!');
        return of({});
      })
    );
  }
}
