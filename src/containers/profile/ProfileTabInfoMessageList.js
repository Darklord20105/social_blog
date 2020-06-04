import React from "react"

export const ProfileTabInfoMessageList = (props) => {
    const RenderSingleMessage = (msg) => {
        //  Source https://www.bootdey.com/snippets/view/bs4-beta-Messages-list#css
        console.log(msg)
        return (
            <li>
                <div class="message-avatar">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" />
                </div>
                <div class="message-body">
                    <div class="message-body-heading">
                        <h5>{msg.msg.message_sender} <span class="unread">Unread</span><span class="important">Important</span><span class="business">Business</span><span class="pending">Pending Work</span><span>7 hours ago</span></h5>
                        <span>{msg.msg.date_created}</span>
                    </div>
                    <p>{msg.msg.message_body}</p>
                </div>
            </li>
        )
    }
    console.log(props)
    return (
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="chat_container">
                        <div class="job-box">
                            <div class="job-box-filter">
                                <div class="row">
                                    <div class="col-md-6 col-sm-6">
                                        <label>Show
					                        <select name="datatable_length" class="form-control input-sm">
                                                <option value="10">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                            </select>
					                        entries</label>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <div class="filter-search-box text-right">
                                            <input type="search" class="form-control input-sm" placeholder="Search" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="inbox-message">
                                <ul>
                                    {props.messages.map(item => (
                                        <RenderSingleMessage msg={item} key={item.mid} />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
