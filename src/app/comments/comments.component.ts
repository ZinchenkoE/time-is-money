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
	countPage: number[] = [];

	constructor(private dataService: DataService) {}

	ngOnInit() {
		this.dataService.getComments().subscribe(
			(data: any) => {
				this.comments  = data.comments;
				for(let i = 1; i <= data.countPage; i++) this.countPage.push(i);
				console.log(this.countPage);
			}
		);
	}

	pushComment(comment) {
		console.log('push', comment);
		this.comments.unshift(comment);
	}

}

