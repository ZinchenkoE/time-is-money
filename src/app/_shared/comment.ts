interface CommentI {
	comment_id: number,
	parent_id: number,
	username: string,
	email: string,
	text: string,
	create_time: number,
	homepage: number
}

export class Comment implements CommentI{
	constructor(
		public comment_id: number,
		public parent_id: number,
		public username: string,
		public email: string,
		public text: string,
		public create_time: number,
		public homepage: number
	) {}
}
