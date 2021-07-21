import { Model } from '@nozbe/watermelondb';
import { field, action, children,relation } from '@nozbe/watermelondb/decorators';


export default class Comment extends Model {
	static table = 'comments';
	static associations = {
		posts: { type: 'belongs_to', key: 'post_id' },
	};
	@field('name') name;
	@field('body') body;
	@field('image')image;
	@relation('posts', 'post_id')post;

	@action async deleteComment() {
		await this.markAsDeleted(); // syncable
		await this.destroyPermanently(); // permanent
	  }
	  @action updateComment=async(comment,post)=>{
			await this.update(data=>{
				data.name=comment.name,
				data.body=comment.body,
				data.image=comment.image,
				data.post.set(post)
			});
	  }
}