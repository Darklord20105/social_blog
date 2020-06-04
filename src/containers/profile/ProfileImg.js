import React from "react"

export const ProfileImg = () => {
    return (
        <div className="profile-img">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />
            <div className="file btn btn-lg btn-primary">
                Change Photo
                <input type="file" name="file" />
            </div>
        </div>
    )
}