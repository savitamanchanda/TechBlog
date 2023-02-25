const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const text = document.querySelector('#body').value.trim();
    const blog_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
  
    if (text) {
      const response = await fetch(`/api/comment`, {
        method: 'POST',
        body: JSON.stringify({ blog_id, text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/blog/${blog_id}`);
      } else {
        alert('Failed to create post');
      }
    }
  };

  document
    .querySelector('.comment_form')
    .addEventListener('submit', commentFormHandler);