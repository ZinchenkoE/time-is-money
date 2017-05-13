import {Injectable}    from '@angular/core';
import {Http, Response, Headers, URLSearchParams} from '@angular/http';
import {Observable}    from "rxjs";
import {Comment}        from "./comment";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {
	rootUrl: string = 'http://localhost:3000';

	constructor(private http: Http) {}

	getComments(page: number = 1, sortBy: string = 'comment_id', orderAsc: boolean = true): Observable<any> {

		let params = new URLSearchParams();
		params.set('page', page.toString());
		params.set('sortBy', sortBy);
		params.set('order', orderAsc ? 'ASC' : 'DESC');

		const url = this.rootUrl + '/comments?' + params;

		return this.http.get(url)
			.map((resp: Response) => {
				const commentsRaw = resp.json().comments;
				const countPage = resp.json().countPages;
				let comments: Comment[] = [];
				console.log(commentsRaw);
				if (!commentsRaw.length) return {};
				commentsRaw.forEach((commentRaw) => {
					const comment = new Comment(
						commentRaw.comment_id,
						commentRaw.parent_id,
						commentRaw.username,
						commentRaw.email,
						commentRaw.text,
						commentRaw.create_time,
						commentRaw.homepage,
					);
					comments.push(comment);
				});
				return {
					comments: comments,
					countPage: countPage
				};
			})
			.catch((error: any) => {
				return Observable.throw(error);
			});
	}

	sendComment(comment: Comment): Observable<number> {
		const url = this.rootUrl + '/comments';
		let data: any = comment;
		data.browser = DataService.detectBrowser();
		const body = JSON.stringify(data);

		let headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});
		return this.http.post(url, body, {headers: headers})
			.map((resp: Response) => {
				return +resp.status;
			})
			.catch((error: any) => {
				return Observable.throw(error);
			});
	}

	static detectBrowser() {
		let N = navigator.appName, ua = navigator.userAgent, tem;
		let M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
		if (M && (tem = ua.match(/version\/([.\d]+)/i)) !== null) M[2] = tem[1];
		M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
		return JSON.stringify(M)
	}

}