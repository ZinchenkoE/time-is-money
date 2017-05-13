import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {DataService} from "../_shared/data.service";
import {Comment} from '../_shared/comment';

@Component({
	selector: 'app-form-for-comment',
	templateUrl: './form-for-comment.component.html',
	styleUrls: ['./form-for-comment.component.css']
})
export class FormForCommentComponent implements OnInit {
	message: string;
	messageType: string;

	@Output() onSendComment: EventEmitter<Comment>;

	constructor(private dataService: DataService) {
		this.onSendComment = new EventEmitter<Comment>();
	}

	ngOnInit() {}

	onSubmit(form: NgForm) {
		console.log(form);
		const comment = new Comment(
			0,
			0,
			form.value.username,
			form.value.email,
			form.value.text,
			+new Date(),
			form.value.homepage,
		);
		this.dataService.sendComment(comment).subscribe(
			(status) => {
				if (status === 200) {
					this.message = 'Комментарий успешно отправлен.';
					this.messageType = 'success';
					this.onSendComment.emit(comment);
					form.reset();
				} else {
					this.message = 'Ошибка при сохранении комментария.';
					this.messageType = 'error';
				}
			}
		);
	}

}










