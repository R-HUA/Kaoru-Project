import React from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import "./Article.css"
import {BiArrowBack} from "react-icons/bi";

const input =
'# This is a header\n\n And this is a paragraph\n   ### h3' +
'\n## \n' +
'\n' +
'### 3.0 准备工作\n' +
'\n' +
'#### 3.1 SpringBoot和MybatisPuls整合配置测试\n' +
'\n' +
'①创建启动类\n' +
'[![languages](https://github-readme-stats.vercel.app/api/top-langs/?username=R-HUA&layout=compact)](https://github.com/anuraghazra/github-readme-stats)  \n' +
'~~~~java\n' +
'/**\n' +
' * @Author 三更  B站： https://space.bilibili.com/663528522\n' +
' */\n' +
'@SpringBootApplication\n' +
'@MapperScan("com.sangeng.mapper")\n' +
'public class SanGengBlogApplication {\n' +
'\n' +
'    public static void main(String[] args) {\n' +
'        SpringApplication.run(SanGengBlogApplication.class,args);\n' +
'    }\n' +
'}\n' +
'~~~~'


function Article(props) {

    return (
        <div className={"article-container"}>
            {/* <span id="back-icon-box">
                <BiArrowBack id="back-icon" onClick={() => {window.history.back();}}/>
            </span> */}

            <div className="page-title">
                <h1 className="article-title">{"article.articleTitle"}</h1>
                <div className="article-meta">
                    <div className="first-meta">
                        <span>
                            <span className="text">2023年06月21日 19:08</span>
                        </span>
                        <span>
                            <span className="text">45 阅读</span>
                        </span>
                        <span>
                            <span className="text">2 喜欢</span>
                        </span>
                        <span>
                            <span className="text">0 评论</span>
                        </span>
                    </div>
                    <div className="second-meta"></div>
                </div>
            </div>

            <ReactMarkdown
                className={"markdown-body"}
                children={input}
                remarkPlugins={[remarkGfm]}
                components={{
                    code({node, inline, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                            <SyntaxHighlighter
                                {...props}
                                children={String(children).replace(/\n$/, '')}
                                style={oneLight}
                                language={match[1]}
                                PreTag="div"
                            />
                        ) : (
                            <code {...props} className={className}>
                                {children}
                            </code>
                        )
                    }
                }}
            />

        </div>
    );
}

export default Article;