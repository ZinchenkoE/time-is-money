import {Component, OnInit} from '@angular/core';
import {DataService} from '../_shared/data.service';
import {Comment} from '../_shared/comment';

@Component({
	selector: 'app-comments',
	templateUrl: './comments.component.html',
	styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

	comments: Comment[] = [];

	constructor(private dataService: DataService) {}

	ngOnInit() {
		this.dataService.getComments().subscribe(
			(comments: Comment[]) => this.comments = comments
		);
	}

}
