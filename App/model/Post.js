import { Model } from '@nozbe/watermelondb';
import { field, action, children, relation } from '@nozbe/watermelondb/decorators';

export default class Post extends Model {
  static table = 'posts'

  static associations = {
    blogs: { type: 'belongs_to', key: 'blog_id' },
    comments: { type: 'has_many', foreignKey: 'post_id' },
  };

  @field('name') name;
  @field('body') body;
  @field('image') image;
  @relation("blogs", "blog_id") blog;
  @children('comments') comment


  @action updatePost = async (post, blog) => {
    await this.update(contact_info => {
      // contact_info.id = contactInfo.id;
      contact_info.image = post.image;
      contact_info.name = post.name;
      contact_info.body = post.body;
      contact_info.blog.set(blog)
    });
  };
  @action async addComment(body) {
    return this.collections.get("comments").create(info => {
      info.post.set(this);
      info.name = body.name;
      info.body = body.body;
      info.image = body.image;
    });
  }
  @action async deletePost() {
    await this.markAsDeleted(); // syncable
    await this.deleteComment()
    await this.destroyPermanently(); // permanent
  }
  async deleteComment() {
    await this.comment.destroyAllPermanently();
  }
}