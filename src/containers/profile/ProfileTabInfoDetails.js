import React from "react"
import moment from "moment"

export const ProfileTabInfoDetails = (infoList) => {
    const { profile } = infoList.infoList
    return (
        <div>
            <div class="row pt-3">
                <div class="col-md-6 pl-5 text-left">
                    <label>User Id</label>
                </div>
                <div class="col-md-6 ">
                    <p>{profile.profile.nickname}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 pl-5 text-left">
                    <label>Name</label>
                </div>
                <div class="col-md-6">
                    <p>{profile.profile.name}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 pl-5 text-left">
                    <label>Email</label>
                </div>
                <div class="col-md-6">
                    <p>{profile.profile.email}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 pl-5 text-left">
                    <label>Last Modified</label>
                </div>
                <div class="col-md-6">
                    <p>{moment(profile.profile.updated_at).format("MMM DD, YYYY | h:mm a")}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 pl-5 text-left">
                    <label>Profession</label>
                </div>
                <div class="col-md-6">
                    <p>Web Developer and Designer</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 pl-5 text-left">
                    <label>Email Verified: </label>
                </div>
                <div class="col-md-6">
                    <p>{profile.profile.email_verified}</p>
                </div>
            </div>
        </div>
    )
}
