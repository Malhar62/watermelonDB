import { Model } from '@nozbe/watermelondb';
import { field, action, children } from '@nozbe/watermelondb/decorators';

export default class Blog extends Model {
  static table = 'blogs';
  static associations = {
    posts: { type: "has_many", foreignKey: "blog_id" }
  };

  @field('title') title;
  @field('code') code;
  @field('image') image;
  @field('tag') tag
  @children("posts") post;

  @action async addPost(body) {
    return this.collections.get("posts").create(info => {
      info.blog.set(this);
      info.name = body.name;
      info.body = body.body;
      info.image = body.image;
    });
  }

  @action async deleteBlog() {
    await this.markAsDeleted(); // syncable
    await this.deletePost();
    await this.destroyPermanently(); // permanent
  }
  @action updateBlog = async data => {
    await this.update(user => {
      user.id = data.id;
      // user.userId = userDetail.userId;
      user.title = data.title;
      user.code = data.code;
      user.image = data.img;
      user.tag = data.tag
    });
  }
  async deletePost() {
    await this.post.destroyAllPermanently();
  }
}
