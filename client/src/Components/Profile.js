import React, { Component } from 'react';

class Profile extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			username:'',
      email:''
		};
		
	}
	
  componentWillMount(){
    fetch('/api/profile',{
      method:"POST",
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({get:true})
    })
    .then(res => res.json())
    .then(result =>
        (result.success)
        ? (
            //console.log(result)
            this.setState(
            {
              username:result.user.username,
              email:result.user.email
            })
          )
        :(
            window.location.href = '/login'
        )
    )
    .catch(err =>  console.log(err));
  }


	render() {
	return (
	  <div>
	    <h2> Hell Yeah </h2>
      <a  href="http://localhost:3001/auth/logout" className="button">LogOut</a>

          <div>
              <h3><strong>Your Details:</strong></h3>
              <hr/>
              <h4><strong>username : </strong>{this.state.username}</h4>
              <h4><strong>Email : </strong>{this.state.email}</h4>
          </div>
	  </div>
	);
}
}

export default Profile;
