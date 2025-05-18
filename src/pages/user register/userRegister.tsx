import React from "react";


const userRegister =()=>{

    return(
        <div>
            <h1>Register user</h1>
            <form>
                /**
                    Name
                    Role 
                    Password
                 */

                 <div> Name</div>
                <input type="text" name="name" placeholder="Name" required />
                <input type="text" name="role" placeholder="Role" required />
                <input type="password" name="password" placeholder="Password" required />
                
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default userRegister;