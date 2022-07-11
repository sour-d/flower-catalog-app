const fs = require('fs');

class Comments {
  #filePath;
  constructor(filePath) {
    this.#filePath = filePath;
  }

  get() {
    if (fs.existsSync(this.#filePath)) {
      const comments = fs.readFileSync(this.#filePath, 'utf8');
      return JSON.parse(comments);
    }
    return {
      LastCommentId: 0,
      totalComments: 0,
      comments: []
    };
  }

  update(latestComment) {
    const commentData = this.get();
    const latestId = ++commentData.LastCommentId;
    const newComment = {
      id: latestId,
      name: latestComment.get('name'),
      dateTime: new Date().toLocaleString(),
      comment: latestComment.get('comment'),
    };
    commentData.comments.push(newComment);
    commentData.totalComments++;

    fs.writeFileSync(this.#filePath, JSON.stringify(commentData), 'utf8');
  }
}

module.exports = { Comments };
