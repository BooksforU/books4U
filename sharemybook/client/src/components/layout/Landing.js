import React, { Component } from "react";
import { BrowserRouter, Link} from "react-router-dom"
class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align" style={{marginBottom:"300px"}}>
            <h4>
             login with the{" "}
              <span style={{ fontFamily: "monospace" }}>Sharemybook</span>
            </h4>
            
            <br />
   
            
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  borderRadius:"6px",
                 
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Register
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  borderRadius:"6px",
              
                }}
                className="btn btn-large waves-effect hoverable  white black-text accent-3"
             
              >
                Log In
              </Link>
            </div>
          
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;