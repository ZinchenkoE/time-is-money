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
	activePage: number = 1;
	activeSortBy: string = 'comment_id';
	activeOrderAsc: boolean = false;

	constructor(private dataService: DataService) {}

	ngOnInit() {
		this.getComments();
	}

	pushComment(comment) {
		this.comments.unshift(comment);
	}

	getComments(){
		this.dataService.getComments(this.activePage, this.activeSortBy, this.activeOrderAsc).subscribe(
			(data: any) => {
				this.comments  = data.comments;
				this.countPage = [];
				for(let i = 1; i <= data.countPage; i++) this.countPage.push(i);
				console.log(this.countPage);
			}
		);
	}

	changePage(page){
		this.activePage = page;
		this.getComments();
	}

	changeSortBy(sortBy){
		if(this.activeSortBy === sortBy) this.activeOrderAsc = !this.activeOrderAsc;
		else this.activeSortBy = sortBy;
		this.getComments();
	}

}












