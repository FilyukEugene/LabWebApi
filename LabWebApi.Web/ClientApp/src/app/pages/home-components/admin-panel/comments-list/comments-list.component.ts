import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/core/services/Comment.service';

@Component({
  selector: 'app-product-comments',
  templateUrl: './product-comments.component.html',
  styleUrls: ['./product-comments.component.css'],
})
export class ProductCommentsComponent implements OnInit {
  @Input() productId: number; // Input parameter - product identifier
  comments: any[] = [];

  constructor(private commentService: CommentService) {}

  ngOnInit() {
    // Load comments for the given product on component initialization
    this.getCommentsForProduct(this.productId);
  }

  getCommentsForProduct(productId: number) {
    this.commentService.getCommentsForProduct(productId).subscribe(
      (data: any[]) => {
        this.comments = data;
      },
      (error: any) => { // Explicitly specify the type for the 'error' parameter
        console.error('Error fetching comments:', error);
      }
    );
  }
  

  addComment() {
    // Logic for adding a new comment
    // You can open a dialog, form, or call other methods to add a comment
  }
}
 