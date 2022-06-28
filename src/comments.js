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
    return [];
  }

  update(commentData) {
    const comments = this.get();
    const newComment = {
      name: commentData.name,
      dateTime: new Date(),
      comment: commentData.comment,
    };
    comments.push(newComment);
    fs.writeFileSync(this.#filePath, JSON.stringify(comments), 'utf8');
  }
}

module.exports = { Comments };
