import React, {useState} from 'react';
import {Avatar, List, Modal} from "antd";
import Follow from "../Follow/Follow";

function UserLists(props) {

    const [isopen,setOpen] = useState(true);

    return (

        <Modal
            open= {isopen}
            title= "Title"
            footer= {null}
            onCancel ={() => setOpen(false)}
        >
            <List
                itemLayout="horizontal"
                dataSource={props.userList}
                renderItem={(item, index) => (
                    <List.Item
                        actions={[<Follow display = {true} type = "text"/>]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}/>}
                            title={<a href="https://ant.design">{item.title}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                    </List.Item>
                )}
            />
        </Modal>
    );
}

export default UserLists;