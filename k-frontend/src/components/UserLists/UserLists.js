import React, {useState} from 'react';
import {Avatar, List, Modal} from "antd";
import Follow from "../Follow/Follow";
import {Link} from "react-router-dom";
import {userInitialState} from "../../reducers/userReducer";

function UserLists(props) {

    return (

        <Modal
            open= {props.isOpen}
            title={props.title || "User Lists"}
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
                            type = "link"
                            uid = {item.id}
                            userInfo = {item}
                            followLists = {[]}
                            setFollowLists = {() => {}}
                        />]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar || userInitialState.avatar}/>}
                            title={<Link to={"profile/" + item.id}>{item.nickName}</Link>}
                            description={item.description || 'Default signature given to everyone~'}
                        />
                    </List.Item>
                )}
            />
        </Modal>
    );
}

export default UserLists;