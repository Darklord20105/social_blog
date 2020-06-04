import React from "react";

import "./profileTabInfo.css"

import { ProfileTabInfoDetails } from "./profile/ProfileTabInfoDetails"
import { ProfileTabInfoPostListRenderer } from "./profile/ProfileTabInfoPostListRenderer"
import { ProfileTabInfoMessageList } from "./profile/ProfileTabInfoMessageList"

// reactstrap components
import {
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
} from "reactstrap";


export const ProfileTabInfo = (data) => {
    const [iconPills, setIconPills] = React.useState("1");
    const [pills, setPills] = React.useState("1");
    console.log(data)
    return (
        <div>
            <h5>Darklord HJ</h5>
            <h6> Web Developer and Designer</h6>
            <p class="proile-rating">RANKINGS : <span>8/10</span></p>
            <Nav className="pl-4" role="tablist" tabs>
                {/* justify-content-center */}
                <NavItem>
                    <NavLink
                        className={iconPills === "1" ? "active" : ""}
                        href="#pablo"
                        onClick={e => {
                            e.preventDefault();
                            setIconPills("1");
                        }}
                    >
                        <i className="now-ui-icons objects_umbrella-13"></i>
                        Profile
                      </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={iconPills === "2" ? "active" : ""}
                        href="#pablo"
                        onClick={e => {
                            e.preventDefault();
                            setIconPills("2");
                        }}
                    >
                        <i className="now-ui-icons shopping_cart-simple"></i>
                        Posts
                      </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={iconPills === "3" ? "active" : ""}
                        href="#pablo"
                        onClick={e => {
                            e.preventDefault();
                            setIconPills("3");
                        }}
                    >
                        <i className="now-ui-icons shopping_shop"></i>
                        Messages
                      </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={iconPills === "4" ? "active" : ""}
                        href="#pablo"
                        onClick={e => {
                            e.preventDefault();
                            setIconPills("4");
                        }}
                    >
                        <i className="now-ui-icons ui-2_settings-90"></i>
                        Time Line
                      </NavLink>
                </NavItem>
            </Nav>

            <TabContent
                // className="text-center"
                activeTab={"iconPills" + iconPills}
            >
                <TabPane tabId="iconPills1">
                    <ProfileTabInfoDetails infoList={data.data} />
                </TabPane>
                <TabPane tabId="iconPills2">
                    <ProfileTabInfoPostListRenderer postList={data.data} />
                </TabPane>
                <TabPane tabId="iconPills3">
                    <ProfileTabInfoMessageList messages={data.messages} />
                </TabPane>
                <TabPane tabId="iconPills4">
                    <p>
                        "I will be the leader of a company that ends up being
                        worth billions of dollars, because I got the answers. I
                        understand culture. I am the nucleus. I think that’s a
                        responsibility that I have, to push possibilities, to
                        show people, this is the level that things could be at."
                      </p>
                </TabPane>
            </TabContent>

        </div>
    )
}