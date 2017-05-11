import {Injectable} 	from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} 	from "rxjs";
import {Comment} 		from "./comment";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {
	rootUrl: string = 'https://localhost:3000';

	constructor(private http: Http) {}

	getComments(): Observable<Comment[]> {
		let url = this.rootUrl + '/comments';
		return this.http.get(url)
			.map((resp: Response) => {
				let commentsRaw = resp.json();
				let comments: Comment[] = [];

				if(!commentsRaw.length) return comments;
				commentsRaw.forEach((commentRaw) => {
					let comment = new Comment(
						commentRaw.comment_id,
						commentRaw.parent_id,
						commentRaw.username,
						commentRaw.email,
						commentRaw.text,
						commentRaw.create_time,
					);
					comments.push(comment);
				});
				return comments;
			})
			.catch(this.errorHandler);
	}

	errorHandler(err) {
		console.error(err);
		return Observable.throw(err);
	}

}
