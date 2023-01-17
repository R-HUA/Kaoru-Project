import React, {useState} from 'react';
import {Avatar, List, Modal} from "antd";
import Follow from "../Follow/Follow";

function UserLists(props) {

    return (

        <Modal
            open= {props.isOpen}
            title= "Title"
            footer= {null}
            onCancel ={() => props.setOpen(false)}
        >
            <List
                itemLayout="horizontal"
                dataSource={props.userList}
                renderItem={(item, index) => (
                    <List.Item
                        key={item.id}
                        actions={[<Follow
                            disply = {true}
                            type = "text"
                            uid = {item.id}
                            userInfo = {item}
                            followLists = {[]}
                            setFollowLists = {() => {}}
                        />]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar}/>}
                            title={item.nickName}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
        </Modal>
    );
}

export default UserLists;