import React, {useState} from 'react';
import { MarkdownEditor } from 'wysiwyg-markdown-react'
import "wysiwyg-markdown-react/dist/wysiwyg-markdown-react.css";
import "wysiwyg-markdown-react/dist/theme.css";
function NewArticle(props) {

    const [post, setPost] = useState({});

    return (
        <MarkdownEditor
            initialContent={post.body}
            onChange={(text) => {
                setPost({ ...post, body: text })
            }}
        />
    );
}

export default NewArticle;