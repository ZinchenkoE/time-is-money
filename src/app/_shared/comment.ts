export class Comment{
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
